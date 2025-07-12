import jwt
import os
from .utils import Util
from rest_framework import permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,views,generics
from django.urls import reverse
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import get_object_or_404
from django.contrib.sites.shortcuts import get_current_site
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.conf import settings
from django.http import HttpResponsePermanentRedirect
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .serializers import (
    RegisterSerializer, 
    EmailVerificationSerializer,
    SetNewPasswordSerializer,
    ResetPasswordEmailRequestSerializer,
    AccessTokenOnlySocialLoginSerializer,
    ProfileSerializer,
    
)
from .models import Profile
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

User = get_user_model()

class RegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        current_site = get_current_site(request).domain
        relative_link = reverse('email-verify')
        absurl = f'http://{current_site}{relative_link}?token={access_token}'

        email_body = f"Hi {user.email},\nUse the link below to verify your email:\n{absurl}"
        email_data = {
            'email_body': email_body,
            'to_email': user.email,
            'email_subject': 'Verify your email'
        }
        Util.send_email(email_data)

        return Response({
            'message': 'User registered successfully. Please check your email to verify your account.',
            'access_token': access_token,
        }, status=status.HTTP_201_CREATED)

class VerifyEmail(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = get_object_or_404(User, id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'message': 'Email successfully verified.'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Activation link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if not user:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_verified:
            return Response({'detail': 'Email not verified.'}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)
        redirect_url = '/'

        if user.is_admin:
            redirect_url = '/admin/' 

        else:
            redirect_url = '/dashboard/'

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'redirect_url': redirect_url,
            'user_id': user.id,
        })

class LogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        
class RequestPasswordResetEmail(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if user:
            uidb64 = urlsafe_base64_encode(smart_str(user.id).encode())
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request).domain
            relative_link = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            absurl = f'http://{current_site}{relative_link}'

            email_body = f"Hello,\nUse the link below to reset your password:\n{absurl}"
            Util.send_email({
                'email_body': email_body,
                'to_email': user.email,
                'email_subject': 'Reset your password'
            })

        return Response({'success': 'If this email exists, a password reset link was sent.'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is invalid or expired'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'success': True, 'uidb64': uidb64, 'token': token})
        except DjangoUnicodeDecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'message': 'Password reset successful'}, status=status.HTTP_200_OK) 
    
class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    serializer_class = AccessTokenOnlySocialLoginSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            token = response.data.get("key")
            user = self.user  

            updated_fields = []
            if not user.is_google_account:
                user.is_google_account = True
                updated_fields.append("is_google_account")
            if not user.is_verified:
                user.is_verified = True
                updated_fields.append("is_verified")

            if updated_fields:
                user.save(update_fields=updated_fields)

            redirect_url = "/admin/" if user.is_admin else "/dashboard/"

            user_info = {
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "profile_image": user.profile_image.url if user.profile_image and hasattr(user.profile_image, 'url') else "",
            }

            return Response({
                "message": "User logged in successfully via Google",
                "key": token,
                "redirect_url": redirect_url,
                "user": user_info
            }, status=status.HTTP_200_OK)

        return response

class ProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user__email=self.request.user.email)
    
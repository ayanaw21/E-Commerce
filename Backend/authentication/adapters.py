from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import get_user_model
from allauth.account.utils import user_email

User = get_user_model()

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        if sociallogin.is_existing:
            return  
        email = sociallogin.account.extra_data.get("email") or user_email(sociallogin.user)
        if not email:
            return

        try:
            user = User.objects.get(email__iexact=email)

            sociallogin.connect(request, user)

            updated_fields = []
            if not user.is_verified:
                user.is_verified = True
                updated_fields.append("is_verified")
            if not user.is_google_account:
                user.is_google_account = True
                updated_fields.append("is_google_account")

            if updated_fields:
                user.save(update_fields=updated_fields)

        except User.DoesNotExist:
            print(f"[Adapter] No user found with email: {email}. A new one will be created.")

    def save_user(self, request, sociallogin, form=None):
        """
        Called when a new user is created from social login.
        """
        user = super().save_user(request, sociallogin, form)

        updated_fields = []
        if not user.is_verified:
            user.is_verified = True
            updated_fields.append("is_verified")
        if not user.is_google_account:
            user.is_google_account = True
            updated_fields.append("is_google_account")

        if updated_fields:
            user.save(update_fields=updated_fields)

        return user
    



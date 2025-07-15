"use client";

import {
	GoogleOAuthProvider,
	GoogleLogin,
	CredentialResponse,
} from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface DecodedGoogleToken extends JwtPayload {
	aud: string;
	email: string;
	email_verified: boolean;
	sub: string;
	name?: string;
	picture?: string;
}

interface AuthResponse {
	token: string;
}

const GoogleLoginButton = () => {
	const router = useRouter();
	const [showFallback, setShowFallback] = useState(false);

	// Validate environment variables
	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
			console.error("Missing Google Client ID!");
		}
		if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
			console.error("Missing Backend URL!");
		}
	}, []);
const handleSuccess = async (credentialResponse: CredentialResponse) => {
  try {
    if (!credentialResponse.credential) {
      throw new Error("No credential received from Google");
    }

    // Additional validation
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Backend URL not configured");
    }

    const decoded = jwtDecode<DecodedGoogleToken>(credentialResponse.credential);
    
    // More comprehensive validation
    if (!decoded.email_verified) {
      throw new Error("Email not verified by Google");
    }

    const csrfToken = document?.cookie.match(/csrftoken=([^;]+)/)?.[1];
    
    const response = await axios.post<AuthResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/google/`,
      {
        token: credentialResponse.credential, // Simplify payload
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken && { "X-CSRFToken": csrfToken }),
          // Add authorization header if needed
        },
        validateStatus: (status) => status < 500, // Don't throw for 4xx errors
      }
    );

    // Handle different error responses more gracefully
    if (response.status >= 400) {
      const errorData = response.data as { detail?: string };
      throw new Error(errorData.detail || "Authentication failed");
    }

    // Secure token storage
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", response.data.token);
      // Consider using HttpOnly cookies instead for better security
    }

    router.push("/dashboard");
  } catch (error) {
    console.error("Login Failed:", error);
    
    let errorMessage = "Login failed. Please try again.";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.detail || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    alert(errorMessage);
  }
};

	return (
		<div className="google-auth-container">
			<GoogleOAuthProvider
				clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
			>
				<GoogleLogin
					onSuccess={handleSuccess}
					onError={() => {
						console.log("One-Tap dismissed - showing fallback");
						setShowFallback(true);
					}}
					useOneTap
					auto_select
					text="continue_with"
					shape="rectangular"
				/>
			</GoogleOAuthProvider>

			{showFallback && (
				<div className="fallback-auth">
					<p>Or sign in manually:</p>
					<GoogleLogin
						onSuccess={handleSuccess}
						onError={() => alert("Google login failed")}
					/>
				</div>
			)}
		</div>
	);
};

export default GoogleLoginButton;

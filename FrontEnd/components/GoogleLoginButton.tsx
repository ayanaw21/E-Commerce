"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const GoogleLoginButton = () => {
	const router = useRouter();

	useEffect(() => {
		
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
	}, []);
const handleGoogleLogin = () => {
	if (!window.google || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
		alert("Google Client not initialized");
		return;
	}

	const tokenClient = window.google.accounts.oauth2.initTokenClient({
		client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		scope: "profile email",
		callback: async (tokenResponse) => {
			try {
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/google/`,
					{
						access_token: tokenResponse.access_token,
					},
					{ headers: { "Content-Type": "application/json" } }
				);

				
				await axios.post("/api/session", {
					token: response.data.key,
					user: response.data.user,
				});

				
				router.push(response.data.redirect_url || "/dashboard");
			} catch (error) {
				console.error("Login Failed:", error);
				alert("Google login failed. Check console.");
			}
		},
	});

	tokenClient.requestAccessToken();
};

	return (
		<div className="google-auth-container">
			<button
				onClick={handleGoogleLogin}
				className="bg-white w-full text-black px-4 py-2 rounded shadow"
			>
				Login with Google
			</button>
		</div>
	);
};

export default GoogleLoginButton;

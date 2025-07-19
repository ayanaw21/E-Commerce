"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { login } from "../actions";
import { useActionState, useEffect, useState } from "react";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import axios from "axios";

export default function Login() {
	const [state, loginAction] = useActionState(login, null);
	const [checkingSession, setCheckingSession] = useState(true);

	useEffect(() => {
		
		const checkSession = async () => {
			try {
				const res = await axios.get("/api/session/verify");
				if (res.data.loggedIn) {
					window.location.href = "/dashboard"; // or custom redirect
				}
			} catch (err) {
				console.error("Session check failed:", err);
			} finally {
				setCheckingSession(false); // Show login UI if not redirected
			}
		};

		checkSession();
	}, []);

	useEffect(() => {
		if (state?.redirect) {
			window.location.href = state.redirect;
		}
	}, [state]);

	if (checkingSession) return null; // ⏳ Wait for session check

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<Card className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
					<CardAction>
						<Button variant="link" asChild>
							<Link href="../signup">Sign Up</Link>
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<form action={loginAction}>
						<div className="flex flex-col gap-6">
							{state?.error && (
								<p className="text-red-500">
									{state.error}
									{state.status &&
										` (Status: ${state.status})`}
								</p>
							)}
							<div className="grid w-full max-w-sm items-center gap-3">
								<Label htmlFor="email">Email address</Label>
								<Input
									type="email"
									name="email"
									id="email"
									
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									
								/>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<GoogleLoginButton />
				</CardFooter>
			</Card>
		</div>
	);
}

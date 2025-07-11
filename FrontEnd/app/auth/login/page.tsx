"use client";
import { useRouter } from "next/navigation";
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
import { useActionState } from "react";
export default function Login() {
	const router = useRouter();
  const [state,loginAction] = useActionState(login,undefined)
	async function handleLogin(formData: FormData) {
		try {
			const res = await fetch("http://127.0.0.1:8000/login/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: formData.get("email"),
					password: formData.get("password"),
				}),
			});
			console.log("Response status:", res.status); // Debug log
			if (!res.ok) throw new Error("Login failed");

			const data = await res.json();
			if (data.access) {
				localStorage.setItem("authToken", JSON.stringify(data.access));
				router.push(data.redirect_url);
			}
		} catch (error) {
			console.error("Login error:", error);
			// Add toast/alert here
		}
	}

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
							<div className="grid w-full max-w-sm items-center gap-3">
								<Label htmlFor="email">Email address</Label>
								<Input
									type="email"
									name="email"
									id="email"
									required
								/>
							</div>
							
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									required
								/>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button variant="outline" className="w-full">
						Login with Google
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

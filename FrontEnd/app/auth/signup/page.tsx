"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import Link from "next/link";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  // const [error, setError] = useState<string | null>(null);

  async function handleRegister(formData: FormData) {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.get("email") as string);
      formDataToSend.append("password", formData.get("password") as string);
      formDataToSend.append("confirm_password", formData.get("confirm_password") as string);
      formDataToSend.append("first_name", formData.get("first_name") as string);
      formDataToSend.append("last_name", formData.get("last_name") as string);
      
      const file = formData.get("profile_image") as File;
      if (file) formDataToSend.append("profile_image", file);

      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      if (data.access_token) {
        router.push("/auth/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Register error", error);
      setError(error instanceof Error ? error.message : "Registration failed");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Card className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Register Page</CardTitle>
          <CardAction>
            <Button variant="link" asChild>
              <Link href="/auth/login">Already have an account? Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form action={handleRegister}>
            <FormInput type="text" name="first_name" label="First Name" />
            <FormInput type="text" name="last_name" label="Last Name" />
            <FormInput type="email" name="email" label="Email" />
            <FormInput type="password" name="password" label="Password" />
            <FormInput
              type="password"
              name="confirm_password"
              label="Confirm Password"
            />
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="profile_image">Profile Image</Label>
              <Input type="file" name="profile_image" id="profile_image" />
            </div>
            <SubmitButton className="w-full capitalize" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
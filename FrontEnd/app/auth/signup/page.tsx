"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import Link from "next/link";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
// import { useActionState } from "react";
// import { register } from "../actions";
// import { useState } from "react";

export default function Register() {
  const router = useRouter()
  // const [error, setError] = useState<string | null>(null);
  // const [state,registerAction] = useActionState(register,null)
  async function handleRegister(formData: FormData) {
    try {
     const response = await fetch("http://127.0.0.1:8000/register/",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        email:formData.get("email"),
        password:formData.get("password"),
        confirm_password:formData.get("confirm_password"),
        first_name:formData.get("first_name"),
        last_name:formData.get("last_name"),
      })
     });

     console.log("Response status: ",response.status);
      
      const data = await response.json();
      if(data.access_token){

        console.log(data.message);
        toast(data.message);
        router.push("/auth/login")
      }
      else(
        toast(data.email)
      )  
    } catch (error) {
      console.error("Register error", error);
      // setError(error instanceof Error ? error.message : "Registration failed");
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
            
            <SubmitButton className="w-full capitalize" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
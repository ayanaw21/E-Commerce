"use server";
// import { z } from "zod";
import { createSession, decrypt, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// const base_url = process.env.BASE_URL;

export async function login(prevState: any, formData: FormData) {	
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
    await createSession(data.access);
	
	
    redirect(data.redirect_url)
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}

export async function register(prevState:any,formData:FormData){
	const res = await fetch("https://127:0.0.1:8000/register/",{
		method:"POST",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify({
			email:formData.get("email"),
			password:formData.get("password"),
			confirm_password:formData.get("confirm_password"),
			first_name:formData.get("first_name"),
			last_name:formData.get("last_name"),
			profile_picture:formData.get("profile_picture")
		}),


	});
	if(!res.ok){
		const errorData = await res.json();
		console.error("Error:",errorData);
	}
}


// export async function getProfile(){
// 	const cookie = (await cookies()).get("session")?.value;
// 	const session = decrypt(cookie)

	

// }
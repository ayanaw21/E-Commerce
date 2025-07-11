"use server";
// import { z } from "zod";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

// const base_url = process.env.BASE_URL;

export async function login(prevState: any, formData: FormData) {
	// const result = Object.fromEntries(formData);

	// if (!result.success) {
	// 	return {
	// 		errors: result.error.flatten().fieldErrors,
	// 	};
	// }
    
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

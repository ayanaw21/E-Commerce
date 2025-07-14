"use server";
// import { z } from "zod";
import { createSession,deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

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


interface RegisterResponse {
  access_token?: string;
  user?: {
    id: string;
    email: string;
  };
}

interface ErrorResponse {
  error: string;
  details?: Record<string, string[]>;
}

export async function register(
  prevState: ErrorResponse | null,
  formData: FormData
): Promise<RegisterResponse | ErrorResponse | never> { // never for redirect
  try {
    const formDataToSend = new FormData();
    
    // Helper function
    const appendIfExists = (key: string) => {
      const value = formData.get(key);
      if (value !== null) formDataToSend.append(key, value);
    };

    // Append all fields
    appendIfExists("email");
    appendIfExists("password");
    appendIfExists("confirm_password");
    appendIfExists("first_name");
    appendIfExists("last_name");

    // Handle file upload
    const profileImage = formData.get("profile_image");
    if (profileImage instanceof File) {
      if (profileImage.size > 5_000_000) {
        return {
          error: "File too large",
          details: { profile_image: ["Maximum size is 5MB"] }
        };
      }
      formDataToSend.append("profile_image", profileImage);
    }

    const res = await fetch("http://127.0.0.1:8000/register/", {
      method: "POST",
      body: formDataToSend, // Let browser set Content-Type
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message || "Registration failed",
        details: data.errors,
      };
    }

    redirect("/auth/login"); // Successful redirect

  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: "Registration failed",
      details: { system: ["Internal server error"] }
    };
  }
}

// export async function getProfile(){
// 	const cookie = (await cookies()).get("session")?.value;
// 	const session = decrypt(cookie)

	

// }
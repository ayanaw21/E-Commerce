// app/api/auth/login/route.ts
import { mockUsers } from "@/mockUsers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
     console.log("Received:", { email, password }); 

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin === true // Ensure this matches your mock data structure
    };

    return NextResponse.json({ token });
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
// app/api/session/route.ts
import { NextResponse } from "next/server";
import { createSession } from "@/lib/sessions"; // your jose session util
import { cookies } from "next/headers";

export async function POST(req: Request) {
	const { token, user } = await req.json();

	if (!token) {
		return NextResponse.json({ error: "Missing token" }, { status: 400 });
	}

	await createSession(token);

	(await cookies()).set("user", JSON.stringify(user), {
		httpOnly: false, // readable by JS
		secure: true,
		maxAge: 7 * 24 * 60 * 60,
		sameSite: "lax",
	});

	return NextResponse.json({ success: true });
}

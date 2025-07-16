// app/api/session/verify/route.ts
import { decrypt } from "@/lib/sessions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await decrypt(cookies().get("session")?.value);
	if (!session) return NextResponse.json({ loggedIn: false });

	return NextResponse.json({ loggedIn: true });
}

"use client";

import { fetchProfile } from "@/app/utils/actions";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ProfileData } from "@/types/profile";
export default function ProfileLink({ token }: { token: string }) {
	const [profile, setProfile] = useState<ProfileData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const loadProfile = async()=>{
            try {
                const data = await fetchProfile(token)
                setProfile(data);
            }catch(err){
                setError(err instanceof Error ? err.message : "Failed to load profile")
            } finally{
                setLoading(false)
            }
            
        }
        loadProfile();

    },[token])
    if (loading) return null
    if(error) return null

	return <Link href="/profile" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
        {profile?.first_name || "profile"}
    </Link>;
}

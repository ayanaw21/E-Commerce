import { ProfileData } from "@/types/profile";
export async function fetchProfile(token: string): Promise<ProfileData> {
	const response = await fetch("http://127.0.0.1:8000/profile/", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
    const data:ProfileData = await response.json()
    console.log(data)
	return data;

}

import Link from "next/link";
import { decrypt } from "@/lib/sessions";
import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { logout } from "@/app/auth/actions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchProfile } from "@/app/utils/actions";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { MainNav } from "./MainNav";

const Navbar = async () => {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("session")?.value;
	const session = cookie ? await decrypt(cookie) : null;
	const access = session?.access;
	const profile = access ? await fetchProfile(access) : null;

	const avatarLetter = profile?.first_name?.charAt(0)?.toUpperCase() ?? "U";

	return (
		<>
			{!session ? (
				<>
					<TopBar />
					<MainNav />
					<BottomNav  profile = {profile}  />
				</>
			) : (
				<>
					<MainNav />
					<BottomNav profile = {profile} />
				</>
			)}
			{/* <div>
				<nav className="bg-white border-gray-200 dark:bg-gray-900">
					<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
						

						{!access ? (
							<div className="flex items-center space-x-6 rtl:space-x-reverse">
								<Link
									href="/auth/login"
									className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
								>
									Login
								</Link>
								<Link
									href="/auth/signup"
									className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
								>
									SignUp
								</Link>
							</div>
						) : (
							<div className="flex items-center space-x-6 rtl:space-x-reverse">
								<form action={logout}>
									<div className="flex flex-row flex-wrap items-center gap-6">
										<Button
											type="submit"
											variant="link"
											className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
										>
											Logout
										</Button>
										<Link
											href="/profile"
											className="text-amber-950"
										>
											<Avatar>
												<AvatarImage
													src={
														profile?.profile_image ??
														""
													}
													alt="@user"
												/>
												<AvatarFallback>
													{avatarLetter}
												</AvatarFallback>
											</Avatar>
										</Link>
									</div>
								</form>
							</div>
						)}
					</div>
				</nav>
			</div> */}
		</>
	);
};

export default Navbar;

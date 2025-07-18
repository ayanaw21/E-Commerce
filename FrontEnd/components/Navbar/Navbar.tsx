import Link from "next/link";
import { decrypt } from "@/lib/sessions";
import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { logout } from "@/app/auth/actions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchProfile } from "@/app/utils/actions";

const Navbar = async () => {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("session")?.value;
	const session = cookie ? await decrypt(cookie) : null;
	const access = session?.access;
	const profile = access ? await fetchProfile(access) : null;

	const avatarLetter = profile?.first_name?.charAt(0)?.toUpperCase() ?? "U";

	return (
		<div>
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
					<Link
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Flowbite
						</span>
					</Link>

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
													profile?.profile_image ?? ""
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

			<nav className="bg-gray-50 dark:bg-gray-700">
				<div className="max-w-screen-xl px-4 py-3 mx-auto">
					<div className="flex items-center">
						<ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
							<li>
								<Link
									href="/"
									className="text-gray-900 dark:text-white hover:underline"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
								>
									Company
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
								>
									Team
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
								>
									Features
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
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
				</div>
			</nav>
			<nav className="bg-gray-50 dark:bg-gray-700">
				<div className="max-w-screen-xl px-4 py-3 mx-auto">
					<div className="flex items-center">
						<ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
							<li>
								<a
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
									aria-current="page"
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
								>
									Company
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
								>
									Team
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-900 dark:text-white hover:underline"
								>
									Features
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

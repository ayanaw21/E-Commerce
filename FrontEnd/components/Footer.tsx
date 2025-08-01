import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/image.png";

const Footer = () => {
	return (
		<section className="bg-black text-white">
			<div className="max-w-6xl mx-auto px-5 py-10 ">
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 px-8 mb-10">
					<div className="col-span-2">
						<Link href="/" className="flex gap-2 mb-2">
							<Image src={Logo} alt="logo" className="w-8 h-7" />
							<h2 className="text-light text-3xl">Ecobazar</h2>
						</Link>
						<p className="text-gray-500 mb-2">
							Morbi cursus porttitor enim lobortis molestie. Duis
							gravida turpis dui, eget bibendum magna congue nec.
						</p>
						<div className="flex flex-wrap items-center gap-4">
							<span className="border-b-green-600 p-1 border-b-2">
								(+251) 980583477
							</span>
							<span className="text-gray-500">or</span>
							<span className="border-b-green-600 p-1 border-b-2">
								proxy@gmail.com
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<Link href="/profile">My Account</Link>
						<div className="flex flex-col gap-2 text-gray-500">
							<Link
								className="hover:text-gray-100"
								href="/profile"
							>
								My Account
							</Link>

							<Link
								className="hover:text-gray-100"
								href="/profile"
							>
								Order History
							</Link>
							<Link
								className="hover:text-gray-100"
								href="/profile"
							>
								Shopping Cart
							</Link>
							<Link
								className="hover:text-gray-100"
								href="/profile"
							>
								Wishlist
							</Link>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<Link href="/profile">Helps</Link>
						<div className="flex flex-col gap-2 text-gray-500">
							<Link
								className="hover:text-gray-100"
								href="/profile"
							>
								Contact
							</Link>

							<Link
								className="hover:text-gray-100"
								href="/profile"
							>
								Faqs
							</Link>
							<Link
								className="hover:text-gray-100"
								href="/profile"
							>
								Terms &  Condition
							</Link>
							<Link
								className="hover:text-gray-100"
								href="/profile"
							>
								Privacy Policy
							</Link>
						</div>
					</div>

                    <div className="flex flex-col gap-4">
						<Link href="/profile">Proxy</Link>
						<div className="flex flex-col gap-2 text-gray-500">
							<Link
								className="hover:text-gray-100"
								href="/about"
							>
								About
							</Link>

							<Link
								className="hover:text-gray-100"
								href="/shop"
							>
								Shop
							</Link>
							<Link
								className="hover:text-gray-100"
								href="/product"
							>
								Product 
							</Link>
							<Link
								className="hover:text-gray-100"
								href="/order"
							>
								Track Order
							</Link>
						</div>
					</div>
                    <div className="flex flex-col gap-4">
						<Link href="/profile">Categories</Link>
						<div className="flex flex-col gap-2 text-gray-500">
							<Link
								className="hover:text-gray-100"
								href="/about"
							>
								Fruit & Vegetables
							</Link>

							<Link
								className="hover:text-gray-100"
								href="/shop"
							>
								Meat & Fish
							</Link>
							<Link
								className="hover:text-gray-100"
								href="/product"
							>
								Bread & Bakery 
							</Link>
							<Link
								className="hover:text-gray-100"
								href="/order"
							>
								Beauty & Health
							</Link>
						</div>
					</div>
				</div>
				<div className="px-8">
					<hr />
				</div>
				<div className="mt-8 px-8">Footer</div>
			</div>
		</section>
	);
};

export default Footer;

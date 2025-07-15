"use client";

import Logo from "@/public/images/Logo.jpg";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function MainNav() {
  return (
    <div className="bg-white dark:bg-gray-800 py-6 px-4 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:px-8">
        {/* Logo */}
        <Link href="/">
          <Image src={Logo} alt="logo" className="w-full h-auto" />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 sm:mx-8">
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Search"
              className="rounded-r-none border-r-0 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white "
            />
            <Button className="rounded-l-none bg-green-500 hover:bg-green-600 text-white sm:px-6">
              Search
            </Button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center md:gap-6">
          <Link
            href="/wishlist"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 text-white text-[8px] sm:text-xs p-0 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

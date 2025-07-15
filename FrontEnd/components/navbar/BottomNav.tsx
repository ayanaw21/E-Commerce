"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccountButton } from "./AccountButton";
import { MobileMenu } from "./MobileMenu";
import { navItems } from "./Links";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-800 dark:bg-gray-900 py-4 px-4 ">
      <div className="max-w-7xl mx-auto md:px-8">
        <nav className="flex items-center justify-between">
          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-2 text-sm md:gsp-4 lg:gap-8 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-gray-300 hover:text-white transition-colors duration-200 py-1 px-2 md:py-2 md:px-3 rounded-md text-base whitespace-nowrap",
                  pathname === item.href &&
                    "text-white bg-gray-700 dark:bg-gray-800"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex-1 flex items-center justify-between">
            <MobileMenu />
            <div className="flex items-center">
              <ThemeToggle />
              <AccountButton />
            </div>
          </div>

          {/* Desktop Right side - Theme Toggle and Account */}
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <AccountButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

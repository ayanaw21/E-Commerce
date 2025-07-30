"use client";

import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AccountButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200 flex items-center gap-1 px-3"
    >
      <Link href="/profile" className="cursor-pointer">
        <FaUserCircle size={200} />
      </Link>
    </Button>
  );
}

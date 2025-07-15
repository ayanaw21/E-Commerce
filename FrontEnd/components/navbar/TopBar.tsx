"use client";

import { MapPin } from 'lucide-react';
import Link from 'next/link';

export function TopBar() {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between text-sm px-8">
        <div className="hidden md:flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4" />
          <span>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center gap-1 underline"
          >
            Log In
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <Link
            href="/auth/signup"
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
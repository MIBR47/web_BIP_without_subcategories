'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';

import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('authToken');
    // Redirect ke halaman login
    router.push('/auth/login');
  };

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Logo</span>
          </Link>
        </div>

        <div className="hidden md:block relative">
          <div
            className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center cursor-pointer"
            onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown on click
          >
            <span className="font-semibold text-sm">HQ</span>
          </div>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10"
              onMouseLeave={() => setDropdownVisible(false)} // Hide on mouse leave
            >
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

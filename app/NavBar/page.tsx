"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // lightweight icons
import AvatarMenu from "@/components/AvatarMenu";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="shrink-0 text-emerald-400 font-bold text-2xl tracking-tight">
            <Link href="/">CS MAJOR</Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-9 text-gray-300 font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-emerald-400 active:text-emerald-500 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-emerald-400 active:text-emerald-500 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-emerald-400 active:text-emerald-500 transition-colors duration-200"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-emerald-400 active:text-emerald-500 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-6 gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 
                         hover:bg-gray-800 hover:text-white 
                         active:bg-gray-700 active:text-emerald-400 
                         transition duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-emerald-500 text-white font-semibold 
                         hover:bg-emerald-600 
                         active:bg-emerald-700 
                         transition duration-200"
            >
              Sign Up
            </Link>
            <AvatarMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-emerald-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
          <Link
            href="/"
            className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/services"
            className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
          >
            Contact
          </Link>
          <div className="flex space-x-4 pt-4 border-t border-gray-700">
            <Link
              href="/login"
              className="flex-1 text-center px-4 py-2 rounded-md border border-gray-600 text-gray-300 
                         hover:bg-gray-700 hover:text-white transition duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center px-4 py-2 rounded-md bg-emerald-500 text-white font-semibold 
                         hover:bg-emerald-600 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

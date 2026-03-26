"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react"; // lightweight icons
import { toast } from "react-hot-toast/headless";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const logoutHandler = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    const response = await fetch("/api/users/logout", { method: "GET" });
    if (!response.ok) {
      toast.error("Logout failed. Please try again.");
      return;
    }
    logout();
  };

  useEffect(() => {}, [isLoggedIn]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="shrink-0 text-emerald-400 font-bold text-2xl tracking-tight">
            <Link href="/">CS MAJOR</Link>
          </div>

          {/* Desktop Navigation */}
          {isLoggedIn ? (
            ""
          ) : (
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
                  href="/About"
                  className="hover:text-emerald-400 active:text-emerald-500 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/Services"
                  className="hover:text-emerald-400 active:text-emerald-500 transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/Contact"
                  className="hover:text-emerald-400 active:text-emerald-500 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-2 gap-2">
            <Link
              href={isLoggedIn ? "/" : "/login"}
              onClick={isLoggedIn ? logoutHandler : undefined}
              className={`${isLoggedIn ? "bg-purple-400 hover:bg-purple-500" : "bg-purple-500 hover:bg-purple-600"} px-4 py-2 rounded-md text-white font-semibold transition duration-200`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Link>
            {!isLoggedIn && (
              <Link
                href="/signup"
                className="px-4 py-2 rounded-md bg-purple-500 text-white font-semibold 
                         hover:bg-purple-600 
                         active:bg-purple-700 
                         transition duration-200"
              >
                Sign Up
              </Link>
            )}
            {/* <AvatarMenu /> */}
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
            href="/Contact"
            className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
          >
            Contact
          </Link>
          <div className="flex space-x-4 pt-4 border-t border-gray-700">
            <Link
              href="/login"
              className="flex-1 text-center px-4 py-2 rounded-md border  text-gray-300 bg-green-600
                         hover:bg-green-700 hover:text-white transition duration-200"
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

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage user login status
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  // Simplify the isServer check
  const isServer = typeof window !== "undefined";

  // Reusable function for navigation
  const navigateTo = (path) => {
    router.push(path);
  };

  // Logout functionality
  const logout = () => {
    if (isServer) localStorage.removeItem("email");
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <div className="bg-white text-black">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="flex items-center justify-between md:py-8">
          {/* Logo */}
          <Link href="/Home" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
            <img height={50} width={50} src="logo.jpg" alt="RecPro Logo" />
            RecPro
          </Link>

          {/* Navigation */}
          <nav className="hidden gap-12 lg:flex">
            <a href="#" onClick={() => navigateTo("/")} className="text-lg font-semibold text-indigo-500">Home</a>
            <a href="#" onClick={() => navigateTo("/features")} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Feature</a>
            <a href="#" onClick={() => navigateTo("/webcam")} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Webcam</a>
            <a href="#" onClick={() => navigateTo("/screenshot")} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Screenshot</a>
            <a href="#" onClick={() => navigateTo("/audio")} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Audio</a>
            <a href="#" onClick={() => navigateTo("/webcamwithrecord")} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Video</a>
            <a href="#" onClick={() => navigateTo("/manage")} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Recorded Data</a>
            <a href="#" onClick={() => navigateTo("/about")} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">About</a>
            <a href="#" onClick={() => navigateTo("/contact")} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Contact</a>

            {/* Login/Logout Button or User Profile */}
            {isServer && !localStorage.getItem("email") ? (
              <button onClick={() => navigateTo("/login")} className="text-lg font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600">
                Login
              </button>
            ) : (
              <div
                className="relative"
                onClick={() => setMenuOpen(!menuOpen)} // Allow click to toggle menu
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button className="text-lg font-semibold text-black">
                  Hi {isServer && localStorage.getItem("name")} {/* Display user's name */}
                </button>

                {menuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-200">
                        <Link href="/profile">Profile</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-200">
                        <a href="#" onClick={logout}>Logout</a>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)} // Toggle mobile menu
              className="text-2xl text-black"
              aria-label="Toggle Menu"
            >
              ☰
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-4">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="#" onClick={() => navigateTo("/")}>Home</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="#" onClick={() => navigateTo("/features")}>Feature</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="#" onClick={() => navigateTo("/login")}>Login</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;

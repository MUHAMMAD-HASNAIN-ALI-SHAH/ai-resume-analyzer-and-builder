import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 sm:gap-3 cursor-pointer select-none">
          <Image
            src="/logo.png"
            alt="Logo"
            width={45}
            height={45}
            className="object-contain"
          />

          <h1 className="text-xl sm:text-2xl font-bold text-black">
            JobX
          </h1>
        </Link>

        {/* Center Nav Links */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">
          <a
            href="#home"
            className="relative text-black font-medium group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="#guide"
            className="relative text-black font-medium group"
          >
            Guide
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#testimonials"
            className="relative text-black font-medium group"
          >
            Testimonials
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/dashboard"
            className="relative text-black font-medium group"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Right Button */}
        <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1">
          Get Started
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
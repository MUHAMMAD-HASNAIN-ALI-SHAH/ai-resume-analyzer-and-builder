"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur-lg shadow-md fixed top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Name */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => router.push("/")}>
          
          {/* Logo Wrap */}
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
              Resume <span className="text-blue-600">Werse</span>
            </span>
            <span className="text-sm md:text-base text-gray-600">
              Your smart AI-powered CV assistant
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Get Started
          </button>
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-600 text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-inner border-t border-gray-200"
          >
            <div className="flex flex-col px-4 py-3 gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold shadow-md"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Logo Circle with Gradient */}
          <div className="w-12 h-12 rounded-full bg-linear-to-br flex items-center justify-center shadow-xl ">
            <img
              src="./logo.png"
              alt="Logo"
              className="w-15 h-15 object-cover"
            />
          </div>

          {/* Website Name */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight drop-shadow-md">
              Resume <span className="text-blue-600">Werse</span>
              {/* AI Resume
              <span className="text-blue-600"> Analyser</span> &{" "}
              <span className="text-cyan-500">Builder</span> */}
            </span>
            <span className="text-sm md:text-base text-gray-500">
              Your smart AI-powered CV assistant
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <h1
            onClick={()=>router.push("/dashboard")}
            className="ml-4 px-4 py-2 bg-linear-to-r cursor-pointer select-none from-cyan-400 to-blue-600 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Get Started
          </h1>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-600 focus:outline-none"
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
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="flex flex-col px-4 py-2 gap-2">
              <h1
                onClick={()=>router.push("/dashboard")}
                className="mt-2 px-4 py-2 bg-linear-to-r from-cyan-400 to-blue-600 text-white rounded-full font-semibold text-center"
              >
                Get Started
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

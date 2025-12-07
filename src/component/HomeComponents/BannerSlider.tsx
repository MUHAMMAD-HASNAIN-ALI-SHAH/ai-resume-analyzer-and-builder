"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    bg: "from-blue-600 via-indigo-600 to-purple-600",
    title: "Build Resume",
    subtitle: "AI-powered suggestions",
    icon: "📝",
  },
  {
    bg: "from-pink-500 via-red-500 to-orange-500",
    title: "Stand Out",
    subtitle: "Make your CV shine fast",
    icon: "🚀",
  },
  {
    bg: "from-cyan-500 via-blue-500 to-indigo-600",
    title: "Get Noticed",
    subtitle: "Smart templates & designs",
    icon: "✨",
  },
];

const BannerSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className={`absolute w-full h-full bg-linear-to-br ${slides[index].bg} flex items-center justify-center text-center px-4`}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-6xl md:text-7xl mb-4"
            >
              {slides[index].icon}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl"
            >
              {slides[index].title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-base md:text-2xl text-white drop-shadow-lg"
            >
              {slides[index].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 md:bottom-8 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              i === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;

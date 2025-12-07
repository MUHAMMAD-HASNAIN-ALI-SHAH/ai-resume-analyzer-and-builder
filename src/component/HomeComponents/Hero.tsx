"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

const Hero = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  function createRipple(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();

    setRipples((r) => [...r, { id, x, y, size }]);

    setTimeout(() => {
      setRipples((r) => r.filter((rr) => rr.id !== id));
    }, 600);
  }

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://www.ststechnicaljobs.com/wp-content/uploads/2024/01/Harnessing-AI-to-Elevate-Your-Resume-A-Guide-for-Job-Seekers.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* HERO CONTENT */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-full max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-snug mb-6 text-white"
        >
          Build Your Resume <span className="text-cyan-400">With AI</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-2xl text-white mb-8"
        >
          Effortlessly craft a standout resume with our AI-powered builder.
          Clean templates, smart suggestions, and export-ready results.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button
            ref={btnRef}
            onMouseDown={createRipple}
            className="relative overflow-hidden inline-flex items-center px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300"
            style={{
              background:
                "linear-gradient(90deg, #38f9ff 0%, #2ac1ff 50%, #0b3d91 100%)",
            }}
          >
            {ripples.map((r) => (
              <span
                key={r.id}
                className="ripple absolute rounded-full bg-white/50 opacity-60"
                style={{
                  width: `${r.size}px`,
                  height: `${r.size}px`,
                  left: `${r.x}px`,
                  top: `${r.y}px`,
                }}
              />
            ))}
            Get Started
          </button>

          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 bg-white/20 backdrop-blur-md text-white font-medium hover:scale-105 transition-transform duration-200">
            Watch Video
          </button>
        </motion.div>
      </main>
    </section>
  );
};

export default Hero;

"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import BannerSlider from "./BannerSlider";
import Headline from "./Headline";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/navigation";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

const ResumeLandingHero = () => {
  const router = useRouter();
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
    <div className="bg-linear-to-b from-white via-[#c9eeff] to-[#bfe1ff] flex flex-col">
      <Navbar />
      <br />
      <br />
      <br />
      <Headline />
      <BannerSlider />
      <br />
      <br />
      <br />

      {/* HERO SECTION */}
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

      {/* How it Works */}
      <section className="mt-16 w-full max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b3d91]">
            How it Works
          </h3>
          <p className="text-gray-500 mt-2 text-base md:text-lg">
            Give mock interviews in just 3 simple steps
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Write Prompt",
              icon: "📝",
              text: "Quickly generate a tailored prompt for your form using AI.",
            },
            {
              title: "Edit & Customize",
              icon: "✏️",
              text: "Fine-tune the generated content with an intuitive editor.",
            },
            {
              title: "Share & Collect",
              icon: "🔗",
              text: "Share your form and collect professional responses seamlessly.",
            },
          ].map((card, idx) => (
            <motion.article
              key={card.title}
              whileHover={{ y: -6, scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.2,
                type: "spring",
                stiffness: 300,
              }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl text-white shadow-md">
                {card.icon}
              </div>
              <h4 className="mt-4 text-xl font-bold text-[#0b3d91]">
                {card.title}
              </h4>
              <p className="mt-2 text-gray-500 text-sm md:text-base">
                {card.text}
              </p>
              <div className="mt-4 w-16 h-16 border-4 border-cyan-400 rounded-full animate-spin-slow flex items-center justify-center text-[#0b3d91] font-bold">
                {idx + 1}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button onClick={()=>router.push("/dashboard")} className="px-6 py-3 rounded-full bg-linear-to-r from-[#335cb6] to-[#918fff] text-white font-semibold shadow-lg hover:scale-[1.05] transition-transform text-base md:text-lg">
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResumeLandingHero;

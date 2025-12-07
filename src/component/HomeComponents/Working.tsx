"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Working = () => {
  return (
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
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-full bg-linear-to-r from-[#335cb6] to-[#918fff] text-white font-semibold shadow-lg hover:scale-[1.05] transition-transform text-base md:text-lg"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
};

export default Working;

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://helloi.ai/wp-content/uploads/elementor/thumbs/ai-resume-builder-qpa8fir5niayzt9g03ab11oc3hj0t0ooz716qqyfs6.jpeg",
    title: "Build Resume",
    subtitle: "AI-powered suggestions",
  },
  {
    image: "https://www.flexjobs.com/blog/wp-content/uploads/2019/03/10061416/set-apart.png",
    title: "Stand Out",
    subtitle: "Make your CV shine fast",
  },
  {
    image: "https://www.shutterstock.com/image-photo/youre-hired-260nw-623590175.jpg",
    title: "Get Noticed",
    subtitle: "Smart templates & designs",
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
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full"
        >
          <Image
            src={slides[index].image}
            alt={slides[index].title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
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

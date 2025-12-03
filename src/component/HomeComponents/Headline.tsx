import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const features = [
  'AI-powered resume suggestions',
  'Smart templates',
  'Export ready CVs',
  'Free for new users',
];

const Headline = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-linear-to-r from-cyan-400 to-blue-600 text-white py-4 px-4 flex items-center justify-between overflow-hidden">
      
      <h3 className="font-bold text-lg md:text-xl shrink-0">
        Try it <span className="text-yellow-300">Free</span> for New Users!
      </h3>

      <div className="flex-1 overflow-hidden ml-4 relative h-6 md:h-7">
        <motion.div
          className="absolute whitespace-nowrap"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        >
          {features.map((feature, i) => (
            <span key={i} className="mx-8 text-sm md:text-base">
              {feature} ⚡
            </span>
          ))}
        </motion.div>
      </div>

      <button onClick={()=>router.push("/dashboard")} className="ml-4 bg-yellow-300 text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition-transform">
        Get Started
      </button>
    </div>
  );
};

export default Headline;

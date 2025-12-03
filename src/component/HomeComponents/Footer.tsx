const Footer = () => {
  return (
    <footer
      className="w-full text-white mt-16 relative overflow-hidden"
      style={{
        background: `url('https://static.vecteezy.com/system/resources/previews/024/110/454/non_2x/concept-ai-machine-learning-artificial-intelligence-robot-learning-network-system-advance-ai-on-blue-futuristic-modern-hi-tech-background-vector.jpg') center/cover no-repeat`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">
            Build Your Resume <span className="text-cyan-400">With AI</span>
          </h2>
          <p className="text-gray-200 text-sm md:text-base max-w-xs">
            Build your resume effortlessly with AI-powered suggestions.
          </p>
        </div>

        {/* Social Icons */}
        {/* <div className="flex gap-4 text-lg">
          {[ 
            { icon: <FaWhatsapp />, link: 'https://wa.me/123456789', color: 'hover:text-green-400' },
            { icon: <FaFacebookF />, link: 'https://facebook.com', color: 'hover:text-blue-500' },
            { icon: <FaInstagram />, link: 'https://instagram.com', color: 'hover:text-pink-500' },
            { icon: <FaTwitter />, link: 'https://twitter.com', color: 'hover:text-sky-400' },
            { icon: <FaLinkedin />, link: 'https://linkedin.com', color: 'hover:text-blue-400' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${item.color} transition-transform transform hover:scale-125 p-3 bg-white/10 rounded-full shadow-lg`}
            >
              {item.icon}
            </a>
          ))}
        </div> */}
      </div>

      <div className="border-t border-white/20 mt-6 relative z-10">
        <p className="text-center text-gray-200 text-sm py-4">
          © {new Date().getFullYear()} Build Your Resume <span className="text-cyan-400">With AI</span> • Made with <span className="text-red-500">❤️</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

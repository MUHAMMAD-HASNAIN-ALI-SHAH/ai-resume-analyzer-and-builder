import BannerSlider from "@/component/HomeComponents/BannerSlider";
import Footer from "@/component/HomeComponents/Footer";
import Hero from "@/component/HomeComponents/Hero";
import Navbar from "@/component/HomeComponents/Navbar";
import Working from "@/component/HomeComponents/Working";

export default function Home() {
  return (
    <div className="bg-linear-to-b from-white via-[#c9eeff] to-[#bfe1ff] flex flex-col">
      <Navbar />
      <BannerSlider />
      <Hero />
      <Working />
      <Footer />
    </div>
  );
}

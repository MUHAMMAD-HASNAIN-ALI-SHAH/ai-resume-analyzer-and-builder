import Navbar from "@/component/HomePageComponents/Navbar";
import Hero from "@/component/HomePageComponents/Hero";
import Features from "@/component/HomePageComponents/Features";
import Steps from "@/component/HomePageComponents/Steps";
import CTA from "@/component/HomePageComponents/CTA";
import Testimonials from "@/component/HomePageComponents/Testimonials";
import Footer from "@/component/HomePageComponents/Footer";
import Newsletter from "@/component/HomePageComponents/Newsletter";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Features />
      <Steps />
      <CTA />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

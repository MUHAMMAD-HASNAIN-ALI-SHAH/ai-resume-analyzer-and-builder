"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Michael D.",
    image: "/users/user1.png",
    review:
      "JobX helped me build an ATS-friendly resume. I received multiple interview calls within days.",
  },
  {
    name: "Sarah K.",
    image: "/users/user2.png",
    review:
      "The templates are modern and easy to customize. I landed my internship using JobX.",
  },
  {
    name: "Ali Hassan",
    image: "/users/user3.png",
    review:
      "One of the best resume builders I've used. Clean UI and very easy to use.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          Our <span className="text-violet-600">Impact</span>, Told by You
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop
          spaceBetween={30}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.name}>
              <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-3xl mx-auto">

                <Image
                  src={item.image}
                  alt={item.name}
                  width={90}
                  height={90}
                  className="rounded-full mx-auto border-4 border-violet-500"
                />

                <p className="text-gray-600 mt-8 leading-8 text-lg">
                  &quot;{item.review}&quot;
                </p>

                <h3 className="mt-8 text-xl font-bold">
                  {item.name}
                </h3>

                <div className="text-yellow-400 text-2xl mt-2">
                  ⭐⭐⭐⭐⭐
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
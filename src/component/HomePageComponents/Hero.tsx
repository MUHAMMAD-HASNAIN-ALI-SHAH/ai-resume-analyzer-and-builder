"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {

  const router = useRouter();

  return (
    <section id="home" className="pt-32 pb-20 w-full max-w-7xl mx-auto">
      <div className="px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold leading-tight">
            Accelerate Your
            <span className="text-blue-600"> Career</span>
          </h1>

          <p className="text-gray-500 mt-6 max-w-lg">
            Discover your dream job, create a standout resume and
            track applications in one place.
          </p>

          <button
            className="mt-8 bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-xl"
            onClick={() => router.push("/dashboard")}
          >
            Get Started
          </button>

          <div className="flex gap-12 mt-12">
            <div>
              <h3 className="font-bold text-2xl">25K+</h3>
              <p className="text-gray-500">Users</p>
            </div>

            <div>
              <h3 className="font-bold text-2xl">10K+</h3>
              <p className="text-gray-500">Placements</p>
            </div>

            <div>
              <h3 className="font-bold text-2xl">1200+</h3>
              <p className="text-gray-500">Companies</p>
            </div>
          </div>
        </div>

        <div className=" flex justify-center">
          <Image
            src="/logo.png"
            alt=""
            width={350}
            height={350}
            className=""
          />
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();
  return (
    <section className="bg-[#070D1F] py-10 border-b-2 border-gray-500">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">

        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
          />

          <h1 className="text-4xl font-bold text-white">
            JobX
          </h1>
        </div>

        <h2 className="text-4xl font-bold text-white mt-10">
          Ready to Build Your Professional Resume?
        </h2>

        <p className="text-gray-400 mt-5 max-w-2xl leading-7">
          Create ATS-friendly resumes, manage multiple versions,
          and land your dream job with JobX.
        </p>

        <button
          className="mt-10 bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl text-white font-semibold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Get Started
        </button>

      </div>
    </section>
  );
}
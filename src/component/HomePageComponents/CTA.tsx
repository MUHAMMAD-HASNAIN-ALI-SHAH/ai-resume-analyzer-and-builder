"use client";

import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();
  return (
    <section className="py-20 bg-linear-to-r from-violet-500 to-purple-300">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">
          Ready to start your career journey?
        </h2>

        <button
          className="mt-8 bg-white px-8 py-3 rounded-lg text-violet-600 font-semibold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Join Now
        </button>
      </div>
    </section>
  );
}
"use client";

import useCreateResumeStore, { CreateResume } from "@/store/useCreateResumeStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ResumeBuilderMain = () => {
  const router = useRouter();

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
      {/* Create Resume */}
      <div
        onClick={() => router.push("/dashboard/resume-builder/create-resume")}
        className="h-72 w-60 shadow-md border border-gray-200 flex flex-col justify-center items-center cursor-pointer select-none rounded-xl bg-white hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out"
      >
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Create Resume
        </h1>
      </div>
      
    </div>
  );
};

export default ResumeBuilderMain;

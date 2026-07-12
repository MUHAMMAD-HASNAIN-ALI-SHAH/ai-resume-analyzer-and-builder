"use client";

import useResumeAnalyserStore from "@/store/useResumeAnalyserStore";
import ResumeAnalyserForm from "./ResumeAnalyserForm";
import ATSOverview from "./ATSOverview";
import ResumeAnalyzerHeader from "./ResumeAnalyzerHeader";

const ResumeAnalyzerMain = () => {
  const { submitForAnalysis } = useResumeAnalyserStore();
  return (
    <div className="flex flex-col justify-between items-center gap-1 h-full w-full px-2 xl:px-5 py-3 xl:py-7">

      <ResumeAnalyzerHeader />

      <section className="w-full border-t-4 border-blue-600 rounded-sm py-2 xl:py-5 px-2 xl:px-5 shadow-2xl text-black min-h-screen xl:min-h-[600px] gap-5">
        {!submitForAnalysis && <ResumeAnalyserForm />}
        {submitForAnalysis && <ATSOverview />}
      </section>
    </div>
  );
};

export default ResumeAnalyzerMain;

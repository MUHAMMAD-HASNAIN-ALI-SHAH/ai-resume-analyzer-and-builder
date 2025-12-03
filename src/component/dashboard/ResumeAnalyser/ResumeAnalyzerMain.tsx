"use client";

import useResumeAnalyserStore from "@/store/useResumeAnalyserStore";
import ResumeAnalyserForm from "./ResumeAnalyserForm";
import ATSOverview from "./ATSOverview";

const ResumeAnalyzerMain = () => {
    const { submitForAnalysis } = useResumeAnalyserStore();
  return (
    <>
      {!submitForAnalysis && (
        <div className="mt-4 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg">
            Upload your resume to analyze its ATS compatibility and get
            optimization suggestions.
          </p>
        </div>
      )}

      {!submitForAnalysis && <ResumeAnalyserForm />}
      {submitForAnalysis && <ATSOverview />}
    </>
  );
};

export default ResumeAnalyzerMain;

import { useState } from "react";
import { AlertTriangle, ArrowBigDown, File, Loader2, X } from "lucide-react";
import useResumeAnalyserStore from "../../../store/useResumeAnalyserStore";

const ATSOverview = () => {
  const { atsString, reset, submitting } = useResumeAnalyserStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const radius = 80;
  const circumference = Math.PI * radius; // Half circle
  const offset = circumference - (atsString.atsScore / 100) * circumference;

  let scoreColor = "red-500";
  if (atsString.atsScore >= 80) scoreColor = "green-500";
  else if (atsString.atsScore >= 50) scoreColor = "yellow-500";

  return (
    <div className="max-w-7xl mx-auto mt-10 flex flex-col items-center px-4">
      {submitting && (
        <div className="flex flex-col items-center justify-center h-96 w-full bg-white rounded-lg shadow-md">
          <div className="animate-spin">
            <Loader2 className="h-12 w-12 text-blue-500" />
          </div>
            <span className="ml-4 text-gray-600">Analyzing your resume...</span>
        </div>
      )}
      {!submitting && (
        <>
          {/* Semicircle & Overview */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 w-full mb-10">
            <X
              onClick={reset}
              className="absolute right-0 top-0 cursor-pointer text-gray-500 hover:text-gray-700 transition-transform transform -translate-x-6"
            />
            <div className="relative w-40 h-32">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 100"
                className="overflow-visible"
              >
                {/* Background semicircle */}
                <path
                  d="M 10 90 A 90 90 0 0 1 190 90"
                  fill="transparent"
                  stroke="#e5e7eb"
                  strokeWidth="20"
                />
                {/* Progress semicircle */}
                <path
                  d="M 10 90 A 90 90 0 0 1 190 90"
                  fill="transparent"
                  stroke={`rgb(${
                    scoreColor === "red-500"
                      ? "239,68,68"
                      : scoreColor === "yellow-500"
                      ? "234,179,8"
                      : "34,197,94"
                  })`}
                  strokeWidth="20"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>
              {/* Score text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center -top-1">
                <span className="text-3xl font-bold text-gray-800">
                  {atsString.atsScore}
                </span>
                <span className="text-lg text-gray-500">/100</span>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                ATS Score Overview
              </h1>
              <p className="text-gray-600 mb-1">
                Your resume has an ATS compatibility score of{" "}
                <span className={`font-semibold text-${scoreColor}`}>
                  {atsString.atsScore}
                </span>
                /100.
              </p>
              <p className="text-gray-600">
                This score shows how well your resume is optimized for ATS
                systems.
              </p>
            </div>
          </div>

          {/* Suggestions */}
          <div
            className={`w-full p-6 rounded-xl shadow-md mb-10 bg-gradient-to-r ${
              atsString.atsScore >= 80
                ? "from-green-100 to-green-50"
                : atsString.atsScore >= 50
                ? "from-yellow-100 to-yellow-50"
                : "from-red-100 to-red-50"
            }`}
          >
            <h3 className="text-xl font-semibold flex items-center mb-3">
              <File className="inline-block mr-2" />
              ATS Score Details
            </h3>
            {atsString.atsPoints && atsString.atsPoints.length ? (
              <ul className="space-y-3">
                {atsString.atsPoints.map((item, index) => (
                  <li key={index} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-red-600 mt-1" />
                        <span className="text-gray-800 font-medium">
                          {item.point}
                        </span>
                      </div>
                      <button
                        className="text-blue-500 text-sm hover:underline"
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                      >
                        <ArrowBigDown
                          className={`transform transition-transform ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {openIndex === index && (
                      <p className="text-gray-700 pl-7 transition">
                        {item.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">
                No issues detected! Your resume is optimized.
              </p>
            )}
          </div>

          {/* Missing Keywords */}
          <div
            className={`w-full p-6 rounded-xl shadow-md mb-10 bg-gradient-to-r ${
              atsString.atsScore >= 80
                ? "from-green-100 to-green-50"
                : atsString.atsScore >= 50
                ? "from-yellow-100 to-yellow-50"
                : "from-red-100 to-red-50"
            }`}
          >
            <h3 className="text-xl font-semibold flex items-center mb-3">
              <File className="inline-block mr-2" />
              Missing Keywords
            </h3>

            {atsString.atsMissingKeywords &&
            atsString.atsMissingKeywords.length > 0 ? (
              <ul className="space-y-2 list-inside text-gray-700 list-none">
                {atsString.atsMissingKeywords.map((keyword, index) => (
                  <li key={index}>
                    <span className="font-bold">{keyword.missingKeyword}</span>{" "}
                    - {keyword.reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No missing keywords detected.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ATSOverview;

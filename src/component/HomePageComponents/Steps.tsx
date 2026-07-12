import {
  UserPlus,
  FileText,
  ScanSearch,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    title: "Create Account",
    description: "Sign up and access your personal resume dashboard.",
    icon: UserPlus,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Build Your Resume",
    description: "Create a professional ATS-friendly resume using our builder.",
    icon: FileText,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Analyze Resume",
    description: "Upload your resume and compare it with a job description.",
    icon: ScanSearch,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Improve ATS Score",
    description: "Get your ATS score, missing keywords, and improvement tips.",
    icon: BadgeCheck,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function Steps() {
  return (
    <section id="guide" className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-center text-5xl font-bold">
          How <span className="text-blue-600">JobX</span> Works
        </h2>

        <p className="text-center text-gray-500 mt-5 max-w-2xl mx-auto">
          Build a professional resume, analyze it against any job description,
          and improve your ATS score in just a few simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mt-4 rounded-2xl flex items-center justify-center ${step.color}`}
                >
                  <Icon size={32} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 leading-7">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
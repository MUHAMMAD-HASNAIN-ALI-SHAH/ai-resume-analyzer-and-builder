import {
  FileText,
  BadgeCheck,
  ScanSearch,
  SearchCheck,
} from "lucide-react";

const features = [
  {
    title: "Resume Builder",
    description:
      "Build professional, ATS-friendly resumes using modern templates.",
    icon: FileText,
  },
  {
    title: "ATS Score Analysis",
    description:
      "Get an ATS compatibility score with detailed feedback on your resume.",
    icon: BadgeCheck,
  },
  {
    title: "Job Description Matching",
    description:
      "Compare your resume with a job description and see your match percentage.",
    icon: ScanSearch,
  },
  {
    title: "Missing Keywords",
    description:
      "Discover missing skills and keywords that recruiters and ATS systems expect.",
    icon: SearchCheck,
  },
];

export default function Features() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-5xl font-bold">
          Designed for Your
          <span className="text-blue-600"> Journey</span>
        </h2>

        <p className="text-center text-gray-500 mt-5 max-w-2xl mx-auto">
          Everything you need to create an ATS-friendly resume, analyze it,
          compare it with job descriptions, and improve your chances of getting
          hired.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-start gap-5 p-8 rounded-2xl border border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shrink-0">
                  <Icon size={32} strokeWidth={2.2} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
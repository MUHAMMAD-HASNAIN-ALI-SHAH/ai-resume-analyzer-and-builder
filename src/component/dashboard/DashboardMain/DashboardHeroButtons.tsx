import Link from "next/link";

export default function DashboardHeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
      {/* Create Resume */}
      <Link
        href="/dashboard/resume-builder"
        className="px-6 py-3 sm:px-10 sm:py-4 rounded-full text-lg font-semibold text-white shadow-md bg-linear-to-r from-blue-500 via-blue-400 to-blue-300 hover:scale-105 transition-transform duration-200 text-center"
      >
        Create Resume
      </Link>

      {/* Analyze Resume */}
      <Link
        href="/dashboard/resume-analyser"
        className="px-6 py-3 sm:px-10 sm:py-4 rounded-full text-lg font-semibold text-white shadow-md bg-linear-to-r from-indigo-500 via-indigo-400 to-blue-400 hover:scale-105 transition-transform duration-200 text-center"
      >
        Analyze Your Resume
      </Link>
    </div>
  );
}

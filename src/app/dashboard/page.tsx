import CopyWriteLine from "@/component/dashboard/DashboardMain/CopywriteLine";
import Features from "@/component/dashboard/DashboardMain/FeatureBox";
import HowItWorks from "@/component/dashboard/DashboardMain/Guidance";
import DashboardHeroButtons from "@/component/dashboard/DashboardMain/DashboardHeroButtons";
import Navbar from "@/component/dashboard/Navbar";
import { auth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

const page = async () => {
  const user = await auth();

  if (!user) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
        <p className="mt-3 text-gray-500 font-medium">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="w-full max-w-5xl mx-auto pt-36 px-4 text-center bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Welcome,{" "}
          <span className="text-blue-500">{user.user?.name || "User"}</span> 👋
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your resumes, analyze for ATS optimization, and export them
          professionally.
        </p>

        {/* Action Buttons */}
        <DashboardHeroButtons />
      </div>
      <div className=" w-full mt-20 bg-linear-to-b from-purple-500 to-indigo-600">
        <Features />
        <HowItWorks />
      </div>
      <CopyWriteLine />
    </div>
  );
};

export default page;

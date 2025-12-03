import CopyWriteLine from "@/component/dashboard/DashboardMain/CopywriteLine";
import Navbar from "@/component/dashboard/Navbar";
import ResumeAnalyzerMain from "@/component/dashboard/ResumeAnalyser/ResumeAnalyzerMain";
import { ArrowBigLeftIcon } from "lucide-react";

const page = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
        <Navbar />
      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10">
         <ArrowBigLeftIcon className="absolute left-0 top-10 cursor-pointer text-gray-500 hover:text-gray-700 transition-transform transform -translate-x-6" />
        <div className="text-center font-bold text-2xl text-blue-600">
          Resume Analyzer
        </div>
        <ResumeAnalyzerMain />
      </div>
      <CopyWriteLine/>
    </div>
  );
};

export default page;

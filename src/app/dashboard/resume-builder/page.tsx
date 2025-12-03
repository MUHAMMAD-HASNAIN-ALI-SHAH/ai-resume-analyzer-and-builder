import Navbar from "@/component/dashboard/Navbar";
import CopyWriteLine from "@/component/dashboard/DashboardMain/CopywriteLine";
import ResumeBuilderMain from "@/component/dashboard/CreateResume/ResumeBuilderMain";

const page = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {/* Title */}
        <div className="text-center font-bold text-3xl text-blue-600 mt-12">
          Resume Builder
        </div>
        <div className="mt-3 text-center">
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create and manage your resumes effortlessly with our easy-to-use
            tools.
          </p>
        </div>
        <ResumeBuilderMain />
      </div>
      <CopyWriteLine />
    </div>
  );
};

export default page;

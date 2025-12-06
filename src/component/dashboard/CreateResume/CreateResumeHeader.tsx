import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import useCreateResumeStore from "../../../store/useCreateResumeStore";
import { useRouter } from "next/navigation";

const CreateResumeHeader = () => {
  const router = useRouter();
  const { prevFormMenu, nextFormMenu } = useCreateResumeStore();
  return (
    <div className="w-full px-3 pb-2">
      <header className="flex justify-between">
        <button onClick={()=>router.push("/dashboard")} className="bg-blue-600 p-2 rounded-sm cursor-pointer">
          <Home className="w-6 h-6 text-gray-300" />
        </button>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevFormMenu}
            className="bg-blue-600 p-2 rounded-sm cursor-pointer"
          >
            <ArrowLeft className="text-gray-300 w-6 h-6" />
          </button>
          <button
            onClick={nextFormMenu}
            className="bg-blue-600 p-2 text-white rounded-sm cursor-pointer"
          >
            <ArrowRight className="text-gray-300 w-6 h-6 inline" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default CreateResumeHeader;

"use client";

import CreateResumeForm from "@/component/dashboard/CreateResume/CreateResumeForm";
import CreateResumeHeader from "@/component/dashboard/CreateResume/CreateResumeHeader";
import ResumePreview from "@/component/dashboard/CreateResume/ResumePreview";
import useCreateResumeStore from "@/store/useCreateResumeStore";
import { useEffect } from "react";

const CreateResumeMain = () => {
  const { reset } = useCreateResumeStore();

  useEffect(() => {
    reset();
  }, [reset]);
  return (
    <div className="flex flex-col xl:flex-row justify-between items-start gap-1 h-full w-full px-5 py-7">
      <div className="w-full xl:w-[40%] px-0">
        <CreateResumeHeader />
        <CreateResumeForm />
      </div>

      <div className="w-full xl:w-[60%] pt-10 xl:pb-0">
        <ResumePreview />
      </div>
    </div>
  );
};

export default CreateResumeMain;

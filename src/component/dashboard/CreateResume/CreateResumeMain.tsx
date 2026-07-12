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
    <div className="flex flex-col justify-between items-center gap-1 h-full w-full px-2 xl:px-5 py-3 xl:py-7">

      <CreateResumeHeader />
      <CreateResumeForm />

      <div className="w-full pt-10 xl:pb-0 hidden lg:block">
        <ResumePreview />
      </div>
    </div>
  );
};

export default CreateResumeMain;

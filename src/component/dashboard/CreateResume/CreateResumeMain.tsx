"use client";

import CreateResumeForm from "@/component/dashboard/CreateResume/CreateResumeForm";
import CreateResumeHeader from "@/component/dashboard/CreateResume/CreateResumeHeader";
import ResumePreview from "@/component/dashboard/CreateResume/ResumePreview";
import useCreateResumeStore from "@/store/useCreateResumeStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateResumeMain = () => {
  const { formSubmitted, reset } = useCreateResumeStore();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (formSubmitted) {
      setIsPreviewOpen(true);
    }
  }, [formSubmitted]);
  return (
    <>
      {!formSubmitted && (
        <div className="text-center mt-4">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Preview Resume
          </button>
        </div>
      )}

      <div className="flex flex-col xl:flex-row justify-center items-center gap-3">
        {!formSubmitted && (
          <div className="w-full md:w-[90%] lg:w-[60%] xl:w-[40%] px-7 py-5">
            <CreateResumeHeader />
            <CreateResumeForm />
          </div>
        )}

        <ResumePreview
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            if (formSubmitted) {
              reset();
              router.push("/dashboard/resume-builder");
            }
          }}
        />
      </div>
    </>
  );
};

export default CreateResumeMain;

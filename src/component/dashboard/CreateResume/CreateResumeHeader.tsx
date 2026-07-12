import useCreateResumeStore from "@/store/useCreateResumeStore";
import { Download, FileText } from "lucide-react";
import { useState } from "react";

const CreateResumeHeader = () => {
  const [loader, setLoader] = useState(false);
  const { form } = useCreateResumeStore();

  const onSubmit = async () => {
    if (loader) return;

    setLoader(true);
    try {
      const res = await fetch("/api/create-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("Failed to generate PDF");
        alert("Failed to generate PDF");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full px-3 pb-2">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600">
            <FileText className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold md:text-2xl">
              Create Resume
            </h1>
            <p className="text-sm text-gray-600 md:text-base">
              Create Your Professional Resume
            </p>
          </div>
        </div>

        {/* Download Button */}
        <button onClick={onSubmit} className="flex w-full md:w-auto items-center justify-center gap-3 rounded-2xl bg-blue-600 cursor-pointer px-5 py-3 text-white transition">
          <Download className="h-5 w-5 md:h-6 md:w-6" />
          <span className="font-semibold">
            {loader ? "Generating PDF..." : "Download Resume"}
          </span>
        </button>
      </header>
    </div>
  );
};

export default CreateResumeHeader;
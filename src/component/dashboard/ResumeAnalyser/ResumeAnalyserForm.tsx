import { File, Upload } from "lucide-react";
import { useRef } from "react";
import useResumeAnalyserStore from "../../../store/useResumeAnalyserStore";

const ResumeAnalyserForm = () => {
  const { handleFormStrings, form, getResumeATSScore } =
    useResumeAnalyserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Upload Resume Button */}
        <div className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-200 hover:border-blue-400 w-full max-w-lg mx-auto">
          {/* Company Name */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              onChange={handleFormStrings}
              placeholder="Enter company name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position Title
            </label>
            <input
              type="text"
              name="positiontitle"
              onChange={handleFormStrings}
              value={form.positiontitle}
              placeholder="Enter position title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Company Description */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              onChange={handleFormStrings}
              name="companyDescription"
              value={form.companyDescription}
              placeholder="Enter a brief company description"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={getResumeATSScore}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Analyze Resume
          </button>
        </div>

        {/* Previous Resume Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-200 hover:border-blue-400"
        >
          {!form.file && (
            <>
              <Upload className="w-10 h-10 text-blue-500 mb-3" />
              <span className="text-lg font-semibold text-gray-700">
                Upload New Resume
              </span>
              <span className="text-sm text-gray-500 mt-1">PDF format</span>
            </>
          )}
          {form.file && (
            <>
              <File className="w-10 h-10 text-blue-500 mb-3" />{" "}
              <span className="text-lg font-semibold text-gray-700">
                {form.file.name}
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Click to upload a different file
              </span>
            </>
          )}
        </button>
      </div>

      <input
        onChange={handleFormStrings}
        ref={fileInputRef}
        type="file"
        name="file"
        accept=".pdf"
        className="hidden"
      />
    </>
  );
};

export default ResumeAnalyserForm;

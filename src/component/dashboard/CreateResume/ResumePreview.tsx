import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useCreateResumeStore from "../../../store/useCreateResumeStore";

interface ResumePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ isOpen, onClose }) => {
  const { form, formSubmitted } = useCreateResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${form.fullname || "resume"}`,
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 text-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Close when clicking background
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-[90%] h-[90%] p-6 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ✖
        </button>

        <div className="flex flex-col items-center gap-4 mr-5 mt-5 min-h-[40vh]">
          {formSubmitted && (
            <button
              type="button"
              onClick={handlePrint}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Download PDF
            </button>
          )}

          <div
            ref={resumeRef}
            className="bg-white print:bg-white print:text-black print:shadow-none p-4 sm:p-6 font-sans w-full max-w-[800px] mx-auto text-xs sm:text-sm md:text-base print:w-[800px] print:mx-auto"
          >
            {/* Name */}
            <h1 className="text-lg sm:text-xl font-semibold text-center">
              {form.fullname}
            </h1>
            <p className="text-center font-bold text-lg sm:text-2xl text-green-500 print:text-black">
              {form.jobtitle}
            </p>
            <p className="text-center text-sm sm:text-md">{form.address}</p>

            {/* Contact */}
            <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs sm:text-sm text-gray-600 gap-1 sm:gap-0 print:text-black">
              <p>{form.phone}</p>
              <p>{form.email}</p>
            </div>

            {/* Summary */}
            {form.summary &&
              form.summary.replace(/<[^>]*>/g, "").trim() !== "" && (
                <div className="mt-3">
                  <hr className="border-green-500 mb-1" />
                  <div
                    className="mt-1"
                    dangerouslySetInnerHTML={{ __html: form.summary }}
                  />
                </div>
              )}

            {/* Experience */}
            {form.experience?.length > 0 && (
              <div className="mt-3">
                <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase print:text-black">
                  Professional Experience
                </h2>
                <hr className="border-green-500 mb-1" />
                {form.experience.map((exp, index) => (
                  <div key={index} className="mt-2 mb-5">
                    <h3 className="font-bold text-green-500 print:text-black">
                      {exp.positiontitle}
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm">
                      <p>
                        {exp.companyname}
                        {exp.city ? "," : ""} {exp.city}
                        {exp.state ? "," : ""} {exp.state}
                      </p>
                      <p>
                        {exp.startdate} {exp.enddate ? "-" : ""} {exp.enddate}
                      </p>
                    </div>
                    <div
                      className="mt-1"
                      dangerouslySetInnerHTML={{ __html: exp.summary }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {form.education?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase print:text-black">
                  Education
                </h2>
                <hr className="border-green-500 mb-1" />
                {form.education.map((edu, index) => (
                  <div key={index} className="mb-6 p-2 sm:p-4 print:p-0">
                    <h3 className="text-sm sm:text-lg font-semibold text-green-700 print:text-black">
                      {edu.universityname}
                      <span className="text-gray-600 font-medium">
                        {" "}
                        — {edu.degree}
                      </span>
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-500 mt-1 print:text-black">
                      <p>
                        {edu.startdate} — {edu.enddate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {form.projects?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase print:text-black">
                  Projects
                </h2>
                <hr className="border-green-500 mb-1" />
                {form.projects.map((pro, index) => (
                  <div key={index} className="mb-6 p-2 sm:p-4 print:p-0">
                    <div className="flex flex-row justify-between items-center text-xs sm:text-sm text-gray-500 mt-1 print:text-black">
                      <h3 className="text-sm sm:text-lg font-semibold text-green-700 print:text-black">
                        {pro.projectname}
                      </h3>
                      <h3>
                        {pro.startdate} — {pro.enddate}
                      </h3>
                    </div>
                    {pro.description && (
                      <p className="mt-3 text-gray-700 leading-relaxed print:text-black">
                        {pro.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {form.skills?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-base sm:text-lg font-semibold text-center text-green-500 uppercase print:text-black">
                  Skills
                </h2>
                <hr className="border-green-500 mb-1" />
                <ul className="list-disc grid grid-cols-2 sm:grid-cols-5 pl-5 mt-3 text-xs sm:text-sm print:text-black">
                  {form.skills.map((skill, index) => (
                    <li key={index} className="text-gray-700 print:text-black">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

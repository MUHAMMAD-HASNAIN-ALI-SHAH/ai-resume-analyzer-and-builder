import { useState } from "react";
import { FormPersonalDetails, FormSummary, FormProfessionalExperience, FormEducation, FormProjects, FormSkills } from "./FormCards";

const CreateResumeForm = () => {
  const [formMenu, setFormMenu] = useState("personal-details");

  return (
    <section className="w-full flex flex-col xl:flex-row justify-start border-t-4 border-blue-600 rounded-sm py-2 xl:py-5 px-2 xl:px-5 shadow-2xl text-black gap-5">
      <div className="text-black w-full">
        <h1 className="font-bold text-xl">Create Resume</h1>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            className={`rounded-lg cursor-pointer px-4 py-2 ${formMenu === "personal-details"
              ? "bg-blue-600 text-white"
              : "bg-blue-100"
              }`}
            onClick={() => setFormMenu("personal-details")}
          >
            Personal Details
          </button>
          <button
            className={`rounded-lg cursor-pointer px-4 py-2 ${formMenu === "summary"
              ? "bg-blue-600 text-white"
              : "bg-blue-100"
              }`}
            onClick={() => setFormMenu("summary")}
          >
            Summary
          </button>
          <button
            className={`rounded-lg cursor-pointer whitespace-pre-wrap md:whitespace-nowrap px-4 py-2 ${formMenu === "professional-experience"
              ? "bg-blue-600 text-white"
              : "bg-blue-100"
              }`}
            onClick={() => setFormMenu("professional-experience")}
          >
            Professional Experience
          </button>
          <button
            className={`rounded-lg cursor-pointer px-4 py-2 ${formMenu === "education"
              ? "bg-blue-600 text-white"
              : "bg-blue-100"
              }`}
            onClick={() => setFormMenu("education")}
          >
            Education
          </button>
          <button
            className={`rounded-lg cursor-pointer px-4 py-2 ${formMenu === "projects"
              ? "bg-blue-600 text-white"
              : "bg-blue-100"
              }`}
            onClick={() => setFormMenu("projects")}
          >
            Projects
          </button>
          <button
            className={`rounded-lg cursor-pointer px-4 py-2 ${formMenu === "skills"
              ? "bg-blue-600 text-white"
              : "bg-blue-100"
              }`}
            onClick={() => setFormMenu("skills")}
          >
            Skills
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between items-center gap-1 h-full py-2 xl:py-5 px-2 xl:px-5">
        <div className="w-full border-t-4 border-blue-600 rounded-sm py-5 px-5 shadow-2xl text-black overflow-y-auto xl:h-full">
          {formMenu === "personal-details" && <FormPersonalDetails />}
          {formMenu === "summary" && <FormSummary />}
          {formMenu === "professional-experience" && <FormProfessionalExperience />}
          {formMenu === "education" && <FormEducation />}
          {formMenu === "projects" && <FormProjects />}
          {formMenu === "skills" && <FormSkills />}
        </div>
      </div>
    </section>
  );
};

export default CreateResumeForm;


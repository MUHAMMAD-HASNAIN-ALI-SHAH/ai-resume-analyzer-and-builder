import { useState } from "react";
import useCreateResumeStore from "../../../store/useCreateResumeStore";

const CreateResumeForm = () => {
  const { formMenu } = useCreateResumeStore();

  return (
    <div className="w-full border-t-4 border-blue-600 rounded-sm py-5 px-5 shadow-2xl text-black">
      {formMenu === 1 && <FormPersonalDetails />}
      {formMenu === 2 && <FormSummary />}
      {formMenu === 3 && <FormProfessionaExperience />}
      {formMenu === 4 && <FormEducation />}
      {formMenu === 5 && <FormProjects />}
      {formMenu === 6 && <FormSkills />}
    </div>
  );
};

const FormPersonalDetails = () => {
  const { handleFormStrings, form } = useCreateResumeStore();
  return (
    <>
      <h1 className="font-bold text-xl">Personal Details</h1>
      <p className="text-md">Get started with the basic information</p>
      <div className="w-full space-y-3 pt-5">
        <div>
          <label htmlFor="">Full Name</label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleFormStrings}
            className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="">Job Title</label>
          <input
            value={form.jobtitle}
            onChange={handleFormStrings}
            name="jobtitle"
            className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="">Address</label>
          <input
            value={form.address}
            onChange={handleFormStrings}
            name="address"
            className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <label htmlFor="">Phone</label>
            <input
              value={form.phone}
              onChange={handleFormStrings}
              name="phone"
              className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full">
            <label htmlFor="">Email</label>
            <input
              value={form.email}
              onChange={handleFormStrings}
              name="email"
              className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <SaveAndNextButton />
        </div>
      </div>
    </>
  );
};

const FormSummary = () => {
  const { handleFormStrings, form } = useCreateResumeStore();
  return (
    <>
      <h1 className="font-bold text-xl">Summary</h1>
      <p className="text-md">Add summary for your job title</p>
      <div className="w-full space-y-3 pt-5">
        <div>
          <label htmlFor="">Add Summary</label>
          <textarea
            rows={10}
            value={form.summary}
            onChange={(e: any) =>
              handleFormStrings({
                target: { name: "summary", value: e?.target?.value ?? e },
              } as any)
            }
            className="border p-2 w-full resize-none border-blue-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-full flex justify-end">
          <SaveAndNextButton />
        </div>
      </div>
    </>
  );
};

const FormProfessionaExperience = () => {
  const {
    form,
    addMoreExperienceButton,
    removeLastExperience,
    handleExperienceStrings,
    handleRichTextEditorText,
  } = useCreateResumeStore();
  const [html, setHtml] = useState<string[]>([]);
  function onChange(value: string, index: number) {
    const updatedHtml = [...html];
    updatedHtml[index] = value;
    setHtml(updatedHtml);
    handleRichTextEditorText(value, index);
  }

  return (
    <>
      <h1 className="font-bold text-xl">Professional Experience</h1>
      <p className="text-md">Add Your Professional Job Experience</p>
      <div className="w-full space-y-7 pt-5">
        {form.experience.length > 0 &&
          form.experience.map((experience, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label htmlFor="">Position title</label>
                  <input
                    value={experience.positiontitle}
                    onChange={(e) => handleExperienceStrings(e, index)}
                    name="positiontitle"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Company Name</label>
                  <input
                    value={experience.companyname}
                    onChange={(e) => handleExperienceStrings(e, index)}
                    name="companyname"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label htmlFor="">City</label>
                  <input
                    value={experience.city}
                    onChange={(e) => handleExperienceStrings(e, index)}
                    name="city"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">Country</label>
                  <input
                    value={experience.country}
                    onChange={(e) => handleExperienceStrings(e, index)}
                    name="country"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label htmlFor="">Start Date</label>
                  <input
                    type="date"
                    value={experience.startdate}
                    onChange={(e) => handleExperienceStrings(e, index)}
                    name="startdate"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">End Date</label>
                  <input
                    type="date"
                    value={experience.enddate}
                    onChange={(e) => handleExperienceStrings(e, index)}
                    name="enddate"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="">Summary</label>
                <textarea
                  rows={7}
                  value={html[index] || experience.summary}
                  onChange={(e) => onChange(e.target.value, index)}
                  className="border p-2 w-full resize-none border-blue-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={addMoreExperienceButton}
              className="border border-blue-300 text-blue-500 px-3 py-2 rounded-md cursor-pointer"
            >
              Add Experience
            </button>
            <button
              onClick={removeLastExperience}
              className="border border-blue-300 text-blue-500 px-3 py-2 rounded-md cursor-pointer"
            >
              - Remove
            </button>
          </div>
          <SaveAndNextButton />
        </div>
      </div>
    </>
  );
};

const FormEducation = () => {
  const {
    form,
    addMoreEducationButton,
    removeLastEducation,
    handleEducationStrings,
  } = useCreateResumeStore();

  return (
    <>
      <h1 className="font-bold text-xl">Education</h1>
      <p className="text-md">Add Your Education</p>
      <div className="w-full space-y-7 pt-5">
        {form.education.length > 0 &&
          form.education.map((education, index) => (
            <div key={index}>
              <div>
                <div className="w-full">
                  <label htmlFor="">Institude Name</label>
                  <input
                    value={education.universityname}
                    onChange={(e) => handleEducationStrings(e, index)}
                    name="universityname"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="w-full">
                    <label htmlFor="">Degree</label>
                    <input
                      value={education.degree}
                      onChange={(e) => handleEducationStrings(e, index)}
                      name="degree"
                      className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="w-full">
                    <label htmlFor="">Start Date</label>
                    <input
                      type="date"
                      value={education.startdate}
                      onChange={(e) => handleEducationStrings(e, index)}
                      name="startdate"
                      className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="">End Date</label>
                    <input
                      type="date"
                      value={education.enddate}
                      onChange={(e) => handleEducationStrings(e, index)}
                      name="enddate"
                      className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={addMoreEducationButton}
              className="border border-blue-300 text-blue-500 px-3 py-2 rounded-md cursor-pointer"
            >
              Add Education
            </button>
            <button
              onClick={removeLastEducation}
              className="border border-blue-300 text-blue-500 px-3 py-2 rounded-md cursor-pointer"
            >
              - Remove
            </button>
          </div>
          <SaveAndNextButton />
        </div>
      </div>
    </>
  );
};

const FormProjects = () => {
  const {
    form,
    addMoreProjectButton,
    removeLastProject,
    handleProjectStrings,
  } = useCreateResumeStore();

  return (
    <>
      <h1 className="font-bold text-xl">Projects</h1>
      <p className="text-md">Add Your Projects</p>
      <div className="w-full space-y-7 pt-5">
        {form.projects.length > 0 &&
          form.projects.map((project, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <div className="w-full">
                <label htmlFor="">Project Name</label>
                <input
                  value={project.projectname}
                  onChange={(e) => handleProjectStrings(e, index)}
                  name="projectname"
                  className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label htmlFor="">Start Date</label>
                  <input
                    type="date"
                    value={project.startdate}
                    onChange={(e) => handleProjectStrings(e, index)}
                    name="startdate"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">End Date</label>
                  <input
                    type="date"
                    value={project.enddate}
                    onChange={(e) => handleProjectStrings(e, index)}
                    name="enddate"
                    className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="">Description</label>
                <textarea
                rows={7}
                  value={project.description}
                  onChange={(e) => handleProjectStrings(e, index)}
                  name="description"
                   className="border p-2 w-full resize-none border-blue-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={addMoreProjectButton}
              className="border border-blue-300 text-blue-500 md:px-3 py-2 rounded-md cursor-pointer"
            >
              Add Project
            </button>
            <button
              onClick={removeLastProject}
              className="border border-blue-300 text-blue-500 px-3 py-2 rounded-md cursor-pointer"
            >
              - Remove
            </button>
          </div>
          <SaveAndNextButton />
        </div>
      </div>
    </>
  );
};

const FormSkills = () => {
  const { form, addMoreSkillsButton, removeLastSkill, handleSkillsStrings } =
    useCreateResumeStore();

  return (
    <>
      <h1 className="font-bold text-xl">Skills</h1>
      <p className="text-md">Add Your Skills</p>
      <div className="w-full space-y-7 pt-5">
        {form.skills.length > 0 &&
          form.skills.map((skill, index) => (
            <div className="flex gap-3" key={index}>
              <div className="w-full">
                <label htmlFor="">Skills</label>
                <input
                  value={skill.name}
                  onChange={(e) => handleSkillsStrings(e, index)}
                  name="projectname"
                  className="border p-2 w-full border-blue-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={addMoreSkillsButton}
              className="border border-blue-300 text-blue-500 px-3 py-2 rounded-md cursor-pointer"
            >
              Add More Skills
            </button>
            <button
              onClick={removeLastSkill}
              className="border border-blue-300 text-blue-500 px-3 py-2 rounded-md cursor-pointer"
            >
              - Remove
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <SaveAndNextButton />
        </div>
      </div>
    </>
  );
};

const SaveAndNextButton = () => {
  const { formMenu, form, nextFormMenu, formSubmitting } =
    useCreateResumeStore();

  return (
    <div className="flex flex-row-reverse gap-3">
      {formMenu <= 6 && (
        <button
          disabled={formMenu === 6}
          onClick={nextFormMenu}
          type="button"
          className={`bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer ${
            formMenu === 6 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Save and next
        </button>
      )}
    </div>
  );
};

export default CreateResumeForm;

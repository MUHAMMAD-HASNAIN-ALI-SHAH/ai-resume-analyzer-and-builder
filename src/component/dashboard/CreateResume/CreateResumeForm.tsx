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

export default CreateResumeForm;

/* ----------------------------------------------------------
   PERSONAL DETAILS
---------------------------------------------------------- */
const FormPersonalDetails = () => {
  const { handleFormStrings, form } = useCreateResumeStore();
  return (
    <>
      <h1 className="font-bold text-xl">Personal Details</h1>
      <p className="text-md">Get started with the basic information</p>

      <div className="w-full space-y-3 pt-5">
        <div>
          <label>Full Name</label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleFormStrings}
            className="border p-2 w-full border-blue-300 focus:outline-none"
          />
        </div>

        <div>
          <label>Job Title</label>
          <input
            name="jobtitle"
            value={form.jobtitle}
            onChange={handleFormStrings}
            className="border p-2 w-full border-blue-300 focus:outline-none"
          />
        </div>

        <div>
          <label>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleFormStrings}
            className="border p-2 w-full border-blue-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleFormStrings}
              className="border p-2 w-full border-blue-300 focus:outline-none"
            />
          </div>

          <div className="w-full">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleFormStrings}
              className="border p-2 w-full border-blue-300 focus:outline-none"
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

/* ----------------------------------------------------------
   SUMMARY
---------------------------------------------------------- */
const FormSummary = () => {
  const { handleFormStrings, form } = useCreateResumeStore();

  const onSummaryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    handleFormStrings(e);
  };

  return (
    <>
      <h1 className="font-bold text-xl">Summary</h1>
      <p className="text-md">Add summary for your job title</p>

      <div className="w-full space-y-3 pt-5">
        <div>
          <label>Add Summary</label>
          <textarea
            rows={10}
            name="summary"
            value={form.summary}
            onChange={onSummaryChange}
            className="border p-2 w-full resize-none border-blue-300 focus:outline-none"
          />
        </div>

        <div className="w-full flex justify-end">
          <SaveAndNextButton />
        </div>
      </div>
    </>
  );
};

/* ----------------------------------------------------------
   PROFESSIONAL EXPERIENCE
---------------------------------------------------------- */
const FormProfessionaExperience = () => {
  const {
    form,
    addMoreExperienceButton,
    removeLastExperience,
    handleExperienceStrings,
  } = useCreateResumeStore();

  return (
    <>
      <h1 className="font-bold text-xl">Professional Experience</h1>
      <p className="text-md">Add Your Professional Job Experience</p>

      <div className="w-full space-y-7 pt-5">
        {form.experience.map((experience, index) => (
          <div key={index}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full">
                <label>Position Title</label>
                <input
                  name="positiontitle"
                  value={experience.positiontitle}
                  onChange={(e) => handleExperienceStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>

              <div className="w-full">
                <label>Company Name</label>
                <input
                  name="companyname"
                  value={experience.companyname}
                  onChange={(e) => handleExperienceStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full">
                <label>City</label>
                <input
                  name="city"
                  value={experience.city}
                  onChange={(e) => handleExperienceStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>

              <div className="w-full">
                <label>Country</label>
                <input
                  name="country"
                  value={experience.country}
                  onChange={(e) => handleExperienceStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startdate"
                  value={experience.startdate}
                  onChange={(e) => handleExperienceStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>

              <div className="w-full">
                <label>End Date</label>
                <input
                  type="date"
                  name="enddate"
                  value={experience.enddate}
                  onChange={(e) => handleExperienceStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label>Summary</label>
              <textarea
                rows={7}
                name="summary"
                value={experience.summary}
                onChange={(e) => handleExperienceStrings(e, index)}
                className="border p-2 w-full resize-none border-blue-300 focus:outline-none"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              onClick={addMoreExperienceButton}
              className="border border-blue-300 text-blue-500 px-3 py-2"
            >
              Add Experience
            </button>

            <button
              onClick={removeLastExperience}
              className="border border-blue-300 text-blue-500 px-3 py-2"
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

/* ----------------------------------------------------------
   EDUCATION
---------------------------------------------------------- */
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
        {form.education.map((education, index) => (
          <div key={index}>
            <label>Institute Name</label>
            <input
              name="universityname"
              value={education.universityname}
              onChange={(e) => handleEducationStrings(e, index)}
              className="border p-2 w-full border-blue-300 focus:outline-none"
            />

            <label>Degree</label>
            <input
              name="degree"
              value={education.degree}
              onChange={(e) => handleEducationStrings(e, index)}
              className="border p-2 w-full border-blue-300 focus:outline-none"
            />

            <div className="flex gap-3">
              <div className="w-full">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startdate"
                  value={education.startdate}
                  onChange={(e) => handleEducationStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>

              <div className="w-full">
                <label>End Date</label>
                <input
                  type="date"
                  name="enddate"
                  value={education.enddate}
                  onChange={(e) => handleEducationStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>
            </div>

            <hr className="my-2" />
          </div>
        ))}

        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              onClick={addMoreEducationButton}
              className="border border-blue-300 text-blue-500 px-3 py-2"
            >
              Add Education
            </button>

            <button
              onClick={removeLastEducation}
              className="border border-blue-300 text-blue-500 px-3 py-2"
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

/* ----------------------------------------------------------
   PROJECTS
---------------------------------------------------------- */
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
        {form.projects.map((project, index) => (
          <div key={index} className="flex flex-col gap-3">
            <label>Project Name</label>
            <input
              name="projectname"
              value={project.projectname}
              onChange={(e) => handleProjectStrings(e, index)}
              className="border p-2 w-full border-blue-300 focus:outline-none"
            />

            <div className="flex gap-3">
              <div className="w-full">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startdate"
                  value={project.startdate}
                  onChange={(e) => handleProjectStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>

              <div className="w-full">
                <label>End Date</label>
                <input
                  type="date"
                  name="enddate"
                  value={project.enddate}
                  onChange={(e) => handleProjectStrings(e, index)}
                  className="border p-2 w-full border-blue-300 focus:outline-none"
                />
              </div>
            </div>

            <label>Description</label>
            <textarea
              rows={7}
              name="description"
              value={project.description}
              onChange={(e) => handleProjectStrings(e, index)}
              className="border p-2 w-full resize-none border-blue-300 focus:outline-none"
            />
          </div>
        ))}

        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              onClick={addMoreProjectButton}
              className="border border-blue-300 text-blue-500 px-3 py-2"
            >
              Add Project
            </button>

            <button
              onClick={removeLastProject}
              className="border border-blue-300 text-blue-500 px-3 py-2"
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

/* ----------------------------------------------------------
   SKILLS
---------------------------------------------------------- */
const FormSkills = () => {
  const { form, addMoreSkillsButton, removeLastSkill, handleSkillsStrings } =
    useCreateResumeStore();

  return (
    <>
      <h1 className="font-bold text-xl">Skills</h1>
      <p className="text-md">Add Your Skills</p>

      <div className="w-full space-y-7 pt-5">
        {form.skills.map((skill, index) => (
          <div key={index}>
            <label>Skill</label>
            <input
              name="name"
              value={skill.name}
              onChange={(e) => handleSkillsStrings(e, index)}
              className="border p-2 w-full border-blue-300 focus:outline-none"
            />
          </div>
        ))}

        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              onClick={addMoreSkillsButton}
              className="border border-blue-300 text-blue-500 px-3 py-2"
            >
              Add More Skills
            </button>

            <button
              onClick={removeLastSkill}
              className="border border-blue-300 text-blue-500 px-3 py-2"
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

/* ----------------------------------------------------------
   SAVE & NEXT BUTTON
---------------------------------------------------------- */
const SaveAndNextButton = () => {
  const { formMenu, nextFormMenu } = useCreateResumeStore();

  return (
    <button
      type="button"
      disabled={formMenu === 6}
      onClick={nextFormMenu}
      className={`bg-blue-600 text-white px-4 py-2 rounded-md ${
        formMenu === 6 ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Save and Next
    </button>
  );
};

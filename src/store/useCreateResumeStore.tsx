import { create } from "zustand";
import React from "react";

// =======================
//     TYPES
// =======================
export interface Experience {
  positiontitle: string;
  companyname: string;
  city: string;
  country: string;
  startdate: string;
  enddate: string;
  summary: string;
}

export interface Education {
  universityname: string;
  degree: string;
  startdate: string;
  enddate: string;
}

export interface Project {
  projectname: string;
  description: string;
  startdate: string;
  enddate: string;
}

export interface Skill {
  name: string;
}

export interface CreateResume {
  _id?: string;
  fullname: string;
  jobtitle: string;
  address: string;
  phone: string;
  email: string;
  summary: string;

  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface CreateResumeState {
  formMenu: number;
  form: CreateResume;

  formSubmitted: boolean;
  formSubmitting: boolean;
  submitLoader: boolean;

  prevFormMenu: () => void;
  nextFormMenu: () => void;

  handleFormStrings: (e: InputEvent) => void;

  addMoreExperienceButton: () => void;
  removeLastExperience: () => void;

  addMoreEducationButton: () => void;
  removeLastEducation: () => void;

  addMoreProjectButton: () => void;
  removeLastProject: () => void;

  addMoreSkillsButton: () => void;
  removeLastSkill: () => void;

  handleExperienceStrings: (e: InputEvent, index: number) => void;
  handleEducationStrings: (e: InputEvent, index: number) => void;
  handleProjectStrings: (e: InputEvent, index: number) => void;
  handleSkillsStrings: (e: InputEvent, index: number) => void;

  reset: () => void;
}

// =======================
//     STORE
// =======================
const useCreateResumeStore = create<CreateResumeState>((set) => ({
  formMenu: 1,

  form: {
    fullname: "",
    jobtitle: "",
    address: "",
    phone: "",
    email: "",
    summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
  },

  formSubmitted: false,
  formSubmitting: false,
  submitLoader: false,

  prevFormMenu: () =>
    set((state) => ({
      formMenu: state.formMenu > 1 ? state.formMenu - 1 : state.formMenu,
    })),

  nextFormMenu: () =>
    set((state) => ({
      formMenu: state.formMenu < 6 ? state.formMenu + 1 : state.formMenu,
    })),

  handleFormStrings: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      form: { ...state.form, [name]: value },
    }));
  },

  // EXPERIENCE
  addMoreExperienceButton: () =>
    set((state) => ({
      form: {
        ...state.form,
        experience: [
          ...state.form.experience,
          {
            positiontitle: "",
            companyname: "",
            city: "",
            country: "",
            startdate: "",
            enddate: "",
            summary: "",
          },
        ],
      },
    })),

  removeLastExperience: () =>
    set((state) => ({
      form: { ...state.form, experience: state.form.experience.slice(0, -1) },
    })),

  handleExperienceStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updated = [...state.form.experience];
      updated[index] = { ...updated[index], [name]: value };
      return { form: { ...state.form, experience: updated } };
    });
  },

  // EDUCATION
  addMoreEducationButton: () =>
    set((state) => ({
      form: {
        ...state.form,
        education: [
          ...state.form.education,
          { universityname: "", degree: "", startdate: "", enddate: "" },
        ],
      },
    })),

  removeLastEducation: () =>
    set((state) => ({
      form: { ...state.form, education: state.form.education.slice(0, -1) },
    })),

  handleEducationStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updated = [...state.form.education];
      updated[index] = { ...updated[index], [name]: value };
      return { form: { ...state.form, education: updated } };
    });
  },

  // PROJECTS
  addMoreProjectButton: () =>
    set((state) => ({
      form: {
        ...state.form,
        projects: [
          ...state.form.projects,
          { projectname: "", description: "", startdate: "", enddate: "" },
        ],
      },
    })),

  removeLastProject: () =>
    set((state) => ({
      form: { ...state.form, projects: state.form.projects.slice(0, -1) },
    })),

  handleProjectStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updated = [...state.form.projects];
      updated[index] = { ...updated[index], [name]: value };
      return { form: { ...state.form, projects: updated } };
    });
  },

  // SKILLS
  addMoreSkillsButton: () =>
    set((state) => ({
      form: {
        ...state.form,
        skills: [...state.form.skills, { name: "" }],
      },
    })),

  removeLastSkill: () =>
    set((state) => ({
      form: { ...state.form, skills: state.form.skills.slice(0, -1) },
    })),

  handleSkillsStrings: (e, index) => {
    const { value } = e.target;
    set((state) => {
      const updated = [...state.form.skills];
      updated[index] = { name: value };
      return { form: { ...state.form, skills: updated } };
    });
  },

  reset: () =>
    set({
      formMenu: 1,
      form: {
        fullname: "",
        jobtitle: "",
        address: "",
        phone: "",
        email: "",
        summary: "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
      },
      formSubmitted: false,
      formSubmitting: false,
    }),
}));

export default useCreateResumeStore;

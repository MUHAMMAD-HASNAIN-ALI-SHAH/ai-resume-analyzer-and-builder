import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export interface CreateResume {
  _id?: string;
  fullname: string;
  jobtitle: string;
  address: string;
  phone: string;
  email: string;
  summary: string;
  experience: {
    positiontitle: string;
    companyname: string;
    city: string;
    country: string;
    startdate: string;
    enddate: string;
    summary: string;
  }[];
  education: {
    universityname: string;
    degree: string;
    startdate: string;
    enddate: string;
  }[];
  projects: {
    projectname: string;
    description: string;
    startdate: string;
    enddate: string;
  }[];
  skills: {
    name: string;
  }[];
}

interface CreateResumeState {
  formMenu: number;
  form: CreateResume;
  formSubmitted: boolean;
  formSubmitting: boolean;
  prevFormMenu: () => void;
  nextFormMenu: () => void;
  deleteResumeById: (id: string) => Promise<void>;
  deleteResumeByIdLoader: boolean;
  getMyResumes: () => Promise<any>;
  getMyResumeById: (id: string) => Promise<CreateResume>;
  getMyResumeByIdLoader: boolean;
  getMyResumesLoader: boolean;
  submitLoader: boolean;
  handleFormStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreateResumeSubmit: () => void;
  addMoreExperienceButton: () => void;
  removeLastExperience: () => void;
  addMoreEducationButton: () => void;
  removeLastEducation: () => void;
  addMoreProjectButton: () => void;
  removeLastProject: () => void;
  addMoreSkillsButton: () => void;
  removeLastSkill: () => void;
  handleExperienceStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleEducationStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleProjectStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleSkillsStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleRichTextEditorText: (value: string, index: number) => void;
  reset: () => void;
}

const useCreateResumeStore = create<CreateResumeState>((set, get) => ({
  submitLoader: false,
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
  getMyResumeByIdLoader: false,
  getMyResumesLoader: false,
  deleteResumeByIdLoader: false,
  formSubmitting: false,
  formSubmitted: false,
  prevFormMenu: () => {
    set((state) => ({
      formMenu: state.formMenu > 1 ? state.formMenu - 1 : state.formMenu,
    }));
  },
  nextFormMenu: () => {
    set((state) => ({
      formMenu: state.formMenu < 6 ? state.formMenu + 1 : state.formMenu,
    }));
  },
  handleCreateResumeSubmit: async () => {
    try {
      set({ formSubmitting: true });
      if (get().submitLoader) {
        toast.error("Form is already submitting. Please wait.");
        return;
      }
      set({ submitLoader: true });
      await axios.post("/api/v2/create-resume", get().form);
      set({ formSubmitted: true });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the resume."
      );
    } finally {
      set({ submitLoader: false });
      set({ formSubmitting: false });
    }
  },
  getMyResumes: async () => {
    try {
      set({ getMyResumesLoader: true });
      const response = await axios.get("/api/v2/create-resume");
      set({ getMyResumesLoader: false });
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching resumes."
      );
      return [];
    } finally {
      set({ getMyResumesLoader: false });
    }
  },
  deleteResumeById: async (id: string) => {
    try {
      set({ deleteResumeByIdLoader: true });
      await axios.delete(`/api/v2/create-resume/${id}`);
      toast.success("Resume deleted successfully.");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the resume."
      );
    } finally {
      set({ deleteResumeByIdLoader: false });
    }
  },
  getMyResumeById: async (id: string) => {
    try {
      set({ getMyResumeByIdLoader: true });
      const response = await axios.get(`/api/v2/create-resume/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching the resume."
      );
      return null;
    } finally {
      set({ getMyResumeByIdLoader: false });
    }
  },
  handleFormStrings: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    }));
  },
  addMoreExperienceButton: () => {
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
    }));
  },
  removeLastExperience: () => {
    set((state) => {
      const updatedExperience = state.form.experience.slice(0, -1);
      return {
        form: {
          ...state.form,
          experience: updatedExperience,
        },
      };
    });
  },
  addMoreProjectButton: () => {
    set((state) => ({
      form: {
        ...state.form,
        projects: [
          ...state.form.projects,
          {
            projectname: "",
            description: "",
            startdate: "",
            enddate: "",
          },
        ],
      },
    }));
  },
  removeLastProject: () => {
    set((state) => {
      const updatedProjects = state.form.projects.slice(0, -1);
      return {
        form: {
          ...state.form,
          projects: updatedProjects,
        },
      };
    });
  },
  addMoreEducationButton: () => {
    set((state) => ({
      form: {
        ...state.form,
        education: [
          ...state.form.education,
          {
            universityname: "",
            degree: "",
            major: "",
            startdate: "",
            enddate: "",
            summary: "",
          },
        ],
      },
    }));
  },
  removeLastEducation: () => {
    set((state) => {
      const updatedEducation = state.form.education.slice(0, -1);
      return {
        form: {
          ...state.form,
          education: updatedEducation,
        },
      };
    });
  },
  addMoreSkillsButton: () => {
    set((state) => ({
      form: {
        ...state.form,
        skills: [
          ...state.form.skills,
          {
            name: "",
          },
        ],
      },
    }));
  },
  removeLastSkill: () => {
    set((state) => {
      const updatedSkills = state.form.skills.slice(0, -1);
      return {
        form: {
          ...state.form,
          skills: updatedSkills,
        },
      };
    });
  },
  handleExperienceStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updatedExperience = [...state.form.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: value,
      };
      return {
        form: {
          ...state.form,
          experience: updatedExperience,
        },
      };
    });
  },
  handleEducationStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updatedEducation = [...state.form.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };
      return {
        form: {
          ...state.form,
          education: updatedEducation,
        },
      };
    });
  },
  handleProjectStrings: (e, index) => {
    const { name, value } = e.target;
    set((state) => {
      const updatedProjects = [...state.form.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value,
      };
      return {
        form: {
          ...state.form,
          projects: updatedProjects,
        },
      };
    });
  },
  handleSkillsStrings: (e, index) => {
    const { value } = e.target;
    set((state) => {
      const updatedSkills = [...state.form.skills];
      updatedSkills[index] = {
        name: value,
      };
      return {
        form: {
          ...state.form,
          skills: updatedSkills,
        },
      };
    });
  },
  handleRichTextEditorText: (value, index) => {
    set((state) => {
      const updatedExperience = [...state.form.experience];
      updatedExperience[index].summary = value;
      return {
        form: {
          ...state.form,
          experience: updatedExperience,
        },
      };
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

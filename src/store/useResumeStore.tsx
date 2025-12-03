import { create } from "zustand";

interface ResumeState {
  name: string;
  email: string;
  summary: string;
  experience: string[];
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setSummary: (summary: string) => void;
  setExperience: (experience: string[]) => void;
}

const useResumeStore = create<ResumeState>((set) => ({
  name: "",
  email: "",
  summary: "",
  experience: [],
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setSummary: (summary) => set({ summary }),
  setExperience: (experience) => set({ experience }),
}));

export default useResumeStore;

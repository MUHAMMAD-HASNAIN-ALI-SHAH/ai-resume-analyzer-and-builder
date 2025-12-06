import { create } from "zustand";
import pdfToText from "react-pdftotext";
import { toast } from "react-toastify";
import ai from "@/lib/gemini";

interface ResumeAnalyserState {
  form: {
    companyName: string;
    positiontitle: string;
    companyDescription: string;
    file: File | null;
    extractedText: string;
  };
  submitForAnalysis: boolean;
  submitting: boolean;
  handleFormStrings: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  atsString: {
    atsScore: number;
    atsPoints: { point: string; description: string }[];
    atsKeywords: string[];
    atsMissingKeywords: { missingKeyword: string; reason: string }[];
  };
  getResumeATSScore: () => Promise<void>;
  reset: () => void;
}

const useResumeAnalyserStore = create<ResumeAnalyserState>((set, get) => ({
  form: {
    companyName: "",
    positiontitle: "",
    companyDescription: "",
    file: null,
    extractedText: "",
  },

  submitForAnalysis: false,
  submitting: false,

  atsString: {
    atsScore: 0,
    atsPoints: [],
    atsKeywords: [],
    atsMissingKeywords: [],
  },

  handleFormStrings: (e) => {
    const { name, type, files, value } = e.target as HTMLInputElement;

    if (type === "file" && files?.[0]) {
      const file = files[0];

      set((state) => ({
        form: { ...state.form, [name]: file },
      }));

      pdfToText(file)
        .then((text) => {
          set((state) => ({
            form: { ...state.form, extractedText: text },
          }));
        })
        .catch(() => {
          set((state) => ({
            form: { ...state.form, extractedText: "" },
          }));
        });
    } else {
      set((state) => ({
        form: { ...state.form, [name]: value },
      }));
    }
  },

  getResumeATSScore: async () => {
    console.log("Starting ATS score retrieval...");
    const { form } = get();

    if (!form.file) {
      toast.error("Please upload a resume file.");
      return;
    }

    if (!form.extractedText) {
      toast.error("No text extracted from the resume file.");
      return;
    }

    try {
      set({ submitting: true, submitForAnalysis: true });

      // 1️⃣ Extract Resume Keywords
      const aiExKeyWordFromResume = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
          You are a strict keyword extraction engine.
          Extract keywords from the resume text.
          Return ONLY JSON array like:
          ["keyword1", "keyword2"]

          Resume text:
          ${form.extractedText}
        `,
      });

      // 2️⃣ Extract Job Description Keywords
      const aiExKeyWordFromDescription = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
          Extract keywords from:
          - Company Name
          - Position Title
          - Company Description
          Return ONLY JSON array.

          Input:
          ${form.companyName}
          ${form.positiontitle}
          ${form.companyDescription}
        `,
      });

      const resumeKeywords = JSON.parse(
        (aiExKeyWordFromResume.text ?? "[]")
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()
      );

      const descriptionKeywords = JSON.parse(
        (aiExKeyWordFromDescription.text ?? "[]")
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()
      );

      // 3️⃣ Compare Keywords + Generate ATS Result
      const aiATSResult = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
          You are an ATS analyzer.
          Compare:

          Resume Keywords: ${JSON.stringify(resumeKeywords)}
          Job Keywords: ${JSON.stringify(descriptionKeywords)}

          Return JSON:
          {
            "atsScore": number,
            "atsPoints": [{ "point": "", "description": "" }],
            "atsMissingKeywords": [{ "missingKeyword": "", "reason": "" }]
          }
        `,
      });

      const atsResult = JSON.parse(
        (aiATSResult.text ?? "{}")
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()
      );

      set({
        atsString: {
          atsScore: atsResult.atsScore,
          atsPoints: atsResult.atsPoints,
          atsKeywords: resumeKeywords,
          atsMissingKeywords: atsResult.atsMissingKeywords,
        },
      });

      set({ submitForAnalysis: true, submitting: false });
    } catch (error) {
      console.error("Error fetching ATS score:", error);
      toast.error("Failed to get ATS score");
    }
  },

  reset: () =>
    set({
      form: {
        companyName: "",
        positiontitle: "",
        companyDescription: "",
        file: null,
        extractedText: "",
      },
      submitForAnalysis: false,
      atsString: {
        atsScore: 0,
        atsPoints: [],
        atsKeywords: [],
        atsMissingKeywords: [],
      },
    }),
}));

export default useResumeAnalyserStore;

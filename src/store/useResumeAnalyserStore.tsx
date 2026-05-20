import { create } from "zustand";
import pdfToText from "react-pdftotext";
import { toast } from "react-toastify";
import ai from "@/lib/gemini";

/* ---------- Keyword Extraction Utils (NO AI) ---------- */

const STOP_WORDS = new Set([
  "and", "or", "the", "a", "an", "to", "of", "in", "for", "with",
  "on", "at", "by", "from", "as", "is", "are", "was", "were",
  "this", "that", "it", "be", "has", "have", "had"
]);

const extractKeywords = (text: string): string[] => {
  if (!text) return [];

  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(
          (word) =>
            word.length > 2 &&
            !STOP_WORDS.has(word) &&
            isNaN(Number(word))
        )
    )
  );
};

/* ---------- Store Types ---------- */

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

/* ---------- Zustand Store ---------- */

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

      /* ---------- Local Keyword Extraction ---------- */

      const resumeKeywords = extractKeywords(form.extractedText);

      const jdCombinedText = `
        ${form.companyName}
        ${form.positiontitle}
        ${form.companyDescription}
      `;

      const descriptionKeywords = extractKeywords(jdCombinedText);

      /* ---------- SINGLE Gemini Call (ATS Reasoning) ---------- */

      const aiATSResult: any = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
          You are an ATS resume analyzer.

          Compare the following keyword sets semantically (not just exact matches).

          Position for applying: ${form.positiontitle}
          Company Name: ${form.companyName}

          Resume Keywords:
          ${JSON.stringify(resumeKeywords)}

          Job Description Keywords:
          ${JSON.stringify(descriptionKeywords)}

          Rules:
          - Consider synonyms and related skills.
          - Penalize missing critical job-related skills.
          - If job description keywords are few or empty, focus mainly on resume strength.

          Respond ONLY in this JSON format:
          {
            "atsScore": number,
            "atsPoints": [
              {
                "point": "point title about negative aspect",
                "description": "detailed explanation"
              }
            ],
            "atsMissingKeywords": [
              {
                "missingKeyword": "keyword",
                "reason": "why it's important"
              }
            ],
          }
        `,
      });

      const atsResult = JSON.parse(
        aiATSResult.text
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
        submitting: false,
      });
    } catch (error) {
      console.error("Error fetching ATS score:", error);
      toast.error("Failed to get ATS score");
      set({ submitting: false });
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
      submitting: false,
      atsString: {
        atsScore: 0,
        atsPoints: [],
        atsKeywords: [],
        atsMissingKeywords: [],
      },
    }),
}));

export default useResumeAnalyserStore;

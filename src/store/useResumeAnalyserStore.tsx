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

      // 1️⃣ Get Score & Keywords
      let aiExKeyWordFromResume: any = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
          You are a strict keyword extraction engine.
          
          Task:
          1. Extract keywords from the resume text.
          2. Return ONLY a JSON array of keywords like this:
            ["firstkeyword", "secondkeyword", ...]
          3. If the resume text is empty or contains no extractable keywords, return an empty array: []

          Important: Do NOT include any explanations, text, or formatting outside of the JSON array.

          Resume text:
          ${form.extractedText}
        `,
      });

      let aiExKeyWordFromDescription: any = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
          You are a strict keyword extraction engine.

          Task:
          1. Extract keywords only from the job description and related fields.
          2. Return ONLY a JSON array of keywords like this:
            ["firstkeyword", "secondkeyword", ...]
          3. If there are no extractable keywords or the input is empty, return an empty array: []

          Important:
          - Do NOT include any explanations, text, or formatting outside the JSON array.
          - Do NOT return any null, undefined, or other string values.

          Input:
          Company Name: ${form.companyName}
          Position Title: ${form.positiontitle}
          Company Description: ${form.companyDescription}
        `,
      });

      let resumeKeywords = JSON.parse(
        aiExKeyWordFromResume.text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()
      );

      let descriptionKeywords = JSON.parse(
        aiExKeyWordFromDescription.text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim()
      );

      // comparing the keywords using semantic similarity manually
      let aiATSResult: any = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
          You are an ATS resume analyzer.
          Compare the following two sets of keywords:

          Resume Keywords: ${JSON.stringify(resumeKeywords)}
          Job Description Keywords: ${JSON.stringify(descriptionKeywords)}
          If theres no or very less Keywords on Job Description just ony Analyse the Resume Keywords.
          Provide an ATS score out of 100 based on the keyword match and relevance.
          Also provide detailed points explaining the score and any missing keywords from the job description that are not in the resume.
          Respond in this JSON format:
          {
            "atsScore": number,
            "atsPoints": [
              {
                "point": "point title",
                "description": "detailed description"
              }
            ],
            "atsMissingKeywords": [
              {
                "missingKeyword": "keyword",
                "reason": "why it's important"
              }
            ]
          }
        `,
      });

      let atsResult = JSON.parse(
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

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";

// ==========================
//      TYPES
// ==========================

interface ExperienceItem {
  positiontitle: string;
  companyname: string;
  city?: string;
  country?: string;
  startdate: string;
  enddate?: string;
  summary?: string;
}

interface EducationItem {
  universityname: string;
  degree: string;
  startdate: string;
  enddate: string;
}

interface ProjectItem {
  projectname: string;
  startdate: string;
  enddate: string;
  description?: string;
}

interface SkillItem {
  name: string;
}

export interface ResumeData {
  fullname: string;
  jobtitle: string;
  address: string;
  phone: string;
  email: string;
  summary?: string;
  experience?: ExperienceItem[];
  education?: EducationItem[];
  projects?: ProjectItem[];
  skills?: SkillItem[];
}

// ==========================
//    HTML GENERATOR
// ==========================

function generateResumeHTML(data: ResumeData) {
  const cleanSummary = data.summary?.replace(/<[^>]*>/g, "").trim();

  return `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: sans-serif; background-color:white; color:black; padding:1rem; }
        h1 { font-size:18px; font-weight:600; text-align:center; margin-bottom:0.25rem; }
        h2 { font-size:16px; font-weight:600; text-align:center; color:#10B981; text-transform:uppercase; margin:1.5rem 0 0.25rem 0; }
        h3 { font-size:14px; font-weight:600; color:#047857; margin-bottom:0.25rem; }
        p { font-size:14px; margin-bottom:0.25rem; }
        .section { margin-top:1rem; }
        .experience-item h3 { color:#10B981; font-weight:700; }
        .experience-item div, .education-item div, .project-item div { font-size:12px; color:#6B7280; display:flex; justify-content:space-between; }
        ul.skills { display:grid; grid-template-columns:repeat(2,1fr); padding-left:1rem; gap:0.25rem; margin-top:0.5rem; list-style-type:disc; }
        li { color:#374151; font-size:14px; }
        hr { border:1px solid #10B981; margin:0.25rem 0; }
      </style>
    </head>
    <body>
      <div style="width:100%; max-width:800px; margin:0 auto;">

        <h1 style="text-align:center; font-weight:600; font-size:24px; color:black; margin-bottom:0.25rem;">
          ${data.fullname}
        </h1>

        <p style="text-align:center; font-weight:700; font-size:20px; color:#10B981; margin-bottom:0.25rem;">
          ${data.jobtitle}
        </p>

        <p style="text-align:center; font-weight:500; font-size:16px; color:black; margin-bottom:0.5rem;">
          ${data.address}
        </p>

        <div style="display:flex; justify-content:space-between; font-size:12px; color:black; margin-top:0.5rem; margin-bottom:0.5rem;">
          <p>${data.phone}</p>
          <p>${data.email}</p>
        </div>

        ${cleanSummary ? `
          <div class="section">
            <h2>Summary</h2>
            <hr/>
            <div>${data.summary}</div>
          </div>` : ""}

        ${data.experience?.length ? `
          <div style="margin-bottom: 1.5rem;">
            <h2>Professional Experience</h2>
            <hr/>
            ${data.experience
              .map(
                (exp: ExperienceItem) => `
            <div style="margin-bottom: 1rem;">
              <h3>${exp.positiontitle}</h3>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 0.25rem;">
                <p>${exp.companyname}${exp.city ? "," : ""} ${exp.city ?? ""}${exp.country ? "," : ""} ${exp.country ?? ""}</p>
                <p>${exp.startdate} ${exp.enddate ? "-" : ""} ${exp.enddate ?? ""}</p>
              </div>
              <div>${exp.summary ?? ""}</div>
            </div>`
              )
              .join("")}
          </div>
        ` : ""}

        ${data.education?.length ? `
          <div style="margin-bottom: 1.5rem;">
            <h2>Education</h2>
            <hr/>
            ${data.education
              .map(
                (edu: EducationItem) => `
            <div style="margin-bottom: 1rem;">
              <h3>${edu.universityname}</h3>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 0.25rem;">
                <p>${edu.degree}</p>
                <p>${edu.startdate} — ${edu.enddate}</p>
              </div>
            </div>`
              )
              .join("")}
          </div>
        ` : ""}

        ${data.projects?.length ? `
          <div style="margin-bottom: 1.5rem;">
            <h2>Projects</h2>
            <hr/>
            ${data.projects
              .map(
                (pro: ProjectItem) => `
            <div style="margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #6B7280; margin-bottom: 0.25rem;">
                <h3 style="color:#10B981;">${pro.projectname}</h3>
                <p style="color:black;">${pro.startdate} — ${pro.enddate}</p>
              </div>
              ${pro.description ? `<p style="margin-top: 0.5rem; color: black; line-height: 1.5;">${pro.description}</p>` : ""}
            </div>`
              )
              .join("")}
          </div>
        ` : ""}

        ${data.skills?.length ? `
          <div class="section">
            <h2>Skills</h2>
            <hr/>
            <ul class="skills">
              ${data.skills.map((s: SkillItem) => `<li>${s.name}</li>`).join("")}
            </ul>
          </div>
        ` : ""}

      </div>
    </body>
  </html>
  `;
}

// ==========================
//          API
// ==========================

export async function POST(req: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json(
        { msg: "You are not authenticated" },
        { status: 401 }
      );
    }

    const data: ResumeData = await req.json();

    const html = generateResumeHTML(data);

    // Launch Chromium (Vercel-compatible)
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

   return new Response(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume.pdf"`,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;

    console.error("PDF Generation Error:", err);

    return NextResponse.json(
      {
        message: "Error generating PDF",
        error: err.message,
      },
      { status: 500 }
    );
  }
}


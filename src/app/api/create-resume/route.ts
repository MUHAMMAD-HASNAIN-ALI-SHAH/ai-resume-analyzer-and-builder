import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

function generateResumeHTML(data: any) {
  return `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { font-size: 24px; margin: 0; }
        h2 { color: green; margin-top: 20px; }
        hr { border: 1px solid green; }
        .section { margin-top: 20px; }
        .item { margin-bottom: 10px; }
      </style>
    </head>
    <body>

      <h1>${data.fullname}</h1>
      <h3 style="color:green;">${data.jobtitle}</h3>
      <p>${data.address}</p>
      <p>${data.phone} | ${data.email}</p>

      ${
        data.summary
          ? `
      <div class="section">
        <hr/>
        <div>${data.summary}</div>
      </div>`
          : ""
      }

      ${
        data.experience?.length
          ? `
      <div class="section">
        <h2>Professional Experience</h2>
        <hr/>
        ${data.experience
          .map(
            (exp: any) => `
          <div class="item">
            <h3>${exp.positiontitle}</h3>
            <p>${exp.companyname}, ${exp.city}, ${exp.state}</p>
            <p>${exp.startdate} - ${exp.enddate}</p>
            <div>${exp.summary}</div>
          </div>
        `
          )
          .join("")}
      </div>`
          : ""
      }

      ${
        data.education?.length
          ? `
      <div class="section">
        <h2>Education</h2>
        <hr/>
        ${data.education
          .map(
            (edu: any) => `
          <div class="item">
            <h3>${edu.universityname} — ${edu.degree}</h3>
            <p>${edu.startdate} - ${edu.enddate}</p>
          </div>
        `
          )
          .join("")}
      </div>`
          : ""
      }

      ${
        data.projects?.length
          ? `
      <div class="section">
        <h2>Projects</h2>
        <hr/>
        ${data.projects
          .map(
            (pro: any) => `
          <div class="item">
            <h3>${pro.projectname}</h3>
            <p>${pro.startdate} - ${pro.enddate}</p>
            <p>${pro.description}</p>
          </div>
        `
          )
          .join("")}
      </div>`
          : ""
      }

      ${
        data.skills?.length
          ? `
      <div class="section">
        <h2>Skills</h2>
        <hr/>
        <ul>
          ${data.skills.map((s: any) => `<li>${s.name}</li>`).join("")}
        </ul>
      </div>`
          : ""
      }

    </body>
  </html>
  `;
}

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

    // Get resume data from frontend
    const data = await req.json();

    // Convert resume data into HTML
    const html = generateResumeHTML(data);

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    console.log("PDF generated successfully.", pdfBuffer);

    await browser.close();

    // Return PDF file
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume.pdf"`,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error generating PDF",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

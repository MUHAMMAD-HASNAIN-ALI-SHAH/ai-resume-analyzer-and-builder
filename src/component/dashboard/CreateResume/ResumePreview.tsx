import { useRef, useState } from "react";
import useCreateResumeStore from "../../../store/useCreateResumeStore";

const ResumePreview = () => {
  const { form } = useCreateResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [loader, setLoader] = useState(false);

  const onSubmit = async () => {
    if (loader) return;

    setLoader(true);
    try {
      const res = await fetch("/api/create-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("Failed to generate PDF");
        alert("Failed to generate PDF");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div
      style={{
        color: "black",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <button
        type="button"
        onClick={onSubmit}
        disabled={loader}
        style={{
          backgroundColor: loader ? "#6EE7B7" : "#10B981",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          cursor: loader ? "not-allowed" : "pointer",
          border: "none",
          opacity: loader ? 0.7 : 1,
        }}
      >
        {loader ? "Generating PDF..." : "Download Resume"}
      </button>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          border: "1px solid #D1D5DB",
          width: "90%",
          height: "90%",
          padding: "1.5rem",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            minHeight: "40vh",
          }}
        >
          <div
            ref={resumeRef}
            style={{
              backgroundColor: "white",
              padding: "1rem 1.5rem",
              fontFamily: "sans-serif",
              width: "100%",
              maxWidth: "800px",
              margin: "0 auto",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            {/* Name */}
            <h1
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "0.25rem",
              }}
            >
              {form.fullname}
            </h1>
            <p
              style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: "20px",
                color: "#10B981",
                marginBottom: "0.25rem",
              }}
            >
              {form.jobtitle}
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: "16px",
                color: "black",
                fontWeight: 500,
                marginBottom: "0.5rem",
              }}
            >
              {form.address}
            </p>

            {/* Contact */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                fontSize: "12px",
                color: "black",
              }}
            >
              <p>{form.phone}</p>
              <p>{form.email}</p>
            </div>

            {/* Summary */}
            {form.summary &&
              form.summary.replace(/<[^>]*>/g, "").trim() !== "" && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      textAlign: "center",
                      color: "#10B981",
                      textTransform: "uppercase",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Summary
                  </h2>
                  <hr
                    style={{
                      border: "1px solid #10B981",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p>{form.summary}</p>
                </div>
              )}

            {/* Experience */}
            {form.experience?.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    textAlign: "center",
                    color: "#10B981",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                  }}
                >
                  Professional Experience
                </h2>
                <hr
                  style={{
                    border: "1px solid #10B981",
                    marginBottom: "0.5rem",
                  }}
                />
                {form.experience.map((exp, index) => (
                  <div key={index} style={{ marginBottom: "1rem" }}>
                    <h3
                      style={{
                        fontWeight: 700,
                        color: "#10B981",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {exp.positiontitle}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <p>
                        {exp.companyname}
                        {exp.city ? "," : ""} {exp.city}
                        {exp.country ? "," : ""} {exp.country}
                      </p>
                      <p>
                        {exp.startdate} {exp.enddate ? "-" : ""} {exp.enddate}
                      </p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: exp.summary }} />
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {form.education?.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    textAlign: "center",
                    color: "#10B981",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                  }}
                >
                  Education
                </h2>
                <hr
                  style={{
                    border: "1px solid #10B981",
                    marginBottom: "0.5rem",
                  }}
                />
                {form.education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: "1rem" }}>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#10B981",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {edu.universityname}{" "}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <p>{edu.degree}</p>
                      <p>
                        {edu.startdate} — {edu.enddate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {form.projects?.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    textAlign: "center",
                    color: "#10B981",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                  }}
                >
                  Projects
                </h2>
                <hr
                  style={{
                    border: "1px solid #10B981",
                    marginBottom: "0.5rem",
                  }}
                />
                {form.projects.map((pro, index) => (
                  <div key={index} style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "12px",
                        color: "#6B7280",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#10B981",
                        }}
                      >
                        {pro.projectname}
                      </h3>
                      <p
                        style={{
                          color: "black",
                        }}
                      >
                        {pro.startdate} — {pro.enddate}
                      </p>
                    </div>
                    {pro.description && (
                      <p
                        style={{
                          marginTop: "0.5rem",
                          color: "black",
                          lineHeight: 1.5,
                        }}
                      >
                        {pro.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {form.skills?.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    textAlign: "center",
                    color: "#10B981",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                  }}
                >
                  Skills
                </h2>
                <hr
                  style={{
                    border: "1px solid #10B981",
                    marginBottom: "0.5rem",
                  }}
                />
                <ul
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    paddingLeft: "1rem",
                    gap: "0.5rem",
                    listStyleType: "disc",
                    marginTop: "0.5rem",
                  }}
                >
                  {form.skills.map((skill, index) => (
                    <li key={index} style={{ color: "#374151" }}>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

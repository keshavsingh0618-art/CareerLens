
import { useNavigate } from "react-router-dom";

function CareerSelection() {
  const navigate = useNavigate();

  const careers = [
    {
      name: "Frontend Developer",
      description: "Build websites and modern user interfaces.",
      skills: "HTML, CSS, JavaScript, React",
    },
    {
      name: "Backend Developer",
      description: "Build APIs, databases and server-side applications.",
      skills: "JavaScript, Node.js, MongoDB, APIs",
    },
    {
      name: "Data Analyst",
      description: "Analyze data and generate useful insights.",
      skills: "Excel, SQL, Python, Power BI",
    },
    {
      name: "Full Stack Developer",
      description: "Work with both frontend and backend technologies.",
      skills: "React, Node.js, MongoDB, APIs",
    },
    {
      name: "Cybersecurity Analyst",
      description: "Protect systems, networks and data from cyber threats.",
      skills: "Networking, Linux, Ethical Hacking, SIEM",
    },
    {
      name: "UI/UX Designer",
      description: "Design user-friendly and visually engaging digital experiences.",
      skills: "Figma, Wireframing, Prototyping, User Research",
    },
  ];

  const handleCareerSelect = (careerName) => {
    localStorage.setItem("selectedCareer", careerName);
    navigate("/skills");
  };

  return (
    <div className="career-page">
      <div className="career-header">
        <h1>Choose Your Career Path</h1>
        <p>Select the role you want CareerLens to analyze.</p>
      </div>

      <div className="career-grid">
        {careers.map((career) => (
          <div className="career-card" key={career.name}>
            <h2>{career.name}</h2>

            <p>{career.description}</p>

            <h4>Key Skills</h4>

            <p>{career.skills}</p>

            <button
              className="primary-btn"
              onClick={() => handleCareerSelect(career.name)}
            >
              Select Career
            </button>
          </div>
        ))}
      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default CareerSelection;


import { useNavigate } from "react-router-dom";

function Roadmap() {
  const navigate = useNavigate();

  const selectedCareer =
    localStorage.getItem("selectedCareer") || "Not Selected";

  const missingSkills =
    JSON.parse(localStorage.getItem("missingSkills")) || [];

  const roadmapData = {
    "Frontend Developer": {
      HTML: {
        title: "Strengthen HTML",
        description: "Learn semantic HTML, forms, tables and accessibility basics.",
        duration: "3-4 Days",
      },
      CSS: {
        title: "Master CSS",
        description: "Practice Flexbox, Grid, animations and responsive layouts.",
        duration: "5-7 Days",
      },
      JavaScript: {
        title: "Improve JavaScript",
        description: "Focus on functions, arrays, objects, DOM and asynchronous JavaScript.",
        duration: "1-2 Weeks",
      },
      React: {
        title: "Learn React",
        description: "Understand components, props, state, hooks and routing.",
        duration: "1-2 Weeks",
      },
      Git: {
        title: "Learn Git & GitHub",
        description: "Practice commits, branches, repositories and collaboration.",
        duration: "2-3 Days",
      },
      "Responsive Design": {
        title: "Learn Responsive Design",
        description: "Build websites that work properly on mobile, tablet and desktop.",
        duration: "3-4 Days",
      },
    },

    "Backend Developer": {
      JavaScript: {
        title: "Strengthen JavaScript",
        description: "Master functions, objects, promises, async/await and ES6 concepts.",
        duration: "1 Week",
      },
      "Node.js": {
        title: "Learn Node.js",
        description: "Understand modules, npm, server-side JavaScript and file handling.",
        duration: "1 Week",
      },
      "Express.js": {
        title: "Learn Express.js",
        description: "Build routes, middleware and server-side applications using Express.",
        duration: "5-7 Days",
      },
      MongoDB: {
        title: "Learn MongoDB",
        description: "Practice collections, documents, CRUD operations and Mongoose.",
        duration: "5-7 Days",
      },
      "REST APIs": {
        title: "Build REST APIs",
        description: "Learn HTTP methods, status codes, JSON and API development.",
        duration: "1 Week",
      },
      Git: {
        title: "Learn Git & GitHub",
        description: "Practice version control, commits, branches and repositories.",
        duration: "2-3 Days",
      },
      Authentication: {
        title: "Learn Authentication",
        description: "Understand password hashing, JWT tokens and protected routes.",
        duration: "4-5 Days",
      },
    },

    "Data Analyst": {
      Excel: {
        title: "Improve Excel",
        description: "Practice formulas, pivot tables, lookup functions and data cleaning.",
        duration: "1 Week",
      },
      SQL: {
        title: "Learn SQL",
        description: "Practice queries, joins, filtering, grouping and database analysis.",
        duration: "1-2 Weeks",
      },
      Python: {
        title: "Learn Python for Data",
        description: "Learn Python basics along with Pandas and NumPy.",
        duration: "2 Weeks",
      },
      "Power BI": {
        title: "Learn Power BI",
        description: "Create dashboards, charts and interactive business reports.",
        duration: "1-2 Weeks",
      },
      Statistics: {
        title: "Learn Statistics",
        description: "Understand averages, probability, correlation and distributions.",
        duration: "1 Week",
      },
      "Data Visualization": {
        title: "Practice Data Visualization",
        description: "Learn how to represent data clearly using charts and dashboards.",
        duration: "5-7 Days",
      },
    },

    "Full Stack Developer": {
      "HTML & CSS": {
        title: "Strengthen HTML & CSS",
        description: "Build responsive and accessible web interfaces.",
        duration: "1 Week",
      },
      JavaScript: {
        title: "Master JavaScript",
        description: "Strengthen ES6, DOM, async programming and application logic.",
        duration: "1-2 Weeks",
      },
      React: {
        title: "Learn React",
        description: "Learn components, hooks, state management and routing.",
        duration: "1-2 Weeks",
      },
      "Node.js": {
        title: "Learn Node.js",
        description: "Develop backend applications using server-side JavaScript.",
        duration: "1 Week",
      },
      MongoDB: {
        title: "Learn MongoDB",
        description: "Learn database design, CRUD operations and Mongoose.",
        duration: "1 Week",
      },
      "REST APIs": {
        title: "Build REST APIs",
        description: "Connect frontend and backend using structured REST APIs.",
        duration: "1 Week",
      },
      Git: {
        title: "Learn Git & GitHub",
        description: "Manage code versions and collaborate using GitHub.",
        duration: "2-3 Days",
      },
    },

    "Cybersecurity Analyst": {
      Networking: {
        title: "Master Computer Networking",
        description: "Learn TCP/IP, DNS, HTTP, ports, firewalls and network protocols.",
        duration: "1-2 Weeks",
      },
      Linux: {
        title: "Learn Linux Fundamentals",
        description: "Practice Linux commands, file permissions, processes and shell basics.",
        duration: "1 Week",
      },
      "Cybersecurity Fundamentals": {
        title: "Understand Cybersecurity Fundamentals",
        description: "Study confidentiality, integrity, availability, common threats and security principles.",
        duration: "1 Week",
      },
      "Ethical Hacking": {
        title: "Explore Ethical Hacking",
        description: "Understand penetration testing methodologies and practice safely in authorized labs.",
        duration: "1-2 Weeks",
      },
      "SIEM Tools": {
        title: "Practice SIEM Tools",
        description: "Learn how security information and event management tools collect and analyze security logs.",
        duration: "1 Week",
      },
      Cryptography: {
        title: "Learn Cryptography",
        description: "Understand encryption, hashing, digital signatures and secure communication.",
        duration: "5-7 Days",
      },
      "Incident Response": {
        title: "Study Incident Response",
        description: "Learn how to identify, contain, investigate and recover from security incidents.",
        duration: "1 Week",
      },
    },

    "UI/UX Designer": {
      Figma: {
        title: "Master Figma",
        description: "Learn Figma tools, components, auto layout and collaborative design.",
        duration: "1 Week",
      },
      Wireframing: {
        title: "Practice Wireframing",
        description: "Create low-fidelity layouts and organize page structures before visual design.",
        duration: "4-5 Days",
      },
      Prototyping: {
        title: "Learn Prototyping",
        description: "Build interactive prototypes and connect screens to demonstrate user journeys.",
        duration: "5-7 Days",
      },
      "User Research": {
        title: "Understand User Research",
        description: "Learn user interviews, surveys, personas and research-based design decisions.",
        duration: "1 Week",
      },
      "UI Design Principles": {
        title: "Improve UI Design Principles",
        description: "Study typography, color theory, spacing, hierarchy and visual consistency.",
        duration: "1 Week",
      },
      "UX Principles": {
        title: "Understand UX Principles",
        description: "Learn information architecture, navigation, accessibility and user-centered design.",
        duration: "1 Week",
      },
      "Usability Testing": {
        title: "Practice Usability Testing",
        description: "Test designs with users, identify usability issues and improve the experience.",
        duration: "5-7 Days",
      },
    },
  };

  const careerRoadmap = roadmapData[selectedCareer] || {};

  const personalizedSteps = missingSkills
    .map((skill) => ({
      skill,
      ...careerRoadmap[skill],
    }))
    .filter((step) => step.title);

  return (
    <div className="roadmap-page">
      <div className="roadmap-container">
        <div className="roadmap-header">
          <p className="roadmap-label">
            PERSONALIZED LEARNING PLAN
          </p>

          <h1>Your Career Roadmap</h1>

          <p>
            Target Career: <strong>{selectedCareer}</strong>
          </p>

          <p className="roadmap-description">
            CareerLens created this roadmap based on the
            skills you still need to improve.
          </p>
        </div>

        {personalizedSteps.length > 0 ? (
          <div className="roadmap-timeline">
            {personalizedSteps.map((step, index) => (
              <div className="roadmap-step" key={step.skill}>
                <div className="step-number">
                  {index + 1}
                </div>

                <div className="step-content">
                  <div className="step-top">
                    <h2>{step.title}</h2>

                    <span className="duration-badge">
                      ⏱ {step.duration}
                    </span>
                  </div>

                  <p>{step.description}</p>

                  <div className="skill-tag">
                    {step.skill}
                  </div>
                </div>
              </div>
            ))}

            <div className="roadmap-step final-step">
              <div className="step-number">★</div>

              <div className="step-content">
                <div className="step-top">
                  <h2>Build a Real Project</h2>
                </div>

                <p>
                  Apply your improved skills by building a
                  practical project related to your target career.
                </p>

                <div className="skill-tag">
                  Final Practice
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="roadmap-complete">
            <h2>🎉 Excellent Progress!</h2>

            <p>
              You currently have all the major skills listed
              for {selectedCareer}.
            </p>

            <p>
              Your next step should be building advanced
              projects and gaining practical experience.
            </p>
          </div>
        )}

        <div className="roadmap-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/result")}
          >
            ← Back to Results
          </button>

          <button
            className="primary-btn"
            onClick={() => navigate("/projects")}
          >
            Recommended Projects →
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;

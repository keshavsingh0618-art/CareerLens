
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SkillSelection() {
  const navigate = useNavigate();

  const selectedCareer =
    localStorage.getItem("selectedCareer") || "Backend Developer";

  const careerSkills = {
    "Frontend Developer": [
      { name: "HTML", weight: 15 },
      { name: "CSS", weight: 15 },
      { name: "JavaScript", weight: 25 },
      { name: "React", weight: 25 },
      { name: "Git", weight: 10 },
      { name: "Responsive Design", weight: 10 },
    ],

    "Backend Developer": [
      { name: "JavaScript", weight: 15 },
      { name: "Node.js", weight: 20 },
      { name: "Express.js", weight: 15 },
      { name: "MongoDB", weight: 15 },
      { name: "REST APIs", weight: 20 },
      { name: "Git", weight: 10 },
      { name: "Authentication", weight: 5 },
    ],

    "Data Analyst": [
      { name: "Excel", weight: 15 },
      { name: "SQL", weight: 25 },
      { name: "Python", weight: 20 },
      { name: "Power BI", weight: 20 },
      { name: "Statistics", weight: 10 },
      { name: "Data Visualization", weight: 10 },
    ],

    "Full Stack Developer": [
      { name: "HTML & CSS", weight: 10 },
      { name: "JavaScript", weight: 20 },
      { name: "React", weight: 20 },
      { name: "Node.js", weight: 20 },
      { name: "MongoDB", weight: 15 },
      { name: "REST APIs", weight: 10 },
      { name: "Git", weight: 5 },
    ],

    "Cybersecurity Analyst": [
      { name: "Networking", weight: 20 },
      { name: "Linux", weight: 15 },
      { name: "Cybersecurity Fundamentals", weight: 20 },
      { name: "Ethical Hacking", weight: 15 },
      { name: "SIEM Tools", weight: 15 },
      { name: "Cryptography", weight: 10 },
      { name: "Incident Response", weight: 5 },
    ],

    "UI/UX Designer": [
      { name: "Figma", weight: 20 },
      { name: "Wireframing", weight: 15 },
      { name: "Prototyping", weight: 15 },
      { name: "User Research", weight: 15 },
      { name: "UI Design Principles", weight: 15 },
      { name: "UX Principles", weight: 10 },
      { name: "Usability Testing", weight: 10 },
    ],
  };

  const skills = careerSkills[selectedCareer] || [];

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(
        selectedSkills.filter((skill) => skill !== skillName)
      );
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  const calculateReadiness = () => {
    let totalScore = 0;

    skills.forEach((skill) => {
      if (selectedSkills.includes(skill.name)) {
        totalScore += skill.weight;
      }
    });

    const missingSkills = skills
      .filter((skill) => !selectedSkills.includes(skill.name))
      .map((skill) => skill.name);

    // Save new skill analysis
    localStorage.setItem("readinessScore", totalScore);

    localStorage.setItem(
      "selectedSkills",
      JSON.stringify(selectedSkills)
    );

    localStorage.setItem(
      "missingSkills",
      JSON.stringify(missingSkills)
    );

    // Clear previous assessment results
    localStorage.removeItem("assessmentScore");
    localStorage.removeItem("assessmentCorrect");
    localStorage.removeItem("assessmentTotal");

    // Clear previous final result
    localStorage.removeItem("finalReadinessScore");

    navigate("/result");
  };

  return (
    <div className="skills-page">
      <div className="skills-container">
        <h1>Skill Assessment</h1>

        <p className="selected-career">
          Target Career: <strong>{selectedCareer}</strong>
        </p>

        <p className="skill-instruction">
          Select the skills you currently know.
        </p>

        <div className="skills-list">
          {skills.map((skill) => (
            <label
              className="skill-option"
              key={skill.name}
            >
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.name)}
                onChange={() => handleSkillChange(skill.name)}
              />

              <span>{skill.name}</span>

              <span className="skill-weight">
                {skill.weight} points
              </span>
            </label>
          ))}
        </div>

        <button
          className="primary-btn analyze-btn"
          onClick={calculateReadiness}
        >
          Analyze My Skills
        </button>

        <button
          className="back-btn"
          onClick={() => navigate("/careers")}
        >
          ← Back to Career Selection
        </button>
      </div>
    </div>
  );
}

export default SkillSelection;

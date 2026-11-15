
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Progress() {
  const navigate = useNavigate();

  const selectedCareer =
    localStorage.getItem("selectedCareer") || "Not Selected";

  const missingSkills =
    JSON.parse(localStorage.getItem("missingSkills")) || [];

  const projectData = {
    "Frontend Developer": [
      "Personal Portfolio Website",
      "Interactive To-Do App",
      "Movie Search Application",
    ],

    "Backend Developer": [
      "Student Management API",
      "User Authentication System",
      "Expense Tracker Backend",
      "E-Commerce Backend",
    ],

    "Data Analyst": [
      "Sales Data Analysis",
      "Customer Analysis Dashboard",
      "E-Commerce Data Analysis",
    ],

    "Full Stack Developer": [
      "Full Stack Task Manager",
      "Blog Platform",
      "Full Stack E-Commerce App",
    ],

    "Cybersecurity Analyst": [
      "Network Vulnerability Scanner",
      "Security Log Monitoring System",
      "Phishing Detection Tool",
    ],

    "UI/UX Designer": [
      "E-Commerce App Design",
      "Travel Booking App Prototype",
      "Personal Portfolio UI",
      "Mobile App Usability Redesign",
    ],
  };

  const projects = projectData[selectedCareer] || [];

  const skillStorageKey = `completedSkills_${selectedCareer}`;
  const projectStorageKey = `completedProjects_${selectedCareer}`;

  const [completedSkills, setCompletedSkills] = useState(
    JSON.parse(localStorage.getItem(skillStorageKey)) || []
  );

  const [completedProjects, setCompletedProjects] = useState(
    JSON.parse(localStorage.getItem(projectStorageKey)) || []
  );

  const toggleSkill = (skill) => {
    let updatedSkills;

    if (completedSkills.includes(skill)) {
      updatedSkills = completedSkills.filter(
        (item) => item !== skill
      );
    } else {
      updatedSkills = [...completedSkills, skill];
    }

    setCompletedSkills(updatedSkills);

    localStorage.setItem(
      skillStorageKey,
      JSON.stringify(updatedSkills)
    );
  };

  const toggleProject = (project) => {
    let updatedProjects;

    if (completedProjects.includes(project)) {
      updatedProjects = completedProjects.filter(
        (item) => item !== project
      );
    } else {
      updatedProjects = [...completedProjects, project];
    }

    setCompletedProjects(updatedProjects);

    localStorage.setItem(
      projectStorageKey,
      JSON.stringify(updatedProjects)
    );
  };

  const totalTasks =
    missingSkills.length + projects.length;

  const completedTasks =
    completedSkills.length + completedProjects.length;

  const progress =
    totalTasks === 0
      ? 100
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  let progressMessage = "Your journey has just started.";

  if (progress >= 80) {
    progressMessage =
      "Excellent progress! You're getting close to your goal.";
  } else if (progress >= 50) {
    progressMessage =
      "Great work! Keep building your skills.";
  } else if (progress >= 20) {
    progressMessage =
      "Good start. Stay consistent and keep going.";
  }

  return (
    <div className="progress-page">
      <div className="progress-container">

        <div className="progress-header">
          <p className="progress-label">
            YOUR LEARNING JOURNEY
          </p>

          <h1>Progress Tracker</h1>

          <p>
            Target Career:{" "}
            <strong>{selectedCareer}</strong>
          </p>
        </div>

        <div className="overall-progress-card">
          <div>
            <p>Overall Progress</p>
            <h1>{progress}%</h1>
          </div>

          <div className="large-progress-bar">
            <div
              className="large-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="progress-message">
            {progressMessage}
          </p>

          <div className="progress-stats">
            <div>
              <h3>{completedTasks}</h3>
              <p>Completed</p>
            </div>

            <div>
              <h3>{totalTasks}</h3>
              <p>Total Tasks</p>
            </div>

            <div>
              <h3>{totalTasks - completedTasks}</h3>
              <p>Remaining</p>
            </div>
          </div>
        </div>

        <div className="tracking-grid">

          <div className="tracking-card">
            <h2>Skill Progress</h2>

            <p className="tracking-subtitle">
              Mark a skill complete once you feel confident
              with it.
            </p>

            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <label
                  className="progress-task"
                  key={skill}
                >
                  <input
                    type="checkbox"
                    checked={completedSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />

                  <span
                    className={
                      completedSkills.includes(skill)
                        ? "task-completed"
                        : ""
                    }
                  >
                    {skill}
                  </span>
                </label>
              ))
            ) : (
              <p className="empty-progress">
                No major missing skills 🎉
              </p>
            )}
          </div>

          <div className="tracking-card">
            <h2>Project Progress</h2>

            <p className="tracking-subtitle">
              Complete practical projects to strengthen
              your profile.
            </p>

            {projects.length > 0 ? (
              projects.map((project) => (
                <label
                  className="progress-task"
                  key={project}
                >
                  <input
                    type="checkbox"
                    checked={completedProjects.includes(project)}
                    onChange={() => toggleProject(project)}
                  />

                  <span
                    className={
                      completedProjects.includes(project)
                        ? "task-completed"
                        : ""
                    }
                  >
                    {project}
                  </span>
                </label>
              ))
            ) : (
              <p className="empty-progress">
                No projects available for this career yet.
              </p>
            )}
          </div>

        </div>

        <div className="progress-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/projects")}
          >
            ← Back to Projects
          </button>

          <button
            className="primary-btn"
            onClick={() => navigate("/roadmap")}
          >
            View Roadmap
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

export default Progress;

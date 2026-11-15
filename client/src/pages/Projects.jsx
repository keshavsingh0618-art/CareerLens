
import { useNavigate } from "react-router-dom";

function Projects() {
    const navigate = useNavigate();

    const selectedCareer =
        localStorage.getItem("selectedCareer") || "Not Selected";

    const missingSkills =
        JSON.parse(localStorage.getItem("missingSkills")) || [];

    const projectData = {
        "Frontend Developer": [
            {
                title: "Personal Portfolio Website",
                level: "Beginner",
                description:
                    "Build a responsive portfolio website with multiple sections and modern UI.",
                skills: ["HTML", "CSS", "Responsive Design"],
            },
            {
                title: "Interactive To-Do App",
                level: "Intermediate",
                description:
                    "Create an interactive task manager using JavaScript and browser storage.",
                skills: ["JavaScript", "HTML", "CSS"],
            },
            {
                title: "Movie Search Application",
                level: "Intermediate",
                description:
                    "Build a React application that searches and displays movie information.",
                skills: ["React", "JavaScript", "Git"],
            },
        ],

        "Backend Developer": [
            {
                title: "Student Management API",
                level: "Beginner",
                description:
                    "Create APIs to add, update, delete and view student records.",
                skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
            },
            {
                title: "User Authentication System",
                level: "Intermediate",
                description:
                    "Build secure registration and login using password hashing and JWT.",
                skills: ["Authentication", "Node.js", "Express.js", "MongoDB"],
            },
            {
                title: "Expense Tracker Backend",
                level: "Intermediate",
                description:
                    "Develop a backend where users can store and manage their expenses.",
                skills: ["REST APIs", "MongoDB", "Node.js", "Authentication"],
            },
            {
                title: "E-Commerce Backend",
                level: "Advanced",
                description:
                    "Create product, user, cart and order APIs for an e-commerce platform.",
                skills: ["REST APIs", "MongoDB", "Authentication", "Git"],
            },
        ],

        "Data Analyst": [
            {
                title: "Sales Data Analysis",
                level: "Beginner",
                description:
                    "Analyze sales data and identify trends, top products and revenue patterns.",
                skills: ["Excel", "Statistics", "Data Visualization"],
            },
            {
                title: "Customer Analysis Dashboard",
                level: "Intermediate",
                description:
                    "Create an interactive dashboard showing customer and business insights.",
                skills: ["Power BI", "Data Visualization", "Excel"],
            },
            {
                title: "E-Commerce Data Analysis",
                level: "Intermediate",
                description:
                    "Use SQL and Python to analyze orders, customers and product performance.",
                skills: ["SQL", "Python", "Statistics"],
            },
        ],

        "Full Stack Developer": [
            {
                title: "Full Stack Task Manager",
                level: "Beginner",
                description:
                    "Build a complete task management application with frontend and backend.",
                skills: ["React", "Node.js", "MongoDB", "REST APIs"],
            },
            {
                title: "Blog Platform",
                level: "Intermediate",
                description:
                    "Build a platform where users can register, create posts and manage content.",
                skills: ["React", "Node.js", "MongoDB", "JavaScript"],
            },
            {
                title: "Full Stack E-Commerce App",
                level: "Advanced",
                description:
                    "Create a complete online shopping platform with products, cart and orders.",
                skills: [
                    "React",
                    "Node.js",
                    "MongoDB",
                    "REST APIs",
                    "Git",
                ],
            },
        ],

        "Cybersecurity Analyst": [
            {
                title: "Network Vulnerability Scanner",
                level: "Intermediate",
                description:
                    "Build a tool to scan authorized test networks and identify common open ports and potential vulnerabilities.",
                skills: ["Networking", "Linux", "Ethical Hacking"],
            },
            {
                title: "Security Log Monitoring System",
                level: "Intermediate",
                description:
                    "Create a system that analyzes security logs and identifies suspicious activities and unusual login attempts.",
                skills: ["SIEM Tools", "Linux", "Incident Response"],
            },
            {
                title: "Phishing Detection Tool",
                level: "Beginner",
                description:
                    "Develop a tool that checks suspicious URLs and identifies common phishing indicators.",
                skills: ["Cybersecurity Fundamentals", "Python", "Networking"],
            },
        ],

        "UI/UX Designer": [
            {
                title: "E-Commerce App Design",
                level: "Intermediate",
                description:
                    "Design a complete shopping app interface with product pages, cart, checkout and user-friendly navigation.",
                skills: ["Figma", "UI Design Principles", "UX Principles"],
            },
            {
                title: "Travel Booking App Prototype",
                level: "Intermediate",
                description:
                    "Create an interactive travel booking prototype with destination discovery, search and booking flows.",
                skills: ["Figma", "Wireframing", "Prototyping"],
            },
            {
                title: "Personal Portfolio UI",
                level: "Beginner",
                description:
                    "Design a modern portfolio interface showcasing projects, skills and personal information.",
                skills: ["Figma", "UI Design Principles", "User Research"],
            },
            {
                title: "Mobile App Usability Redesign",
                level: "Advanced",
                description:
                    "Evaluate an existing app interface, identify usability issues and redesign it using user-centered design principles.",
                skills: ["User Research", "Usability Testing", "UX Principles"],
            },
        ],
    };

    const projects = projectData[selectedCareer] || [];

    const getMatchingSkills = (projectSkills) => {
        return projectSkills.filter((skill) =>
            missingSkills.includes(skill)
        );
    };

    const sortedProjects = [...projects].sort((a, b) => {
        const aMatches = getMatchingSkills(a.skills).length;
        const bMatches = getMatchingSkills(b.skills).length;

        return bMatches - aMatches;
    });

    return (
        <div className="projects-page">
            <div className="projects-container">
                <div className="projects-header">
                    <p className="projects-label">
                        PRACTICE THROUGH PROJECTS
                    </p>

                    <h1>Recommended Projects</h1>

                    <p>
                        Target Career:{" "}
                        <strong>{selectedCareer}</strong>
                    </p>

                    <p className="projects-description">
                        These projects are recommended based on your
                        target career and current skill gaps.
                    </p>
                </div>

                <div className="projects-grid">
                    {sortedProjects.map((project, index) => {
                        const matchingSkills =
                            getMatchingSkills(project.skills);

                        return (
                            <div
                                className="project-card"
                                key={project.title}
                            >
                                <div className="project-card-top">
                                    <span className="project-number">
                                        0{index + 1}
                                    </span>

                                    <span
                                        className={`level-badge ${project.level.toLowerCase()}`}
                                    >
                                        {project.level}
                                    </span>
                                </div>

                                <h2>{project.title}</h2>

                                <p className="project-description">
                                    {project.description}
                                </p>

                                <h4>Skills Practiced</h4>

                                <div className="project-skills">
                                    {project.skills.map((skill) => (
                                        <span
                                            className="project-skill"
                                            key={skill}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {matchingSkills.length > 0 && (
                                    <div className="gap-match">
                                        <strong>
                                            Helps improve your gaps:
                                        </strong>

                                        <p>
                                            {matchingSkills.join(", ")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="projects-actions">
                    <button
                        className="primary-btn"
                        onClick={() => navigate("/roadmap")}
                    >
                        ← Back to Roadmap
                    </button>

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/progress")}
                    >
                        Track My Progress →
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

export default Projects;

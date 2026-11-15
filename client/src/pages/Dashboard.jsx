import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || null;

  const selectedCareer =
    localStorage.getItem("selectedCareer") || "";

  const finalScore =
    localStorage.getItem("finalReadinessScore");

  const hasCareerAnalysis =
    selectedCareer && finalScore !== null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleAIButton = () => {
    if (hasCareerAnalysis) {
      navigate("/ai-assistant");
    } else {
      navigate("/careers");
    }
  };

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <h2>CareerLens</h2>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <h1>
          Welcome, {user?.name || "Student"} 👋
        </h1>

        <p>
          Discover your career readiness, improve your
          skills and track your progress.
        </p>

        {/* START CAREER ANALYSIS */}
        <div className="dashboard-card">
          <h2>Start Your Career Analysis</h2>

          <p>
            Choose your target career and CareerLens will
            analyze your skills, identify gaps and create
            a personalized learning roadmap.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/careers")}
          >
            Choose Career Path
          </button>
        </div>

        {/* AI CAREER ASSISTANT */}
        <div className="dashboard-card dashboard-ai-card">
          <div className="dashboard-ai-top">
            <div className="dashboard-ai-icon">
              ✦
            </div>

            <div>
              <span className="dashboard-ai-label">
                POWERED BY AI
              </span>

              <h2>AI Career Assistant</h2>
            </div>
          </div>

          <p>
            Get personalized career guidance based on
            your selected career, skill gaps, technical
            assessment and readiness score.
          </p>

          {hasCareerAnalysis ? (
            <div className="dashboard-ai-summary">
              <span>
                Career
                <strong>{selectedCareer}</strong>
              </span>

              <span>
                Readiness
                <strong>{finalScore}%</strong>
              </span>
            </div>
          ) : (
            <div className="dashboard-ai-notice">
              Complete your career analysis first to get
              personalized AI guidance.
            </div>
          )}

          <button
            className="dashboard-ai-btn"
            onClick={handleAIButton}
          >
            {hasCareerAnalysis
              ? "Ask CareerLens AI ✦"
              : "Complete Analysis First →"}
          </button>
        </div>

        {/* ANALYSIS HISTORY */}
        <div className="dashboard-card">
          <h2>Analysis History</h2>

          <p>
            View your previous career assessments and
            compare your readiness scores over time.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/history")}
          >
            View Analysis History
          </button>
        </div>

        {/* LATEST RESULT */}
        {hasCareerAnalysis && (
          <div className="dashboard-card">
            <h2>Latest Career Result</h2>

            <p>
              Career:{" "}
              <strong>{selectedCareer}</strong>
            </p>

            <p>
              Latest Final Readiness Score:{" "}
              <strong>{finalScore}%</strong>
            </p>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate("/final-result")
              }
            >
              View Final Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
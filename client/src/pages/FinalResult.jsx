
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function FinalResult() {
  const navigate = useNavigate();

  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const selectedCareer =
    localStorage.getItem("selectedCareer") || "Not Selected";

  const selectedSkills =
    JSON.parse(localStorage.getItem("selectedSkills")) || [];

  const missingSkills =
    JSON.parse(localStorage.getItem("missingSkills")) || [];

  const skillScore = Number(
    localStorage.getItem("readinessScore") || 0
  );

  const assessmentScore = Number(
    localStorage.getItem("assessmentScore") || 0
  );

  const assessmentCorrect = Number(
    localStorage.getItem("assessmentCorrect") || 0
  );

  const assessmentTotal = Number(
    localStorage.getItem("assessmentTotal") || 0
  );

  const user =
    JSON.parse(localStorage.getItem("user")) || null;

  const finalScore = Math.round(
    skillScore * 0.6 + assessmentScore * 0.4
  );

  localStorage.setItem(
    "finalReadinessScore",
    finalScore
  );

  let readinessLevel = "Beginner";

  let feedback =
    "Focus on strengthening your fundamental skills and continue practicing.";

  if (finalScore >= 80) {
    readinessLevel = "Highly Ready";

    feedback =
      "Excellent! You demonstrate strong career readiness. Continue building advanced projects and practical experience.";
  } else if (finalScore >= 60) {
    readinessLevel = "Intermediate";

    feedback =
      "You have a good foundation. Focus on your remaining skill gaps and practical projects.";
  } else if (finalScore >= 40) {
    readinessLevel = "Developing";

    feedback =
      "You are making progress, but several important areas still need improvement.";
  }

  const saveAnalysis = async () => {
    if (!user?.id) {
      setSaveMessage(
        "User information not found. Please login again."
      );
      return;
    }

    try {
      setSaving(true);
      setSaveMessage("");

      const response = await API.post(
        "/api/analysis/save",
        {
          userId: user.id,
          career: selectedCareer,
          selectedSkills,
          missingSkills,
          skillScore,
          assessmentScore,
          assessmentCorrect,
          assessmentTotal,
          finalScore,
          readinessLevel,
        }
      );

      setSaveMessage(response.data.message);
      setSaved(true);

      localStorage.setItem(
        "lastAnalysisId",
        response.data.analysis._id
      );
    } catch (error) {
      console.log("Save Analysis Error:", error);

      setSaveMessage(
        error.response?.data?.message ||
          "Unable to save analysis"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="final-result-page">
      <div className="final-result-container">

        {/* TOP HEADER */}
        <div className="final-result-header">
          <p className="final-result-label">
            COMPLETE CAREER ANALYSIS
          </p>

          <h1>Final Readiness Score</h1>

          <p>
            Target Career:{" "}
            <strong>{selectedCareer}</strong>
          </p>
        </div>

        {/* MAIN SCORE CARD */}
        <div className="final-score-card">

          <p className="final-score-title">
            Your Overall Career Readiness
          </p>

          <div className="final-score-circle">
            <span>{finalScore}%</span>
          </div>

          <div className="final-progress-bar">
            <div
              className="final-progress-fill"
              style={{
                width: `${finalScore}%`,
              }}
            />
          </div>

          <div className="final-readiness-badge">
            {readinessLevel}
          </div>

          <p className="final-feedback">
            {feedback}
          </p>

        </div>

        {/* SCORE BREAKDOWN */}
        <div className="score-breakdown">

          <div className="breakdown-card">
            <div className="breakdown-icon">
              60%
            </div>

            <div>
              <p>Self-Assessed Skill Score</p>

              <h2>{skillScore}%</h2>

              <span>
                Weighted contribution: 60%
              </span>
            </div>
          </div>

          <div className="breakdown-card">
            <div className="breakdown-icon">
              40%
            </div>

            <div>
              <p>Technical Assessment</p>

              <h2>{assessmentScore}%</h2>

              <span>
                Weighted contribution: 40%
              </span>

              {assessmentTotal > 0 && (
                <small>
                  {assessmentCorrect} of{" "}
                  {assessmentTotal} questions correct
                </small>
              )}
            </div>
          </div>

        </div>

        {/* CALCULATION */}
        <div className="formula-card">

          <div>
            <p className="formula-label">
              SCORE CALCULATION
            </p>

            <h3>
              How CareerLens calculated your score
            </h3>
          </div>

          <div className="formula-equation">
            <span>
              ({skillScore} × 60%)
            </span>

            <span className="formula-symbol">
              +
            </span>

            <span>
              ({assessmentScore} × 40%)
            </span>

            <span className="formula-symbol">
              =
            </span>

            <strong>
              {finalScore}%
            </strong>
          </div>

        </div>

        {/* SAVE */}
        <div className="save-analysis-section">

          <button
            className="save-analysis-btn"
            onClick={saveAnalysis}
            disabled={saving || saved}
          >
            {saving
              ? "Saving Analysis..."
              : saved
              ? "Analysis Saved ✓"
              : "Save My Analysis"}
          </button>

          {saveMessage && (
            <p className="save-analysis-message">
              {saveMessage}
            </p>
          )}

        </div>

        {/* ACTIONS */}
        <div className="final-result-actions">

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/roadmap")
            }
          >
            View My Roadmap
          </button>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/projects")
            }
          >
            Recommended Projects
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate("/assessment")
            }
          >
            Retake Assessment
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

export default FinalResult;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function FinalResult() {
  const navigate = useNavigate();

  const career =
    localStorage.getItem("selectedCareer") || "Not Selected";

  const selectedSkills = JSON.parse(
    localStorage.getItem("selectedSkills") || "[]"
  );

  const missingSkills = JSON.parse(
    localStorage.getItem("missingSkills") || "[]"
  );

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

  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Check whether technical assessment is completed
  const assessmentCompleted = assessmentTotal > 0;

  // Calculate final score
  const finalScore = assessmentCompleted
    ? Math.round(skillScore * 0.6 + assessmentScore * 0.4)
    : skillScore;

  const getReadinessLevel = (score) => {
    if (score >= 80) return "Highly Ready";
    if (score >= 60) return "Intermediate";
    if (score >= 40) return "Developing";
    return "Beginner";
  };

  const readinessLevel = getReadinessLevel(finalScore);

  useEffect(() => {
    localStorage.setItem("finalReadinessScore", finalScore);
  }, [finalScore]);

  const getFeedback = () => {
    if (!assessmentCompleted) {
      return "Your skill readiness has been calculated. Complete the technical assessment to get your final career readiness score.";
    }

    if (finalScore >= 80) {
      return "Excellent work! You have strong career readiness. Continue strengthening advanced skills and building real-world projects.";
    }

    if (finalScore >= 60) {
      return "You have a good foundation. Focus on your missing skills and gain more practical experience through projects.";
    }

    if (finalScore >= 40) {
      return "You are making progress. Strengthening your core technical skills and completing your roadmap will significantly improve your readiness.";
    }

    return "You are at the beginning of your journey. Focus on building strong fundamentals, following your roadmap and practicing consistently.";
  };

  // Save analysis
  const handleSaveAnalysis = async () => {
    if (!user) {
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
          userId: user.id || user._id,
          career,
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

      if (response.data?._id) {
        localStorage.setItem(
          "lastAnalysisId",
          response.data._id
        );
      }

      setSaveMessage("Analysis saved successfully ✅");
    } catch (error) {
      console.error("Save Analysis Error:", error);

      setSaveMessage(
        error.response?.data?.message ||
          "Unable to save analysis."
      );
    } finally {
      setSaving(false);
    }
  };

  // Retake assessment
  const handleRetakeAssessment = () => {
    localStorage.removeItem("assessmentScore");
    localStorage.removeItem("assessmentCorrect");
    localStorage.removeItem("assessmentTotal");

    navigate("/assessment");
  };

  return (
    <div className="final-result-page">
      <div className="final-result-container">

        {/* Header */}
        <div className="final-result-header">
          <span className="final-result-label">
            CAREERLENS FINAL ASSESSMENT
          </span>

          <h1>Your Career Readiness Result</h1>

          <p>
            Your score combines your skill readiness
            and technical assessment.
          </p>
        </div>

        {/* Final Score */}
        <div className="final-score-card">
          <p className="final-score-title">
            {assessmentCompleted
              ? "Final Readiness Score"
              : "Skill Readiness Score"}
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
            ></div>
          </div>

          <div className="final-readiness-badge">
            {readinessLevel}
          </div>

          <p className="final-feedback">
            {getFeedback()}
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="score-breakdown">

          <div className="breakdown-card">
            <div className="breakdown-icon">
              🎯
            </div>

            <div>
              <span>Skill Readiness</span>

              <strong>{skillScore}%</strong>
            </div>
          </div>

          <div className="breakdown-card">
            <div className="breakdown-icon">
              🧠
            </div>

            <div>
              <span>Technical Assessment</span>

              <strong>
                {assessmentCompleted
                  ? `${assessmentScore}%`
                  : "Pending"}
              </strong>
            </div>
          </div>

        </div>

        {/* Assessment Pending Message */}
        {!assessmentCompleted && (
          <div className="save-analysis-section">
            <p>
              Complete your technical assessment
              to calculate your final readiness score.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/assessment")}
            >
              Start Assessment
            </button>
          </div>
        )}

        {/* Score Formula */}
        {assessmentCompleted && (
          <div className="formula-card">
            <span className="formula-label">
              How your final score is calculated
            </span>

            <div className="formula-equation">
              <strong>{skillScore}%</strong>

              <span className="formula-symbol">
                × 60%
              </span>

              <span className="formula-symbol">
                +
              </span>

              <strong>{assessmentScore}%</strong>

              <span className="formula-symbol">
                × 40%
              </span>

              <span className="formula-symbol">
                =
              </span>

              <strong>{finalScore}%</strong>
            </div>
          </div>
        )}

        {/* Save Analysis */}
        {assessmentCompleted && (
          <div className="save-analysis-section">
            <button
              className="save-analysis-btn"
              onClick={handleSaveAnalysis}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Analysis"}
            </button>

            {saveMessage && (
              <p className="save-analysis-message">
                {saveMessage}
              </p>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="final-result-actions">

          {assessmentCompleted && (
            <button
              className="secondary-btn"
              onClick={handleRetakeAssessment}
            >
              Retake Assessment
            </button>
          )}

          <button
            className="secondary-btn"
            onClick={() => navigate("/roadmap")}
          >
            View Roadmap
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/projects")}
          >
            View Projects
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/history")}
          >
            Analysis History
          </button>

          <button
            className="final-ai-btn"
            onClick={() => navigate("/ai-assistant")}
          >
            ✦ Ask AI How to Improve
          </button>

          <button
            className="primary-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

export default FinalResult;

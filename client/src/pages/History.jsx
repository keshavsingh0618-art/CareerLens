import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function History() {
  const navigate = useNavigate();

  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const user =
    JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) {
        setMessage("User information not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/analysis/history/${user.id}`
        );

        setAnalyses(response.data.analyses || []);
      } catch (error) {
        console.log("History Fetch Error:", error);

        setMessage(
          error.response?.data?.message ||
            "Unable to load analysis history"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user?.id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="history-page">
      <div className="history-container">

        <div className="history-header">
          <p className="history-label">
            YOUR CAREER JOURNEY
          </p>

          <h1>Analysis History</h1>

          <p>
            Review your previous CareerLens assessments
            and track how your readiness changes over time.
          </p>
        </div>

        {loading ? (
          <div className="history-status">
            <h3>Loading your history...</h3>
          </div>
        ) : message ? (
          <div className="history-status">
            <p>{message}</p>
          </div>
        ) : analyses.length === 0 ? (
          <div className="history-status">
            <h2>No Saved Analyses Yet</h2>

            <p>
              Complete an assessment and save your final
              result to start building your history.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/careers")}
            >
              Start Career Analysis
            </button>
          </div>
        ) : (
          <div className="history-list">
            {analyses.map((analysis, index) => (
              <div
                className="history-card"
                key={analysis._id}
              >
                <div className="history-card-top">
                  <div>
                    <span className="history-attempt">
                      Attempt {analyses.length - index}
                    </span>

                    <h2>{analysis.career}</h2>
                  </div>

                  <div className="history-final-score">
                    {analysis.finalScore}%
                  </div>
                </div>

                <p className="history-date">
                  {formatDate(analysis.createdAt)}
                </p>

                <div className="history-score-grid">
                  <div>
                    <span>Skill Score</span>
                    <strong>
                      {analysis.skillScore}%
                    </strong>
                  </div>

                  <div>
                    <span>Assessment</span>
                    <strong>
                      {analysis.assessmentScore}%
                    </strong>
                  </div>

                  <div>
                    <span>Final Score</span>
                    <strong>
                      {analysis.finalScore}%
                    </strong>
                  </div>

                  <div>
                    <span>Readiness</span>
                    <strong>
                      {analysis.readinessLevel}
                    </strong>
                  </div>
                </div>

                {analysis.assessmentTotal > 0 && (
                  <p className="history-assessment-detail">
                    Technical Assessment:{" "}
                    {analysis.assessmentCorrect} /{" "}
                    {analysis.assessmentTotal} correct
                  </p>
                )}

                <div className="history-skills-section">
                  <div>
                    <h4>Strengths</h4>

                    <div className="history-tags">
                      {analysis.selectedSkills?.length >
                      0 ? (
                        analysis.selectedSkills.map(
                          (skill) => (
                            <span
                              className="history-skill-tag"
                              key={skill}
                            >
                              {skill}
                            </span>
                          )
                        )
                      ) : (
                        <p>No skills recorded.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4>Skill Gaps</h4>

                    <div className="history-tags">
                      {analysis.missingSkills?.length >
                      0 ? (
                        analysis.missingSkills.map(
                          (skill) => (
                            <span
                              className="history-gap-tag"
                              key={skill}
                            >
                              {skill}
                            </span>
                          )
                        )
                      ) : (
                        <p>No major skill gaps.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="history-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/careers")}
          >
            New Career Analysis
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

export default History;
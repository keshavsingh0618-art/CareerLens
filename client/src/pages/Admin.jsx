
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Admin() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdminStats = async () => {
      const token = localStorage.getItem("token");

      const user =
        JSON.parse(localStorage.getItem("user")) || null;

      if (!token) {
        setMessage("Please login again.");
        setLoading(false);
        return;
      }

      if (!user || user.role !== "admin") {
        setMessage("Admin access required.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(
          "/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data.stats);
      } catch (error) {
        console.log("Admin Error:", error);

        setMessage(
          error.response?.data?.message ||
            "Unable to load admin dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-status">
          <h2>Loading Admin Dashboard...</h2>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="admin-page">
        <div className="admin-status">
          <h2>Unable to Load Dashboard</h2>

          <p>{message}</p>

          <button
            className="primary-btn"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">

        <div className="admin-header">
          <div>
            <p className="admin-label">
              CAREERLENS MANAGEMENT
            </p>

            <h1>Admin Dashboard</h1>

            <p>
              Monitor students, assessments and career
              readiness activity.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              className="primary-btn"
              onClick={() =>
                navigate("/admin/students")
              }
            >
              Manage Students
            </button>

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/admin/questions")
              }
            >
              Manage Questions
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Student Dashboard
            </button>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="admin-stat-grid">

          <div className="admin-stat-card">
            <p>Total Students</p>

            <h2>
              {stats?.totalStudents || 0}
            </h2>

            <span>
              Registered students
            </span>
          </div>

          <div className="admin-stat-card">
            <p>Total Analyses</p>

            <h2>
              {stats?.totalAnalyses || 0}
            </h2>

            <span>
              Saved assessments
            </span>
          </div>

          <div className="admin-stat-card">
            <p>Average Readiness</p>

            <h2>
              {stats?.averageReadiness || 0}%
            </h2>

            <span>
              Across all analyses
            </span>
          </div>

          <div className="admin-stat-card">
            <p>Career Paths</p>

            <h2>
              {stats?.careerBreakdown?.length || 0}
            </h2>

            <span>
              Career categories
            </span>
          </div>

        </div>

        <div className="admin-section">

          <div className="admin-section-heading">
            <h2>
              Career Selection Overview
            </h2>

            <p>
              Saved analyses across different career paths.
            </p>
          </div>

          {stats?.careerBreakdown?.length > 0 ? (
            <div className="career-breakdown-grid">
              {stats.careerBreakdown.map(
                (career) => (
                  <div
                    className="career-breakdown-card"
                    key={career._id}
                  >
                    <h3>
                      {career._id ||
                        "Unknown Career"}
                    </h3>

                    <p>
                      {career.count}{" "}
                      {career.count === 1
                        ? "analysis"
                        : "analyses"}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="admin-empty">
              No career analysis data available yet.
            </p>
          )}

        </div>

        <div className="admin-section">

          <div className="admin-section-heading">
            <h2>Recent Analyses</h2>

            <p>
              Latest student career readiness results.
            </p>
          </div>

          {stats?.recentAnalyses?.length > 0 ? (
            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Career</th>
                    <th>Skill Score</th>
                    <th>Assessment</th>
                    <th>Final Score</th>
                    <th>Readiness</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.recentAnalyses.map(
                    (analysis) => (
                      <tr key={analysis._id}>

                        <td>
                          <strong>
                            {analysis.userId?.name ||
                              "Unknown"}
                          </strong>

                          <small>
                            {analysis.userId?.email ||
                              ""}
                          </small>
                        </td>

                        <td>
                          {analysis.career}
                        </td>

                        <td>
                          {analysis.skillScore}%
                        </td>

                        <td>
                          {analysis.assessmentScore}%
                        </td>

                        <td>
                          <strong>
                            {analysis.finalScore}%
                          </strong>
                        </td>

                        <td>
                          <span className="admin-readiness-badge">
                            {
                              analysis.readinessLevel
                            }
                          </span>
                        </td>

                        <td>
                          {formatDate(
                            analysis.createdAt
                          )}
                        </td>

                      </tr>
                    )
                  )}
                </tbody>

              </table>

            </div>
          ) : (
            <p className="admin-empty">
              No saved analyses available yet.
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default Admin;

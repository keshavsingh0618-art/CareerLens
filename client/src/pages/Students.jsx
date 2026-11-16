
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(
          "/api/admin/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudents(response.data.students || []);
      } catch (error) {
        console.log("Students Error:", error);

        setMessage(
          error.response?.data?.message ||
            "Unable to load students"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-status">
          <h2>Loading Students...</h2>
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="admin-page">
        <div className="admin-status">
          <h2>Unable to Load Students</h2>
          <p>{message}</p>

          <button
            className="primary-btn"
            onClick={() => navigate("/admin")}
          >
            Back to Admin Dashboard
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
              STUDENT MANAGEMENT
            </p>

            <h1>Manage Students</h1>

            <p>
              View registered students and their
              CareerLens activity.
            </p>
          </div>

          <button
            className="secondary-btn"
            onClick={() => navigate("/admin")}
          >
            ← Admin Dashboard
          </button>
        </div>

        <div className="admin-section">
          <div className="admin-section-heading">
            <h2>
              Registered Students ({students.length})
            </h2>

            <p>
              Student profiles and saved analysis activity.
            </p>
          </div>

          {students.length > 0 ? (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>College</th>
                    <th>Course</th>
                    <th>Semester</th>
                    <th>Analyses</th>
                    <th>Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>
                        <strong>
                          {student.name}
                        </strong>

                        <small>
                          {student.email}
                        </small>
                      </td>

                      <td>
                        {student.college || "N/A"}
                      </td>

                      <td>
                        {student.course || "N/A"}
                      </td>

                      <td>
                        {student.semester || "N/A"}
                      </td>

                      <td>
                        <strong>
                          {student.analysisCount || 0}
                        </strong>
                      </td>

                      <td>
                        {formatDate(student.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="admin-empty">
              No student accounts found.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Students;

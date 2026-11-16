
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Questions() {
  const navigate = useNavigate();

  const emptyForm = {
    career: "Frontend Developer",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    difficulty: "Medium",
  };

  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchQuestions = async () => {
    try {
      const token = getToken();

      const response = await API.get(
        "/api/questions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(response.data.questions || []);
    } catch (error) {
      console.log("Questions Fetch Error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to load questions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];

    updatedOptions[index] = value;

    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!formData.question.trim()) {
      setErrorMessage("Please enter a question.");
      return;
    }

    const hasEmptyOption =
      formData.options.some(
        (option) => !option.trim()
      );

    if (hasEmptyOption) {
      setErrorMessage(
        "Please fill all four answer options."
      );
      return;
    }

    try {
      const token = getToken();

      const dataToSend = {
        ...formData,
        correctAnswer: Number(
          formData.correctAnswer
        ),
      };

      if (editingId) {
        await API.put(
          `/api/questions/${editingId}`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(
          "Question updated successfully ✅"
        );
      } else {
        await API.post(
          "/api/questions",
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(
          "Question added successfully ✅"
        );
      }

      resetForm();
      fetchQuestions();
    } catch (error) {
      console.log("Question Save Error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to save question."
      );
    }
  };

  const handleEdit = (question) => {
    setEditingId(question._id);

    setFormData({
      career: question.career,
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      difficulty:
        question.difficulty || "Medium",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getToken();

      await API.delete(
        `/api/questions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Question deleted successfully ✅"
      );

      fetchQuestions();
    } catch (error) {
      console.log("Question Delete Error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to delete question."
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-status">
          <h2>Loading Questions...</h2>
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
              ASSESSMENT MANAGEMENT
            </p>

            <h1>Manage Questions</h1>

            <p>
              Add, edit and manage technical
              assessment questions.
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
              {editingId
                ? "Edit Question"
                : "Add New Question"}
            </h2>

            <p>
              Create assessment questions for
              different career paths.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="question-form"
          >

            <label>Career Path</label>

            <select
              name="career"
              value={formData.career}
              onChange={handleChange}
            >
              <option value="Frontend Developer">
                Frontend Developer
              </option>

              <option value="Backend Developer">
                Backend Developer
              </option>

              <option value="Data Analyst">
                Data Analyst
              </option>

              <option value="Full Stack Developer">
                Full Stack Developer
              </option>
            </select>

            <label>Question</label>

            <textarea
              name="question"
              placeholder="Enter assessment question"
              value={formData.question}
              onChange={handleChange}
              rows="3"
            />

            <label>Answer Options</label>

            {formData.options.map(
              (option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      e.target.value
                    )
                  }
                />
              )
            )}

            <label>Correct Answer</label>

            <select
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
            >
              <option value={0}>Option 1</option>
              <option value={1}>Option 2</option>
              <option value={2}>Option 3</option>
              <option value={3}>Option 4</option>
            </select>

            <label>Difficulty</label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="Easy">
                Easy
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Hard">
                Hard
              </option>
            </select>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                className="primary-btn"
                type="submit"
              >
                {editingId
                  ? "Update Question"
                  : "Add Question"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>

          </form>

          {message && (
            <p className="message">
              {message}
            </p>
          )}

          {errorMessage && (
            <p className="message">
              {errorMessage}
            </p>
          )}

        </div>

        <div className="admin-section">

          <div className="admin-section-heading">
            <h2>
              Assessment Questions (
              {questions.length})
            </h2>

            <p>
              Questions currently stored in
              CareerLens.
            </p>
          </div>

          {questions.length > 0 ? (
            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Career</th>
                    <th>Question</th>
                    <th>Correct Answer</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {questions.map((item) => (
                    <tr key={item._id}>

                      <td>
                        {item.career}
                      </td>

                      <td>
                        <strong>
                          {item.question}
                        </strong>
                      </td>

                      <td>
                        {
                          item.options[
                            item.correctAnswer
                          ]
                        }
                      </td>

                      <td>
                        {item.difficulty}
                      </td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <button
                            className="secondary-btn"
                            onClick={() =>
                              handleEdit(item)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="logout-btn"
                            onClick={() =>
                              handleDelete(
                                item._id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          ) : (
            <p className="admin-empty">
              No assessment questions found.
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default Questions;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Assessment() {
  const navigate = useNavigate();

  const selectedCareer =
    localStorage.getItem("selectedCareer") || "";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [result, setResult] = useState({
    correct: 0,
    total: 0,
    score: 0,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage(
          "Please login again to continue."
        );
        setLoading(false);
        return;
      }

      if (!selectedCareer) {
        setErrorMessage(
          "Please select a career path first."
        );
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(
          `/api/questions/career/${encodeURIComponent(
            selectedCareer
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuestions(
          response.data.questions || []
        );
      } catch (error) {
        console.log(
          "Assessment Questions Error:",
          error
        );

        setErrorMessage(
          error.response?.data?.message ||
            "Unable to load assessment questions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedCareer]);

  const handleAnswer = (
    questionId,
    optionIndex
  ) => {
    if (submitted) return;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));

    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (questions.length === 0) return;

    const unansweredQuestions =
      questions.filter(
        (question) =>
          answers[question._id] === undefined
      );

    if (unansweredQuestions.length > 0) {
      setErrorMessage(
        `Please answer all questions. ${unansweredQuestions.length} remaining.`
      );
      return;
    }

    let correctAnswers = 0;

    questions.forEach((question) => {
      if (
        Number(answers[question._id]) ===
        Number(question.correctAnswer)
      ) {
        correctAnswers++;
      }
    });

    const totalQuestions = questions.length;

    const percentage =
      totalQuestions > 0
        ? Math.round(
            (correctAnswers / totalQuestions) * 100
          )
        : 0;

    setResult({
      correct: correctAnswers,
      total: totalQuestions,
      score: percentage,
    });

    setSubmitted(true);
    setErrorMessage("");

    localStorage.setItem(
      "assessmentScore",
      percentage
    );

    localStorage.setItem(
      "assessmentCorrect",
      correctAnswers
    );

    localStorage.setItem(
      "assessmentTotal",
      totalQuestions
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <h2>Loading Assessment...</h2>
        </div>
      </div>
    );
  }

  if (
    errorMessage &&
    questions.length === 0
  ) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <div className="assessment-header">
            <p className="admin-label">
              CAREERLENS ASSESSMENT
            </p>

            <h1>Technical Assessment</h1>

            <p>{errorMessage}</p>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate("/dashboard")
              }
              style={{ marginTop: "20px" }}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <div className="assessment-header">
            <p className="admin-label">
              CAREERLENS ASSESSMENT
            </p>

            <h1>Technical Assessment</h1>

            <p>
              No assessment questions are
              currently available for{" "}
              <strong>
                {selectedCareer}
              </strong>.
            </p>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate("/dashboard")
              }
              style={{ marginTop: "20px" }}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-page">
      <div className="assessment-container">

        {!submitted && (
          <>
            <div className="assessment-header">
              <p className="admin-label">
                CAREERLENS ASSESSMENT
              </p>

              <h1>Technical Assessment</h1>

              <p>
                Career Path:{" "}
                <strong>
                  {selectedCareer}
                </strong>
              </p>

              <p>
                Answer all {questions.length}{" "}
                {questions.length === 1
                  ? "question"
                  : "questions"}{" "}
                to calculate your technical
                assessment score.
              </p>
            </div>

            {questions.map(
              (question, questionIndex) => (
                <div
                  className="assessment-question-card"
                  key={question._id}
                >
                  <div className="assessment-question-top">
                    <span>
                      Question{" "}
                      {questionIndex + 1}
                    </span>

                    <span>
                      {question.difficulty ||
                        "Medium"}
                    </span>
                  </div>

                  <h3>
                    {question.question}
                  </h3>

                  <div className="assessment-options">
                    {question.options.map(
                      (
                        option,
                        optionIndex
                      ) => {
                        const isSelected =
                          answers[
                            question._id
                          ] === optionIndex;

                        return (
                          <button
                            key={optionIndex}
                            type="button"
                            className={`assessment-option ${
                              isSelected
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswer(
                                question._id,
                                optionIndex
                              )
                            }
                          >
                            <span>
                              {String.fromCharCode(
                                65 + optionIndex
                              )}
                            </span>

                            <div>
                              {option}
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )
            )}

            {errorMessage && (
              <p className="message">
                {errorMessage}
              </p>
            )}

            <button
              className="primary-btn"
              onClick={handleSubmit}
            >
              Submit Assessment
            </button>
          </>
        )}

        {submitted && (
          <>
            <div className="assessment-header">
              <p className="admin-label">
                CAREERLENS ASSESSMENT
              </p>

              <h1>
                Assessment Completed
              </h1>

              <p>
                Your technical assessment
                for{" "}
                <strong>
                  {selectedCareer}
                </strong>{" "}
                is complete.
              </p>
            </div>

            <div className="assessment-result-card">
              <p className="admin-label">
                YOUR RESULT
              </p>

              <h2>
                Technical Assessment Score
              </h2>

              <div className="assessment-score">
                {result.score}%
              </div>

              <p>
                You answered{" "}
                <strong>
                  {result.correct}
                </strong>{" "}
                out of{" "}
                <strong>
                  {result.total}
                </strong>{" "}
                questions correctly.
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  navigate("/final-result")
                }
              >
                View Final Readiness →
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Assessment;

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function AIAssistant() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const career =
    localStorage.getItem("selectedCareer") ||
    "Career not selected";

  const skillScore = Number(
    localStorage.getItem("readinessScore") || 0
  );

  const assessmentScore = Number(
    localStorage.getItem("assessmentScore") || 0
  );

  const finalScore = Number(
    localStorage.getItem("finalReadinessScore") || 0
  );

  const selectedSkills = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("selectedSkills") || "[]"
      );
    } catch {
      return [];
    }
  }, []);

  const missingSkills = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("missingSkills") || "[]"
      );
    } catch {
      return [];
    }
  }, []);

  const getReadinessLevel = (score) => {
    if (score >= 80) return "Highly Ready";
    if (score >= 60) return "Intermediate";
    if (score >= 40) return "Developing";

    return "Beginner";
  };

  const readinessLevel =
    getReadinessLevel(finalScore);

  const normalizeMarkdown = (text = "") => {
    return text
      // Convert literal \n into actual new lines
      .replace(/\\n/g, "\n")

      // Remove escaping from Markdown symbols
      .replace(
        /\\([#*_`~>+-])/g,
        "$1"
      )

      // Clean excessive blank lines
      .replace(/\n{3,}/g, "\n\n")

      .trim();
  };

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",

      text: `Hi ${user?.name || "there"}! 👋

I'm your **CareerLens AI Career Assistant**.

I can use your career choice, skill gaps and assessment scores to give you personalized career guidance.

What would you like help with?`,
    },
  ]);

  const [loading, setLoading] =
    useState(false);

  const suggestions = [
    "What should I learn next?",
    "Create a 30-day learning plan",
    "Recommend a project for my skill gaps",
    "How can I improve my readiness score?",
  ];

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (
    customMessage = ""
  ) => {
    const messageText = (
      customMessage || input
    ).trim();

    if (!messageText || loading) {
      return;
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        text: messageText,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/chat",
        {
          message: messageText,

          context: {
            career,
            skillScore,
            assessmentScore,
            finalScore,
            readinessLevel,
            selectedSkills,
            missingSkills,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiReply =
        response.data?.reply ||
        "I could not generate guidance right now.";

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text: aiReply,
        },
      ]);
    } catch (error) {
      console.error(
        "AI Assistant Error:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong while contacting the AI assistant.";

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text: `⚠️ ${errorMessage}`,
        },
      ]);

      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  };

  return (
    <div className="ai-page">
      <div className="ai-shell">

        {/* SIDEBAR */}
        <aside className="ai-sidebar">

          <div className="ai-brand">
            <div className="ai-brand-icon">
              ✦
            </div>

            <div>
              <h2>CareerLens AI</h2>

              <p>
                Personal Career Assistant
              </p>
            </div>
          </div>

          <div className="ai-profile-card">

            <span className="ai-profile-label">
              TARGET CAREER
            </span>

            <h3 className="ai-career">
              {career}
            </h3>

            <div className="ai-score-row">

              <div className="ai-score-item">

                <span className="ai-score-value">
                  {skillScore}%
                </span>

                <span className="ai-score-caption">
                  Skills
                </span>

              </div>

              <div className="ai-score-item">

                <span className="ai-score-value">
                  {assessmentScore}%
                </span>

                <span className="ai-score-caption">
                  Technical
                </span>

              </div>

              <div className="ai-score-item">

                <span className="ai-score-value">
                  {finalScore}%
                </span>

                <span className="ai-score-caption">
                  Final
                </span>

              </div>

            </div>

            <div className="ai-readiness">
              {readinessLevel}
            </div>

          </div>

          <div className="ai-gap-section">

            <h4>
              Skills to Improve
            </h4>

            <div className="ai-gap-list">

              {missingSkills.length > 0 ? (
                missingSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="ai-gap-chip"
                    >
                      {skill}
                    </span>
                  )
                )
              ) : (
                <p className="ai-no-gaps">
                  No major skill gaps
                  recorded.
                </p>
              )}

            </div>

          </div>

          <button
            className="ai-back-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Back to Dashboard
          </button>

        </aside>


        {/* CHAT AREA */}
        <main className="ai-chat-panel">

          <header className="ai-chat-header">

            <div>

              <h1>
                AI Career Assistant
              </h1>

              <p>
                Personalized guidance based
                on your CareerLens assessment
              </p>

            </div>

            <div className="ai-status">

              <span className="ai-status-dot">
              </span>

              AI Online

            </div>

          </header>


          {/* MESSAGES */}
          <div className="ai-messages">

            {messages.map(
              (message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`ai-message-row ${message.role}`}
                >

                  {message.role ===
                    "assistant" && (
                    <div className="ai-avatar">
                      ✦
                    </div>
                  )}

                  <div className="ai-message-content">

                    <span className="ai-message-label">

                      {message.role ===
                      "assistant"
                        ? "CareerLens AI"
                        : "You"}

                    </span>

                    <div className="ai-bubble">

                      {message.role ===
                      "assistant" ? (
                        <ReactMarkdown>
                          {normalizeMarkdown(
                            message.text
                          )}
                        </ReactMarkdown>
                      ) : (
                        <p>
                          {message.text}
                        </p>
                      )}

                    </div>

                  </div>

                </div>
              )
            )}


            {/* TYPING INDICATOR */}
            {loading && (

              <div className="ai-message-row assistant">

                <div className="ai-avatar">
                  ✦
                </div>

                <div className="ai-message-content">

                  <span className="ai-message-label">
                    CareerLens AI
                  </span>

                  <div className="ai-bubble ai-typing">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>

              </div>

            )}

            <div ref={messagesEndRef}>
            </div>

          </div>


          {/* BOTTOM AREA */}
          <div className="ai-bottom">

            <div className="ai-suggestions">

              {suggestions.map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() =>
                      sendMessage(
                        suggestion
                      )
                    }
                    disabled={loading}
                  >
                    {suggestion}
                  </button>
                )
              )}

            </div>


            <div className="ai-composer">

              <textarea
                value={input}
                onChange={(event) =>
                  setInput(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                placeholder="Ask CareerLens AI anything about your career..."
                rows="1"
                disabled={loading}
              />


              <button
                className="ai-send-btn"
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  !input.trim() ||
                  loading
                }
              >

                {loading
                  ? "Thinking..."
                  : "Send ➜"}

              </button>

            </div>


            <p className="ai-disclaimer">
              AI guidance is personalized
              using your CareerLens
              assessment data.
            </p>

          </div>

        </main>

      </div>
    </div>
  );
}

export default AIAssistant;
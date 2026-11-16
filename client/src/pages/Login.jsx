
import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await API.post(
        "/api/auth/login",
        formData
      );

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save logged-in user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Redirect according to role
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="logo">
          CareerLens
        </h1>

        <p className="subtitle">
          Discover your career readiness
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;

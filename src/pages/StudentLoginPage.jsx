// src/pages/StudentLoginPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";
import { AuthContext } from "../context/AuthContext";
import { useSimpleCaptcha } from "../hooks/useSimpleCaptcha";

const StudentLoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { captcha, input, setInput, regenerate, isValid } = useSimpleCaptcha();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      setError("Captcha incorrect. Please try again.");
      regenerate();
      return;
    }

    const { success, error: loginError } = await login(form);
    
    if (success) {
      navigate("/student");
    } else {
      setError(loginError || "Login failed");
    }
  };

  return (
    <div className="login-page split-layout">
      {/* Left side: logo + title */}
      <div className="login-hero">
        <div className="login-hero-inner">
          <div className="login-hero-icon">
            {/* simple trophy icon using emoji or you can replace with img */}
            🏆
          </div>
          <h1 className="login-hero-title">
            Student Achievement
            <br />
            Management System
          </h1>
          <p className="login-hero-subtitle">
            Track academic, co‑curricular and sports achievements in one place.
          </p>
        </div>
      </div>

      {/* Right side: card */}
      <div className="login-card">
        <h2 className="login-title">Student Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Registration Number
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <div className="password-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
          </label>

          <div className="captcha-section">
            <div className="captcha-header">
              <span className="captcha-label">Captcha</span>
              <button
                type="button"
                className="captcha-refresh-btn"
                onClick={regenerate}
              >
                Refresh
              </button>
            </div>
            <div className="captcha-display">{captcha}</div>
            <input
              className="captcha-input"
              placeholder="Enter the text shown above"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn login-submit-btn">
            Login
          </button>
        </form>

        <div className="login-footer-links">
          <span>Are you an admin?</span>
          <Link to="/login/admin" className="login-link">
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;

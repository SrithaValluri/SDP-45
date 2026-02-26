// src/pages/AdminLoginPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";
import { AuthContext } from "../context/AuthContext";
import { useSimpleCaptcha } from "../hooks/useSimpleCaptcha";

const AdminLoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { captcha, input, setInput, regenerate, isValid } = useSimpleCaptcha();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      setError("Captcha incorrect. Please try again.");
      regenerate();
      return;
    }

    if (form.username !== "admin") {
      setError('Use username "admin" for admin login.');
      return;
    }

    login(form);
    navigate("/admin");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          {/* Captcha block */}
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
          <span>Are you a student? </span>
          <Link to="/login/student" className="login-link">
            Login as Student
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

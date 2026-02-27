// src/pages/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-shell">
      <header className="login-header">
        <div className="login-header-left">
          <div className="login-logo-circle">SA</div>
          <div>
            <h1 className="login-app-title">Student Achievement Portal</h1>
            <p className="login-app-subtitle">
              Choose how you want to sign in.
            </p>
          </div>
        </div>
      </header>

      <main className="login-main role-select-main">
        <div className="role-card">
          <h2>Login as Student</h2>
          <p>Access your personal achievement dashboard.</p>
          <button
            className="primary-btn"
            onClick={() => navigate("/login/student")}
          >
            Continue as Student
          </button>
        </div>

        <div className="role-card">
          <h2>Login as Admin</h2>
          <p>Verify and manage student achievements.</p>
          <button
            className="secondary-btn"
            onClick={() => navigate("/login/admin")}
          >
            Continue as Admin
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

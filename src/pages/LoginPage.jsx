import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
    if (form.username === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Student Achievement Platform</h2>
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
          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>
        <p className="login-hint">Use username "admin" for admin view.</p>
      </div>
    </div>
  );
};

export default LoginPage;

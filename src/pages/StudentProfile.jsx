// src/pages/StudentProfile.jsx
import React, { useContext, useEffect, useState } from "react";
import "../styles/Forms.css";
import { AuthContext } from "../context/AuthContext";

const STORAGE_KEY = "sap_student_profile";

const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
  name: "",
  regNo: "",
  department: "",
  email: ""
});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {}
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    alert("Profile saved.");
  };

  const displayOrPlaceholder = (value) =>
    value && value.trim() !== "" ? value : "Not provided";

  return (
    <div className="page-container">
      <h2>Profile</h2>

      <div className="profile-shell">
        <div className="profile-layout">
          {/* Left: form */}
          <form className="form profile-card" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="field-label">
                Name
                <div className="field-with-icon">
                  <span className="field-icon"></span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </label>
              <label className="field-label">
                Registration No
                <div className="field-with-icon">
                  <span className="field-icon"></span>
                  <input
                    name="regNo"
                    value={form.regNo}
                    onChange={handleChange}
                    placeholder="Enter your registration ID"
                  />
                </div>
              </label>
            </div>

            <div className="form-row">
              <label className="field-label">
                Department
                <div className="field-with-icon">
                  <span className="field-icon"></span>
                  <input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Enter your department"
                  />
                </div>
              </label>
              <label className="field-label">
                Email
                <div className="field-with-icon">
                  <span className="field-icon"></span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your university email"
                  />
                </div>
              </label>
            </div>

            <div className="profile-actions">
              <button type="submit" className="primary-btn">
                Save Changes
              </button>
            </div>
          </form>

          {/* Right: preview */}
          <div className="profile-card profile-preview">
            <div className="profile-avatar">
              <span className="avatar-circle">
                {form.name ? form.name.charAt(0).toUpperCase() : "S"}
              </span>
            </div>
            <h3 className="profile-preview-title">Profile Preview</h3>

            <div className="profile-preview-body">
              <p>
                <strong>Name:</strong> {displayOrPlaceholder(form.name)}
              </p>
              <p>
                <strong>Reg No:</strong> {displayOrPlaceholder(form.regNo)}
              </p>
              <p>
                <strong>Department:</strong>{" "}
                {displayOrPlaceholder(form.department)}
              </p>
              <p>
                <strong>Email:</strong> {displayOrPlaceholder(form.email)}
              </p>
              <p className="profile-note"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

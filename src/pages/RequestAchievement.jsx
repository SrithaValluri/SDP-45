// src/pages/RequestAchievement.jsx
import React, { useState, useContext } from "react";
import "../styles/Forms.css";
import { AuthContext } from "../context/AuthContext";
import { AchievementContext } from "../context/AchievementContext";

const RequestAchievement = () => {
  const { user } = useContext(AuthContext);
  const { addAchievementForStudent } = useContext(AchievementContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    studentId: user?.username || "",
    studentName: user?.name || "",
    title: "",
    eventName: "",
    category: "Technical",
    level: "College",
    date: "",
    description: "",
    certificateUrl: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("sap_token");
      const response = await fetch("http://localhost:2026/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const url = await response.text();
        setForm((prev) => ({ ...prev, certificateUrl: url }));
        alert("Photo uploaded successfully!");
      } else {
        alert("Failed to upload photo.");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      alert("Please wait for the photo to finish uploading.");
      return;
    }
    const result = await addAchievementForStudent(form);
    if (result.success) {
      alert("Achievement request submitted! Waiting for Admin approval.");
      setForm({
        ...form,
        title: "",
        eventName: "",
        category: "Technical",
        level: "College",
        date: "",
        description: "",
        certificateUrl: ""
      });
    } else {
      alert("Failed to submit request.");
    }
  };

  return (
    <div className="page-container">
      <h2>Request Achievement Approval</h2>
      <p className="page-subtitle">Submit your achievements to have them verified and added to your profile.</p>
      
      <form className="form" onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <div className="form-row">
          <label>
            Registration Number
            <input name="studentId" value={form.studentId} disabled className="disabled-input" />
          </label>
          <label>
            Student Name
            <input name="studentName" value={form.studentName} disabled className="disabled-input" />
          </label>
        </div>

        <div className="form-row">
          <label>
            Achievement Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. 1st Place in Hackathon"
              required
            />
          </label>
          <label>
            Event Name
            <input
              name="eventName"
              value={form.eventName}
              onChange={handleChange}
              placeholder="e.g. Annual Tech Fest 2025"
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="Technical">Technical</option>
              <option value="Cocurricular">Co-curricular</option>
              <option value="Sports">Sports</option>
              <option value="Social">Social / Volunteer</option>
            </select>
          </label>
          <label>
            Level
            <select name="level" value={form.level} onChange={handleChange}>
              <option value="College">College</option>
              <option value="Inter-College">Inter-College</option>
              <option value="State">State</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Date of Achievement
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Upload Certificate Photo
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
        </div>

        {form.certificateUrl && (
          <div className="upload-preview" style={{ marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#059669" }}>✓ Photo selected: </span>
            <a href={form.certificateUrl} target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", textDecoration: "underline" }}>View Photo</a>
          </div>
        )}

        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell us more about your achievement..."
          />
        </label>

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Uploading Photo..." : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
};

export default RequestAchievement;

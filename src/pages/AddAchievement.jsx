// src/pages/AddAchievement.jsx  (ADMIN)
import React, { useState, useContext } from "react";
import "../styles/Forms.css";
import { AchievementContext } from "../context/AchievementContext";

const AddAchievement = () => {
  const { addAchievementForStudent } = useContext(AchievementContext);
  const [form, setForm] = useState({
    studentId: "",
    studentName: "",
    title: "",
    eventName: "",
    category: "",
    level: "",
    date: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.studentId || !form.studentName) {
      alert("Please enter student ID and name before submitting.");
      return;
    }

    addAchievementForStudent(form);
    alert("Achievement created for student.");

    setForm({
      studentId: "",
      studentName: "",
      studentEmail: "", 
      title: "",
      eventName: "",
      category: "",
      level: "",
      date: "",
      description: ""
    });
  };

  return (
    <div className="page-container">
      <h2>Add Achievement (Admin)</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Student details first */}
        <div className="form-row">
          <label>
            Student Reg No / ID
            <input
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              placeholder="Enter student registration number"
              required
            />
          </label>
          <label>
            Student Name
            <input
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              placeholder="Enter student full name"
              required
            />
          </label>
        </div>

        {/* Achievement details */}
        <div className="form-row">
          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Event Name
            <input
              name="eventName"
              value={form.eventName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Academic">Academic</option>
              <option value="Co-curricular">Co-curricular</option>
              <option value="Sports">Sports</option>
            </select>
          </label>
          <label>
            Level
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="College">College</option>
              <option value="State">State</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="primary-btn">
          Create Achievement
        </button>
      </form>
    </div>
  );
};

export default AddAchievement;

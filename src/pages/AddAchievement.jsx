import React, { useState } from "react";
import "../styles/Forms.css";

const AddAchievement = () => {
  const [form, setForm] = useState({
    title: "",
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
    alert("Achievement submitted (dummy).");
  };

  return (
    <div className="page-container">
      <h2>Add Achievement</h2>
      <form className="form" onSubmit={handleSubmit}>
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
        </div>
        <div className="form-row">
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAchievement;

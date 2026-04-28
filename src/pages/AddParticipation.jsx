// src/pages/AddParticipation.jsx
import React, { useState } from "react";
import "../styles/Forms.css";

const AddParticipation = () => {
  const [form, setForm] = useState({
    studentId: "",
    eventName: "",
    role: "",
    date: "",
    outcome: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("sap_token");
      const response = await fetch("http://localhost:2026/api/participations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          status: "Approved" 
        })
      });

      if (response.ok) {
        alert("Participation recorded successfully!");
        setForm({
          studentId: "",
          eventName: "",
          role: "",
          date: "",
          outcome: ""
        });
      } else {
        alert("Failed to record participation.");
      }
    } catch (err) {
      console.error("Error adding participation:", err);
      alert("Error adding participation. Please check your connection.");
    }
  };

  return (
    <div className="page-container">
      <h2>Add Participation (Admin)</h2>
      <p className="page-subtitle">Record a student's participation in an event or activity.</p>
      
      <form className="form" onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <div className="form-row">
          <label>
            Student Reg No (Registration Number)
            <input
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              placeholder="e.g. 2400030001"
              required
            />
          </label>
          <label>
            Event Name
            <input
              name="eventName"
              value={form.eventName}
              onChange={handleChange}
              placeholder="e.g. Coding Contest, Hackathon"
              required
            />
          </label>
        </div>
        
        <div className="form-row">
          <label>
            Role / Contribution
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Participant, Speaker, Captain"
              required
            />
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
          Outcome / Remarks
          <input
            name="outcome"
            value={form.outcome}
            onChange={handleChange}
            placeholder="e.g. Top 10, Won Gold, Participation Only"
          />
        </label>

        <button type="submit" className="primary-btn">
          Add Participation
        </button>
      </form>
    </div>
  );
};

export default AddParticipation;

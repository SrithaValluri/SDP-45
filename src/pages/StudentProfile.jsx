import React, { useContext, useState } from "react";
import "../styles/Forms.css";
import { AuthContext } from "../context/AuthContext";

const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: user?.name || "",
    regNo: "",
    department: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (dummy).");
  };

  return (
    <div className="page-container">
      <h2>Profile</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Registration No
            <input
              name="regNo"
              value={form.regNo}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Department
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="primary-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;

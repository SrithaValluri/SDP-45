// src/pages/AddStudents.jsx
import React, { useState } from "react";
import "../styles/Forms.css";

const initialStudents = [
  { id: 1, name: "Raj", regNo: "2400030001", department: "CSE", year: "2" },
  { id: 2, name: "Kiran", regNo: "2400030002", department: "ECE", year: "2" }
];

const AddStudents = () => {
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState({
    name: "",
    regNo: "",
    department: "",
    year: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      ...form
    };
    setStudents((prev) => [...prev, newStudent]);
    setForm({ name: "", regNo: "", department: "", year: "" });
  };

  return (
    <div className="page-container">
      <h2>Add Students</h2>

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
              required
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
              placeholder="CSE / ECE / EEE"
            />
          </label>
          <label>
            Year
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="1 / 2 / 3 / 4"
            />
          </label>
        </div>
        <button type="submit" className="primary-btn">
          Add Student
        </button>
      </form>

      <h3 style={{ marginTop: "1.5rem" }}>Student List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.regNo}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddStudents;

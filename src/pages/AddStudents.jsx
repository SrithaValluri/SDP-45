// src/pages/AddStudents.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/Forms.css";
import "../styles/BulkUpload.css";



const AddStudents = () => {
  /* ─── single-add state ─── */
  const [form, setForm] = useState({
    name: "", regNo: "", password: "", department: "", year: "", email: "",
  });

  /* ─── student list state ─── */
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ─── email edit state ─── */
  const [editingEmailId, setEditingEmailId] = useState(null);
  const [editingEmailValue, setEditingEmailValue] = useState("");

  /* ─── bulk upload state ─── */
  const [csvFile, setCsvFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResult, setBulkResult] = useState(null); // BulkUploadResultDto
  const fileInputRef = useRef(null);

  /* ─── active tab ─── */
  const [activeTab, setActiveTab] = useState("single"); // "single" | "bulk"

  /* ════════════════════ DATA FETCHING ════════════════════ */
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("sap_token");
      const res = await fetch("http://localhost:2026/api/admin/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setStudents(await res.json());
      else setError("Failed to fetch students");
    } catch {
      setError("Network error fetching students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  /* ════════════════════ SINGLE ADD ════════════════════ */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("sap_token");
      const res = await fetch("http://localhost:2026/api/admin/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: form.regNo,
          password: form.password,
          name: form.name,
          department: form.department,
          year: form.year,
          email: form.email,
        }),
      });
      if (res.ok) {
        setForm({ name: "", regNo: "", password: "", department: "", year: "", email: "" });
        fetchStudents();
        alert("Student added successfully!");
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to add student");
      }
    } catch {
      alert("Error adding student. Please try again.");
    }
  };

  /* ════════════════════ EMAIL EDIT ════════════════════ */
  const handleSaveEmail = async (studentId) => {
    if (!editingEmailValue || !editingEmailValue.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const token = localStorage.getItem("sap_token");
      const res = await fetch(
        `http://localhost:2026/api/admin/students/${studentId}/email?email=${encodeURIComponent(editingEmailValue)}`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        alert("Email updated successfully!");
        setEditingEmailId(null);
        setEditingEmailValue("");
        fetchStudents();
      } else {
        alert("Failed to update email.");
      }
    } catch {
      alert("Network error. Please try again.");
    }
  };

  /* ════════════════════ BULK UPLOAD ════════════════════ */

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) {
      setCsvFile(file);
      setBulkResult(null);
    } else {
      alert("Please drop a .csv file.");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      setBulkResult(null);
    }
  };

  const handleBulkUpload = async () => {
    if (!csvFile) { alert("Please select a CSV file first."); return; }
    setBulkLoading(true);
    setBulkResult(null);
    try {
      const token = localStorage.getItem("sap_token");
      const formData = new FormData();
      formData.append("file", csvFile);
      const res = await fetch("http://localhost:2026/api/admin/students/bulk", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setBulkResult(data);
        fetchStudents();
        setCsvFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.message || "Bulk upload failed. Please check the file format.");
      }
    } catch {
      alert("Network error during bulk upload.");
    } finally {
      setBulkLoading(false);
    }
  };

  /* ════════════════════ RENDER ════════════════════ */
  return (
    <div className="page-container">
      <div className="as-header">
        <h2 className="as-title">Manage Students</h2>
        <p className="as-subtitle">Add students individually or upload a CSV for bulk registration.</p>
      </div>

      {/* ── Tab switcher ── */}
      <div className="as-tabs">
        <button
          className={`as-tab ${activeTab === "single" ? "as-tab--active" : ""}`}
          onClick={() => setActiveTab("single")}
        >
          ➕ Add Single Student
        </button>
        <button
          className={`as-tab ${activeTab === "bulk" ? "as-tab--active" : ""}`}
          onClick={() => setActiveTab("bulk")}
        >
          📋 Bulk Upload via CSV
        </button>
      </div>

      {/* ══════════ SINGLE ADD FORM ══════════ */}
      {activeTab === "single" && (
        <div className="as-card">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Name
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" />
              </label>
              <label>
                Registration No (Username)
                <input name="regNo" value={form.regNo} onChange={handleChange} required placeholder="22CSEXXXX" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Login Password
                <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Min 6 chars" />
              </label>
              <label>
                Department
                <input name="department" value={form.department} onChange={handleChange} placeholder="CSE / ECE / EEE" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Year
                <input name="year" value={form.year} onChange={handleChange} placeholder="1 / 2 / 3 / 4" />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="student@example.com" />
              </label>
            </div>
            <button type="submit" className="primary-btn">Add Student</button>
          </form>
        </div>
      )}

      {/* ══════════ BULK UPLOAD ══════════ */}
      {activeTab === "bulk" && (
        <div className="as-card">

          {/* Drag-and-drop zone */}
          <div
            className={`bulk-dropzone ${dragOver ? "bulk-dropzone--over" : ""} ${csvFile ? "bulk-dropzone--has-file" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            {csvFile ? (
              <>
                <span className="bulk-dropzone__icon">✅</span>
                <p className="bulk-dropzone__text"><strong>{csvFile.name}</strong></p>
                <p className="bulk-dropzone__hint">Click to change file</p>
              </>
            ) : (
              <>
                <span className="bulk-dropzone__icon">📂</span>
                <p className="bulk-dropzone__text">Drag &amp; drop your CSV here</p>
                <p className="bulk-dropzone__hint">or click to browse — .csv files only</p>
              </>
            )}
          </div>

          {/* Upload button */}
          <button
            className={`primary-btn bulk-upload-btn ${bulkLoading ? "bulk-upload-btn--loading" : ""}`}
            onClick={handleBulkUpload}
            disabled={!csvFile || bulkLoading}
          >
            {bulkLoading ? "Uploading…" : "Upload CSV"}
          </button>

          {/* CSV format hint */}
          <div className="bulk-format-hint">
            <strong>Expected CSV format:</strong>
            <pre className="bulk-format-pre">name,regNo,password,department,year,email</pre>
          </div>

          {/* ── Results summary ── */}
          {bulkResult && (
            <div className="bulk-results">
              <div className="bulk-results__summary">
                <div className="bulk-stat bulk-stat--total">
                  <span className="bulk-stat__num">{bulkResult.totalRequested}</span>
                  <span className="bulk-stat__label">Total Rows</span>
                </div>
                <div className="bulk-stat bulk-stat--success">
                  <span className="bulk-stat__num">{bulkResult.successCount}</span>
                  <span className="bulk-stat__label">Added ✅</span>
                </div>
                <div className="bulk-stat bulk-stat--fail">
                  <span className="bulk-stat__num">{bulkResult.failureCount}</span>
                  <span className="bulk-stat__label">Failed ❌</span>
                </div>
              </div>

              <h4 className="bulk-results__heading">Row-by-Row Results</h4>
              <div className="bulk-results__table-wrap">
                <table className="table bulk-results__table">
                  <thead>
                    <tr>
                      <th>Row</th>
                      <th>Reg No</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkResult.results.map((r) => (
                      <tr key={r.rowNumber} className={r.status === "SUCCESS" ? "row-success" : "row-fail"}>
                        <td>{r.rowNumber}</td>
                        <td>{r.username || "—"}</td>
                        <td>{r.name || "—"}</td>
                        <td>
                          <span className={`bulk-badge ${r.status === "SUCCESS" ? "bulk-badge--success" : "bulk-badge--fail"}`}>
                            {r.status}
                          </span>
                        </td>
                        <td>{r.reason || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════ STUDENT LIST ══════════ */}
      <h3 style={{ marginTop: "2rem" }}>Existing Student List</h3>
      {loading ? (
        <p>Loading students…</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.username}</td>
                <td>{s.name}</td>
                <td>{s.department || "—"}</td>
                <td>{s.year || "—"}</td>
                <td>
                  {editingEmailId === s.id ? (
                    <input
                      type="email"
                      value={editingEmailValue}
                      onChange={(e) => setEditingEmailValue(e.target.value)}
                      placeholder="Enter email"
                      style={{ width: "180px" }}
                    />
                  ) : (
                    s.email || <span style={{ color: "#aaa" }}>Not set</span>
                  )}
                </td>
                <td>
                  {editingEmailId === s.id ? (
                    <>
                      <button className="primary-btn" style={{ padding: "4px 10px", marginRight: "6px" }} onClick={() => handleSaveEmail(s.id)}>Save</button>
                      <button style={{ padding: "4px 10px" }} onClick={() => { setEditingEmailId(null); setEditingEmailValue(""); }}>Cancel</button>
                    </>
                  ) : (
                    <button className="primary-btn" style={{ padding: "4px 10px" }} onClick={() => { setEditingEmailId(s.id); setEditingEmailValue(s.email || ""); }}>
                      {s.email ? "Edit Email" : "Add Email"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddStudents;

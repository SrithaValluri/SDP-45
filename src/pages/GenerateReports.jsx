import React, { useState } from "react";
import "../styles/Forms.css";
import ReportCard from "../components/ReportCard";

const GenerateReports = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    department: ""
  });
  const [reports, setReports] = useState([]);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setReports([
      {
        id: 1,
        title: "Department-wise Achievement Summary",
        fromDate: filters.fromDate || "2025-01-01",
        toDate: filters.toDate || "2025-12-31",
        summary: "total 450 achievements across all departments."
      }
    ]);
  };

  return (
    <div className="page-container">
      <h2>Generate Reports</h2>
      <form className="form" onSubmit={handleGenerate}>
        <div className="form-row">
          <label>
            From Date
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleChange}
            />
          </label>
          <label>
            To Date
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleChange}
            />
          </label>
        </div>
        <label>
          Department
          <input
            name="department"
            value={filters.department}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="primary-btn">
          Generate
        </button>
      </form>

      <div className="card-grid">
        {reports.map((r) => (
          <ReportCard key={r.id} report={r} />
        ))}
      </div>
    </div>
  );
};

export default GenerateReports;

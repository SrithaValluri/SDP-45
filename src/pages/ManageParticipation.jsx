// src/pages/ManageParticipation.jsx
import React, { useState, useEffect } from "react";
import "../styles/Forms.css";

const ManageParticipation = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParticipations = async () => {
    try {
      const token = localStorage.getItem("sap_token");
      const response = await fetch("http://localhost:2026/api/participations", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRows(data);
      }
    } catch (err) {
      console.error("Error fetching participations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipations();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("sap_token");
      const response = await fetch(`http://localhost:2026/api/participations/${id}/status?status=${status}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchParticipations();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <div className="page-container"><p>Loading participations...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Manage Participation</h2>
        <button 
          className="primary-btn" 
          onClick={() => window.location.href='/admin/add-participation'}
          style={{ width: "auto", padding: "8px 16px" }}
        >
          + Add New Participation
        </button>
      </div>
      <table className="table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Event</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.studentId}</td>
              <td>{r.eventName}</td>
              <td>{r.status || "Pending"}</td>
              <td>
                <select
                  value={r.status || "Pending"}
                  onChange={(e) => handleStatusChange(r.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageParticipation;

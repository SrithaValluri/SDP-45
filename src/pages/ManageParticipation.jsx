import React, { useState } from "react";
import "../styles/Forms.css";

const initialData = [
  { id: 1, student: "John Doe", event: "Hackathon", status: "Pending" },
  { id: 2, student: "Alice", event: "Paper Presentation", status: "Approved" }
];

const ManageParticipation = () => {
  const [rows, setRows] = useState(initialData);

  const handleStatusChange = (id, status) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="page-container">
      <h2>Manage Participation</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Event</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.student}</td>
              <td>{r.event}</td>
              <td>{r.status}</td>
              <td>
                <select
                  value={r.status}
                  onChange={(e) => handleStatusChange(r.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
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

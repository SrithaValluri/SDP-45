// src/pages/ViewAchievements.jsx
import React, { useContext, useState } from "react";
import "../styles/Forms.css";
import { AchievementContext } from "../context/AchievementContext";

// Viewer Modal for Admins to view certificate and approve/reject
const AdminCertificateModal = ({ isOpen, onClose, achievement, updateStatus }) => {
  if (!isOpen || !achievement) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content certificate-viewer" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="certificate-header">
          <h3>Review Achievement: {achievement.title}</h3>
          <p>Student: {achievement.studentName} ({achievement.studentId})</p>
          <p>Category: {achievement.category} | Level: {achievement.level}</p>
        </div>
        <div className="certificate-body" style={{ width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {achievement.certificateUrl ? (
            achievement.certificateUrl.toLowerCase().endsWith(".pdf") ? (
              <iframe 
                src={achievement.certificateUrl} 
                title="Certificate PDF"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <img 
                src={achievement.certificateUrl} 
                alt="Certificate" 
                className="certificate-image-preview" 
                onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Certificate+Preview+Unavailable"; }}
              />
            )
          ) : (
            <div className="no-certificate-placeholder">
              <p>No certificate image available.</p>
            </div>
          )}
        </div>
        <div className="certificate-footer">
          {(achievement.status === "Pending" || !achievement.status) && (
            <>
              <button 
                onClick={() => { updateStatus(achievement.id, "Approved"); onClose(); }} 
                className="primary-btn"
                style={{ backgroundColor: "#059669", color: "white" }}
              >
                Approve
              </button>
              <button 
                onClick={() => { updateStatus(achievement.id, "Rejected"); onClose(); }} 
                className="secondary-btn"
                style={{ backgroundColor: "#dc2626", color: "white", border: "none" }}
              >
                Reject
              </button>
            </>
          )}
          <a 
            href={achievement.certificateUrl || "#"} 
            download={`${achievement.title}_certificate`}
            target="_blank" 
            rel="noreferrer" 
            className="secondary-btn"
            style={{ display: achievement.certificateUrl ? "inline-block" : "none" }}
          >
            Download
          </a>
          <button onClick={onClose} className="secondary-btn">Close</button>
        </div>
      </div>
    </div>
  );
};

const ViewAchievements = () => {
  const { achievements, loading, updateAchievementStatus, deleteAchievement } = useContext(AchievementContext);
  const [filter, setFilter] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const filtered = achievements.filter(
    (a) =>
      a.studentName.toLowerCase().includes(filter.toLowerCase()) ||
      a.studentId.includes(filter) ||
      a.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div className="page-container"><p>Loading achievements...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Student Achievements</h2>
        <input
          type="text"
          placeholder="Search by name, ID or title..."
          className="search-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", width: "300px" }}
        />
      </div>

      <table className="table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Title</th>
            <th>Category</th>
            <th>Level</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No achievements found.</td>
            </tr>
          ) : (
            filtered.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>{a.studentName}</strong>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>{a.studentId}</div>
                </td>
                <td>{a.title}</td>
                <td>{a.category}</td>
                <td>{a.level}</td>
                <td>{a.date}</td>
                <td>
                  <span className={`status-pill status-${(a.status || "Pending").toLowerCase()}`}>
                    {a.status || "Pending"}
                  </span>
                </td>
                <td>
                  {(a.status === "Pending" || !a.status) && (
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <button 
                        onClick={() => setSelectedAchievement(a)}
                        className="primary-btn"
                        style={{ padding: "4px 8px", fontSize: "0.75rem", width: "auto" }}
                      >
                        Review
                      </button>
                    </div>
                  )}
                  <button 
                    onClick={() => setSelectedAchievement(a)}
                    className="secondary-btn"
                    style={{ padding: "4px 8px", fontSize: "0.75rem", width: "auto" }}
                  >
                    View Info
                  </button>
                  <button 
                    onClick={() => deleteAchievement(a.id)}
                    className="secondary-btn"
                    style={{ padding: "4px 8px", fontSize: "0.75rem", width: "auto", backgroundColor: "#374151", color: "white", border: "none", marginLeft: "0.5rem" }}
                  >
                    Delete
                  </button>
                  {a.status === "Approved" && <span style={{ color: "#059669", fontSize: "0.8rem", marginLeft: "0.5rem" }}>Approved ✅</span>}
                  {a.status === "Rejected" && <span style={{ color: "#dc2626", fontSize: "0.8rem" }}>Rejected ❌</span>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <AdminCertificateModal 
        isOpen={!!selectedAchievement} 
        onClose={() => setSelectedAchievement(null)} 
        achievement={selectedAchievement}
        updateStatus={updateAchievementStatus}
      />
    </div>
  );
};

export default ViewAchievements;

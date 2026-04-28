// src/pages/StudentParticipation.jsx
import React, { useState, useEffect, useContext, useMemo } from "react";
import "../styles/Forms.css";
import { AuthContext } from "../context/AuthContext";

const StudentParticipation = () => {
  const { user } = useContext(AuthContext);
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentId = user?.username || user?.regNo;

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
        setParticipations(data);
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

  const myParticipations = useMemo(() => {
    return participations.filter(p => String(p.studentId) === String(studentId));
  }, [participations, studentId]);

  if (loading) return <div className="page-container"><p>Loading participations...</p></div>;

  return (
    <div className="page-container">
      <h2>My Participations</h2>
      <p className="page-subtitle">Events and activities you have participated in.</p>
      
      <table className="table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Event</th>
            <th>Role</th>
            <th>Date</th>
            <th>Outcome</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myParticipations.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No participations found.</td>
            </tr>
          ) : (
            myParticipations.map((p) => (
              <tr key={p.id}>
                <td>{p.eventName}</td>
                <td>{p.role}</td>
                <td>{p.date}</td>
                <td>{p.outcome || "-"}</td>
                <td>
                  <span
                    className={
                      p.status === "Approved"
                        ? "status-pill status-success"
                        : p.status === "Rejected"
                        ? "status-pill status-error"
                        : "status-pill status-pending"
                    }
                  >
                    {p.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentParticipation;

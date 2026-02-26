import React from "react";
import "../styles/Forms.css";

const StudentParticipation = () => {
  const participations = [
    {
      id: 1,
      eventName: "Coding Contest",
      role: "Participant",
      date: "2025-02-28",
      outcome: "Top 10",
      status: "Completed",
    },
    {
      id: 2,
      eventName: "Project Expo",
      role: "Presenter",
      date: "2025-03-10",
      outcome: "Pending Results",
      status: "Active",
    },
  ];

  return (
    <div className="page-container">
      <h2>Participation</h2>
      <table className="table">
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
          {participations.map((p) => (
            <tr key={p.id}>
              <td>{p.eventName}</td>
              <td>{p.role}</td>
              <td>{p.date}</td>
              <td>{p.outcome}</td>
              <td>
                <span
                  className={
                    p.status === "Completed"
                      ? "status-pill status-success"
                      : p.status === "Active"
                      ? "status-pill status-info"
                      : "status-pill status-pending"
                  }
                >
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentParticipation;

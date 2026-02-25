import React from "react";
import "../styles/Forms.css";

const ReportCard = ({ report }) => {
  return (
    <div className="card report-card">
      <h3>{report.title}</h3>
      <p className="card-meta">From: {report.fromDate}</p>
      <p className="card-meta">To: {report.toDate}</p>
      <p className="card-body">{report.summary}</p>
    </div>
  );
};

export default ReportCard;

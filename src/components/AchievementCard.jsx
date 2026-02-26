// src/components/AchievementCard.jsx
import React, { useState } from "react";
import "../styles/Forms.css";

const AchievementCard = ({ achievement }) => {
  const {
    title,
    eventName,
    category,
    level,
    date,
    status,
    description,
    certificateUrl
  } = achievement;

  const [showDetails, setShowDetails] = useState(false);

  const bgClass =
    status === "Approved"
      ? "card-green"
      : status === "Pending"
      ? "card-blue"
      : "card-red";

  const isSports = category === "Sports";
  const isNational = level === "National";

  return (
    <div className={`achievement-card ${bgClass}`}>
      <div className="ac-header">
        <div>
          <h3 className="ac-title">{title}</h3>
          {eventName && <p className="ac-event">{eventName}</p>}
          <div className="ac-tags">
            <span className="ac-tag">{category}</span>
            <span className="ac-tag ac-tag-light">{level}</span>
            {isSports && isNational && (
              <span className="ac-tag ac-tag-highlight">
                Sports • National Level
              </span>
            )}
          </div>
        </div>
        <span
          className={`ac-status ${
            status === "Approved" ? "ac-status-approved" : "ac-status-pending"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="ac-body">
        <p className="ac-meta">Date: {date}</p>
        <p className="ac-desc">{description}</p>
        {showDetails && (
          <div className="ac-details">
            <p>More details about this achievement can go here.</p>
          </div>
        )}
      </div>

      <div className="ac-footer">
        {certificateUrl && (
          <>
            <a
              href={certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              View Certificate
            </a>
            <a href={certificateUrl} download className="secondary-btn">
              Download
            </a>
          </>
        )}
        <button
          type="button"
          className="secondary-btn"
          onClick={() => setShowDetails((v) => !v)}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      </div>
    </div>
  );
};

export default AchievementCard;

import React from "react";
import "../styles/Forms.css";

const AchievementCard = ({ achievement }) => {
  return (
    <div className="card achievement-card">
      <h3>{achievement.title}</h3>
      <p className="card-meta">
        {achievement.category} • {achievement.date}
      </p>
      <p className="card-body">{achievement.description}</p>
      <p className="card-meta">Level: {achievement.level}</p>
    </div>
  );
};

export default AchievementCard;

import React from "react";
import "../styles/Forms.css";
import AchievementCard from "../components/AchievementCard";

const dummyAchievements = [
  {
    id: 1,
    title: "Hackathon Winner",
    category: "Academic",
    level: "National",
    date: "2025-10-10",
    description: "Won first prize in national level hackathon."
  },
  {
    id: 2,
    title: "Inter-college Football",
    category: "Sports",
    level: "College",
    date: "2025-08-05",
    description: "Secured gold medal in football tournament."
  }
];

const ViewAchievements = () => {
  return (
    <div className="page-container">
      <h2>Achievements</h2>
      <div className="card-grid">
        {dummyAchievements.map((a) => (
          <AchievementCard key={a.id} achievement={a} />
        ))}
      </div>
    </div>
  );
};

export default ViewAchievements;

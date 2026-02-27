// src/pages/StudentAchievements.jsx
import React, { useContext, useMemo } from "react";
import "../styles/Forms.css";
import { AchievementContext } from "../context/AchievementContext";
import { AuthContext } from "../context/AuthContext";
import AchievementCard from "../components/AchievementCard";

const StudentAchievements = () => {
  const { achievements } = useContext(AchievementContext);
  const { user } = useContext(AuthContext);

  const studentId = user?.regNo || user?.id || user?.username; 

  const myAchievements = useMemo(
    () =>
      achievements.filter((a) => String(a.studentId) === String(studentId)),
    [achievements, studentId]
  );

  const total = myAchievements.length;

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div>
          <h2>My Achievements</h2>
          <p className="page-subtitle">
            These are the achievements recorded for your registration number.
          </p>
        </div>
        <div className="ach-summary-card">
          <span>Total Achievements</span>
          <strong>{total}</strong>
        </div>
      </div>

      <div className="card-grid" style={{ marginTop: "1rem" }}>
        {myAchievements.length === 0 ? (
          <div className="empty-state">
            <h3>No achievements added yet</h3>
            <p>
              Your achievements will appear here once your admin/faculty adds them. 
            </p>
          </div>
        ) : (
          myAchievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))
        )}
      </div>
    </div>
  );
};

export default StudentAchievements;

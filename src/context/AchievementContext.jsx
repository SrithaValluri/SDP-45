// src/context/AchievementContext.jsx
import React, { createContext, useState } from "react";

export const AchievementContext = createContext();

const initialAchievements = [
  {
    id: 1,
    studentId: "2400030001",
    studentName: "Siva",
    title: "Smart India Hackathon",
    eventName: "Smart India Hackathon 2025",
    category: "Academic",
    level: "National",
    date: "2025-10-10",
    status: "Approved",
    description: "Won first prize in national-level hackathon.",
    certificateUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small/modern-elegant-certificate-template-free-vector.jpg"
  },
  {
    id: 2,
    studentId: "2400030002",
    studentName: "Ananya",
    title: "Inter-college Football",
    eventName: "Inter-college Sports Meet",
    category: "Sports",
    level: "College",
    date: "2025-08-05",
    status: "Approved",
    description: "Gold medal in inter-college football tournament.",
    certificateUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small/modern-elegant-certificate-template-free-vector.jpg"
  }
];

export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(initialAchievements);

  // Admin adds achievement for a student (starts as Pending)
  const addAchievementForStudent = (data) => {
    const newAchievement = {
      id: achievements.length + 1,
      status: "Pending",
      certificateUrl: "",
      ...data
    };
    setAchievements((prev) => [...prev, newAchievement]);
  };

  // Admin approves / rejects
  const updateAchievementStatus = (id, status) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  return (
    <AchievementContext.Provider
      value={{ achievements, addAchievementForStudent, updateAchievementStatus }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

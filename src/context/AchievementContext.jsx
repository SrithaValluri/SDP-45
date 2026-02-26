// src/context/AchievementContext.jsx
import React, { createContext, useState } from "react";

export const AchievementContext = createContext();

const initialAchievements = [
  {
    id: 1,
    title: "Smart India Hackathon",
    eventName: "Smart India Hackathon 2025",
    category: "Academic",
    level: "National",
    date: "2025-10-10",
    status: "Approved",
    description:
      "Won first prize in a national-level hackathon for AI project.",
    certificateUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small/modern-elegant-certificate-template-free-vector.jpg"
  },
  {
    id: 2,
    title: "Inter-college Football",
    eventName: "Inter-college Sports Meet",
    category: "Sports",
    level: "College",
    date: "2025-08-05",
    status: "Approved",
    description: "Secured gold medal in inter-college football tournament.",
    certificateUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small/modern-elegant-certificate-template-free-vector.jpg"
  }
];

export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(initialAchievements);

  const addAchievement = (data) => {
    const newAchievement = {
      id: achievements.length + 1,
      status: "Pending",
      certificateUrl: "",
      ...data
    };
    setAchievements((prev) => [...prev, newAchievement]);
  };

  return (
    <AchievementContext.Provider value={{ achievements, addAchievement }}>
      {children}
    </AchievementContext.Provider>
  );
};

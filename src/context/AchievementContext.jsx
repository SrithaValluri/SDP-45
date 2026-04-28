import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem("sap_token");
      const response = await fetch("http://localhost:2026/api/achievements", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setAchievements(data);
      }
    } catch (err) {
      console.error("Error fetching achievements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAchievements();
    } else {
      setAchievements([]);
      setLoading(false);
    }
  }, [user]);

  const addAchievementForStudent = async (achievementData) => {
    try {
      const token = localStorage.getItem("sap_token");
      const response = await fetch("http://localhost:2026/api/achievements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...achievementData, status: "Pending" })
      });
      if (response.ok) {
        const newAchievement = await response.json();
        setAchievements((prev) => [...prev, newAchievement]);
        return { success: true };
      } else {
        const errorText = await response.text();
        console.error("Add achievement failed:", errorText);
        return { success: false };
      }
    } catch (err) {
      console.error("Error adding achievement:", err);
      return { success: false };
    }
  };

  const updateAchievementStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("sap_token");
      const url = `http://localhost:2026/api/achievements/${id}/status?status=${status}`;
      console.log(`Calling PUT ${url}`);
      
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchAchievements();
        alert(`Achievement ${status.toLowerCase()} successfully!`);
      } else {
        const msg = await response.text();
        console.error("Update status failed:", response.status, msg);
        alert(`Failed to update status: ${response.status} ${msg || "Forbidden"}`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error connecting to server.");
    }
  };

  const deleteAchievement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;
    try {
      const token = localStorage.getItem("sap_token");
      const response = await fetch(`http://localhost:2026/api/achievements/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        setAchievements((prev) => prev.filter((a) => a.id !== id));
        alert("Achievement deleted successfully!");
      } else {
        const msg = await response.text();
        console.error("Delete failed:", response.status, msg);
        alert(`Failed to delete: ${response.status} ${msg || "Forbidden"}`);
      }
    } catch (err) {
      console.error("Error deleting achievement:", err);
      alert("Error connecting to server.");
    }
  };

  return (
    <AchievementContext.Provider
      value={{ achievements, loading, addAchievementForStudent, updateAchievementStatus, deleteAchievement }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

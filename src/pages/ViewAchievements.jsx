// src/pages/ViewAchievements.jsx
import React, { useState, useContext } from "react";
import "../styles/Forms.css";
import AchievementCard from "../components/AchievementCard";
import { AchievementContext } from "../context/AchievementContext";

const ViewAchievements = () => {
  const { achievements, updateAchievementStatus } = useContext(AchievementContext);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const total = achievements.length;
  const approvedCount = achievements.filter(
    (a) => a.status === "Approved"
  ).length;
  const pendingCount = achievements.filter(
    (a) => a.status === "Pending"
  ).length;

  const filtered = achievements.filter((a) => {
    const catOk = categoryFilter === "All" || a.category === categoryFilter;
    const statusOk = statusFilter === "All" || a.status === statusFilter;
    const searchOk =
      search.trim() === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.eventName || "")
        .toLowerCase()
        .includes(search.toLowerCase());
    return catOk && statusOk && searchOk;
  });

  const handleApprove = (id) => {
    updateAchievementStatus(id, "Approved");
  };

  const handleReject = (id) => {
    updateAchievementStatus(id, "Rejected");
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <h2>Achievements</h2>
        <div className="filters-row">
          <input
            type="text"
            placeholder="Search by title / event"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Co-curricular">Co-curricular</option>
            <option value="Sports">Sports</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="ach-summary-row">
        <div className="ach-summary-card">
          <span>Total</span>
          <strong>{total}</strong>
        </div>
        <div className="ach-summary-card">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </div>
        <div className="ach-summary-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>
      </div>

      <div className="card-grid">
        {filtered.length === 0 ? (
          <p style={{ marginTop: "1rem" }}>No achievements found.</p>
        ) : (
          filtered.map((a) => (
            <AchievementCard
              key={a.id}
              achievement={a}
              showActions
              onApprove={() => handleApprove(a.id)}
              onReject={() => handleReject(a.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ViewAchievements;

import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/AdminDashboard.css";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import ManageParticipation from "./ManageParticipation";
import ViewAchievements from "./ViewAchievements";
import GenerateReports from "./GenerateReports";
import StudentProfile from "./StudentProfile";
import AddStudents from "./AddStudents";

const AdminHome = () => {
  return (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>1200</p>
        </div>
        <div className="stat-card">
          <h3>Total Achievements</h3>
          <p>450</p>
        </div>
        <div className="stat-card">
          <h3>Events This Month</h3>
          <p>8</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p>12</p>
        </div>
      </div>
      <div className="panel-grid">
        <div className="panel">
          <h3>Recent Achievements</h3>
          <ul>
            <li>Hackathon Winner - CSE Dept</li>
            <li>Paper Presentation - AI Conference</li>
            <li>Sports Meet - Gold Medal</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Upcoming Events</h3>
          <ul>
            <li>Coding Contest - 28 Feb</li>
            <li>Project Expo - 10 Mar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="layout">
      <AdminSidebar />
      <div className="layout-main">
        <Header title="Admin Dashboard" />
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/add-students" element={<AddStudents />} />
          <Route path="/manage-participation" element={<ManageParticipation />} />
          <Route path="/view-achievements" element={<ViewAchievements />} />
          <Route path="/reports" element={<GenerateReports />} />
          <Route path="/profile" element={<StudentProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

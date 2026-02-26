// src/pages/AdminDashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/AdminDashboard.css";
import "../styles/Forms.css";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import ManageParticipation from "./ManageParticipation";
import ViewAchievements from "./ViewAchievements";
import GenerateReports from "./GenerateReports";
import StudentProfile from "./StudentProfile";
import AddStudents from "./AddStudents";
import AddAchievement from "./AddAchievement";

const AdminHome = () => {
  return (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>120</p>
        </div>
        <div className="stat-card">
          <h3>Certificates Issued</h3>
          <p>60</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p>8</p>
        </div>
      </div>

      <div className="chart-grid">
        <div className="panel">
          <h3>Department-wise Students</h3>
          <div className="bar-chart">
            <div className="bar-row">
              <span className="bar-label">CSE</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "100%" }} />
              </div>
              <span className="bar-value">120</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">ECE</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "80%" }} />
              </div>
              <span className="bar-value">90</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">MECH</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "50%" }} />
              </div>
              <span className="bar-value">60</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">CIVIL</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "70%" }} />
              </div>
              <span className="bar-value">80</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Certificate Approval Status</h3>
          <div className="donut-wrapper">
            <div className="donut">
              <div className="donut-center" />
            </div>
            <div className="donut-legend">
              <div className="legend-row">
                <span className="legend-color legend-approved" />
                <span>Approved</span>
              </div>
              <div className="legend-row">
                <span className="legend-color legend-pending" />
                <span>Pending</span>
              </div>
            </div>
          </div>
          <p className="donut-text">Approved 60 • Pending 8</p>
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
          <Route path="add-students" element={<AddStudents />} />
          <Route path="add-achievement" element={<AddAchievement />} />
          <Route path="manage-participation" element={<ManageParticipation />} />
          <Route path="view-achievements" element={<ViewAchievements />} />
          <Route path="reports" element={<GenerateReports />} />
          <Route path="profile" element={<StudentProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

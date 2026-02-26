// src/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo"> Admin Dashboard</div>
      <nav className="sidebar-nav">
        <NavLink to="/admin" end className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/add-students" className="sidebar-link">
          Add Students
        </NavLink>
        <NavLink to="/admin/manage-participation" className="sidebar-link">
          Manage Participation
        </NavLink>
        <NavLink to="/admin/view-achievements" className="sidebar-link">
          View Achievements
        </NavLink>
        <NavLink to="/admin/add-achievement" className="sidebar-link">
          Add Achievements   
        </NavLink>
        <NavLink to="/admin/reports" className="sidebar-link">
          Reports
        </NavLink>
        <NavLink to="/admin/profile" className="sidebar-link">
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

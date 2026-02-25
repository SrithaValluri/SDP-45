import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">SRMS Admin</div>
      <nav className="sidebar-nav">
        <NavLink to="/admin" end className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/add-students" className="sidebar-link">
          Add Students
        </NavLink>
        <NavLink to="/manage-participation" className="sidebar-link">
          Manage Participation
        </NavLink>
        <NavLink to="/view-achievements" className="sidebar-link">
          View Achievements
        </NavLink>
        <NavLink to="/reports" className="sidebar-link">
          Reports
        </NavLink>
        <NavLink to="/profile" className="sidebar-link">
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

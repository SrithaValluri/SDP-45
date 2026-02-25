// src/components/StudentSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const StudentSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">SRMS Student</div>
      <nav className="sidebar-nav">
        <NavLink to="/student" end className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/student/schedule" className="sidebar-link">
          Schedule
        </NavLink>
        <NavLink to="/student/events" className="sidebar-link">
          Upcoming Events
        </NavLink>
        <NavLink to="/student/progress" className="sidebar-link">
          Progress
        </NavLink>
        <NavLink to="/student/certificates" className="sidebar-link">
          Certificates
        </NavLink>
        <NavLink to="/profile" className="sidebar-link">
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default StudentSidebar;

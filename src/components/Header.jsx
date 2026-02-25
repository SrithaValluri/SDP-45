import React, { useContext } from "react";
import "./../styles/AdminDashboard.css";
import { AuthContext } from "../context/AuthContext";

const Header = ({ title }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="app-header-left">
        <h1 className="app-title">{title}</h1>
      </div>
      <div className="app-header-right">
        <span className="user-name">Hi, {user?.name}</span>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

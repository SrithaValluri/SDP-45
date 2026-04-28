// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { AchievementProvider } from "./context/AchievementContext";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AchievementProvider>
        <App />
      </AchievementProvider>
    </AuthProvider>
  </React.StrictMode>
);

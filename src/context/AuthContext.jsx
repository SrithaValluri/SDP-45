// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // NEW

  useEffect(() => {
    const stored = localStorage.getItem("sap_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false); // finished checking
  }, []);

  const login = async ({ username, password }) => {
    try {
      const response = await fetch("http://localhost:2026/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      // data contains { token: "...", user: { id: ..., username: ..., role: ... } }
      const newUser = data.user;
      
      setUser(newUser);
      localStorage.setItem("sap_user", JSON.stringify(newUser));
      localStorage.setItem("sap_token", data.token);

      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sap_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

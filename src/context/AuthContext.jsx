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

  const login = ({ username, password }) => {
    const role = username === "admin" ? "admin" : "student";

    if (role === "admin") {
      const newUser = {
        id: 1,
        name: "Admin",
        role: "admin",
        username: "admin"
      };
      setUser(newUser);
      localStorage.setItem("sap_user", JSON.stringify(newUser));
    } else {
      const newUser = {
        id: Date.now(),
        name: username,
        role: "student",
        regNo: username,
        username
      };
      setUser(newUser);
      localStorage.setItem("sap_user", JSON.stringify(newUser));
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

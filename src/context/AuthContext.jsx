import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // user = { id, name, role: "admin" | "student" }

  useEffect(() => {
    const stored = localStorage.getItem("sap_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = ({ username, password }) => {
    // Dummy auth: treat "admin" as admin, others as student.
    const role = username === "admin" ? "admin" : "student";
    const newUser = { id: 1, name: username, role };
    setUser(newUser);
    localStorage.setItem("sap_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sap_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

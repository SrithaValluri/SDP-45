// src/App.jsx
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import StudentLoginPage from "./pages/StudentLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div />;
  }

  if (!user) {
    return <Navigate to="/login/student" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // avoid redirecting from "/" before we know the user
    return <div />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "ADMIN" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/student" replace />
              )
            ) : (
              <Navigate to="/login/student" replace />
            )
          }
        />

        {/* Separate login pages */}
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/student" element={<StudentLoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin layout with sidebar */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Student layout with sidebar */}
        <Route
          path="/student/*"
          element={
            <PrivateRoute role="STUDENT">
              <StudentDashboard />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

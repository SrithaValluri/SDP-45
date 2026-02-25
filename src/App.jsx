import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AddAchievement from "./pages/AddAchievement";
import ManageParticipation from "./pages/ManageParticipation";
import ViewAchievements from "./pages/ViewAchievements";
import StudentProfile from "./pages/StudentProfile";
import GenerateReports from "./pages/GenerateReports";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            user.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/student" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin/*"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/*"
        element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        }
      />

      {/* Fallback pages for direct paths */}
      <Route
        path="/add-achievement"
        element={
          <PrivateRoute role="student">
            <AddAchievement />
          </PrivateRoute>
        }
      />
      <Route
        path="/manage-participation"
        element={
          <PrivateRoute role="admin">
            <ManageParticipation />
          </PrivateRoute>
        }
      />
      <Route
        path="/view-achievements"
        element={
          <PrivateRoute>
            <ViewAchievements />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <StudentProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute role="admin">
            <GenerateReports />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

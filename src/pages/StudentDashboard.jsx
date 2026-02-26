// src/pages/StudentDashboard.jsx
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/StudentDashboard.css";
import "../styles/Forms.css";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import StudentProfile from "./StudentProfile";
import { AchievementContext } from "../context/AchievementContext";

// Schedule page
const Schedule = () => (
  <div className="page-container">
    <h2>Schedule</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Time</th>
          <th>Activity</th>
          <th>Room</th>
          <th>Mentor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monday</td>
          <td>09:00 – 10:00</td>
          <td>Club Activities</td>
          <td>Lab-1</td>
          <td>Dr. Rao</td>
        </tr>
        <tr>
          <td>Monday</td>
          <td>11:00 – 12:00</td>
          <td>Problem Solving</td>
          <td>CS-105</td>
          <td>Mrs. Kavya</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>10:00 – 11:00</td>
          <td>Project Discussion</td>
          <td>CS-301</td>
          <td>Mr. Ramesh</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// Upcoming events page
const UpcomingEvents = () => (
  <div className="page-container">
    <h2>Upcoming Events</h2>
    <div className="card-grid">
      <div className="card">
        <h3>Coding Contest</h3>
        <p className="card-meta">Date: 28 Feb • Venue: Lab-1</p>
        <p className="card-body">
          Intra-college competitive programming contest. Teams of 2–3, 3 hours
          duration.
        </p>
      </div>
      <div className="card">
        <h3>Project Expo</h3>
        <p className="card-meta">Date: 10 Mar • Venue: CSE Block</p>
        <p className="card-body">
          Display your semester projects. Best projects will receive
          certificates and prizes.
        </p>
      </div>
      <div className="card">
        <h3>Technical Workshop</h3>
        <p className="card-meta">Date: 05 Mar • Venue: Seminar Hall</p>
        <p className="card-body">
          Workshop on React and REST APIs for building full‑stack applications.
        </p>
      </div>
    </div>
  </div>
);

// Progress bar small component
const ProgressBar = ({ label, value }) => {
  return (
    <div className="progress-row">
      <div className="progress-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

// Progress page
const ProgressPage = () => (
  <div className="page-container">
    <h2>Progress</h2>

    <div className="card">
      <h3>Overall Achievement Progress</h3>
      <ProgressBar label="Academic Achievements" value={80} />
      <ProgressBar label="Co-curricular" value={60} />
      <ProgressBar label="Sports" value={40} />
      <ProgressBar label="Certificates Uploaded" value={70} />
    </div>

    <div className="card-grid" style={{ marginTop: "1rem" }}>
      <div className="card">
        <h3>This Semester</h3>
        <p className="card-body">
          4 achievements added, 3 approved, 1 pending approval.
        </p>
      </div>
      <div className="card">
        <h3>Goals</h3>
        <p className="card-body">
          Target: 2 more academic achievements and 1 project certificate before
          end of semester.
        </p>
      </div>
    </div>
  </div>
);

// Certificates page (uses context)
const CertificatesPage = () => {
  const { achievements } = useContext(AchievementContext);

  return (
    <div className="page-container">
      <h2>Certificates</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>View</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.category}</td>
              <td>{a.date}</td>
              <td>
                {a.certificateUrl ? (
                  <a
                    href={a.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="primary-btn"
                  >
                    View
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {a.certificateUrl ? (
                  <a
                    href={a.certificateUrl}
                    download
                    className="primary-btn"
                  >
                    Download
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Home dashboard
const StudentHome = () => {
  return (
    <div className="dashboard-content">
      <div className="student-header">
        <h2>Student Dashboard</h2>
        <p>Quick glance at your schedule, progress, and upcoming events.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Next Class</h3>
          <p>10:00 AM</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Events</h3>
          <p>3</p>
        </div>
        <div className="stat-card">
          <h3>Completion Progress</h3>
          <p>75%</p>
        </div>
        <div className="stat-card">
          <h3>Certificates</h3>
          <p>5</p>
        </div>
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h3>Today’s Schedule</h3>
          <ul>
            <li>09:00 – 10:00: Club Meeting</li>
            <li>11:00 – 12:00: Project Review</li>
            <li>1:00 – 2:00: Sport</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Upcoming Events</h3>
          <ul>
            <li>Coding Contest – 28 Feb</li>
            <li>Workshop – 05 Mar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Parent dashboard with sidebar + nested routes
const StudentDashboard = () => {
  return (
    <div className="layout">
      <StudentSidebar />
      <div className="layout-main">
        <Header title="Student Dashboard" />
        <Routes>
          <Route path="/" element={<StudentHome />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="events" element={<UpcomingEvents />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="profile" element={<StudentProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;

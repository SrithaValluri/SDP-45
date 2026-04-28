// src/pages/StudentDashboard.jsx (Updated with Viewer Modal)
import React, { useContext, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import StudentAchievements from "./StudentAchievements";
import "../styles/StudentDashboard.css";
import "../styles/Forms.css";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import StudentProfile from "./StudentProfile";
import { AchievementContext } from "../context/AchievementContext";
import { AuthContext } from "../context/AuthContext";
import StudentParticipation from "./StudentParticipation";
import RequestAchievement from "./RequestAchievement";

// Certificate Viewer Modal
const CertificateModal = ({ isOpen, onClose, achievement }) => {
  if (!isOpen || !achievement) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content certificate-viewer" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="certificate-header">
          <h3>Certificate Viewer</h3>
          <p>{achievement.title}</p>
        </div>
        <div className="certificate-body" style={{ width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {achievement.certificateUrl ? (
            achievement.certificateUrl.toLowerCase().endsWith(".pdf") ? (
              <iframe 
                src={achievement.certificateUrl} 
                title="Certificate PDF"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <img 
                src={achievement.certificateUrl} 
                alt="Certificate" 
                className="certificate-image-preview" 
                onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Certificate+Preview+Unavailable"; }}
              />
            )
          ) : (
            <div className="no-certificate-placeholder">
              <p>No certificate image available.</p>
            </div>
          )}
        </div>
        <div className="certificate-footer">
          <a 
            href={achievement.certificateUrl} 
            download={`${achievement.title}_certificate`}
            target="_blank" 
            rel="noreferrer" 
            className="primary-btn download-btn"
          >
            Download Certificate
          </a>
          <button onClick={onClose} className="secondary-btn">Close</button>
        </div>
      </div>
    </div>
  );
};

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
          Track your personal goals and academic performance here.
        </p>
      </div>
      <div className="card">
        <h3>Goals</h3>
        <p className="card-body">
          Target: Add at least 3 high-level achievements this semester.
        </p>
      </div>
    </div>
  </div>
);

// Certificates page (uses context)
const CertificatesPage = () => {
  const { user } = useContext(AuthContext);
  const { achievements } = useContext(AchievementContext);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const studentId = user?.username || user?.regNo;

  const myAchievements = useMemo(() => {
    return achievements.filter(a => String(a.studentId) === String(studentId));
  }, [achievements, studentId]);

  return (
    <div className="page-container">
      <h2>My Certificates</h2>
      <p className="page-subtitle">List of certificates from your achievements.</p>
      <table className="table" style={{ marginTop: "1rem" }}>
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
          {myAchievements.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No certificates found.</td>
            </tr>
          ) : (
            myAchievements.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.category}</td>
                <td>{a.date}</td>
                <td>
                  <button 
                    onClick={() => setSelectedAchievement(a)} 
                    className="primary-btn"
                    style={{ padding: "4px 12px", fontSize: "0.8rem", width: "auto" }}
                  >
                    View
                  </button>
                </td>
                <td>
                  {a.certificateUrl ? (
                    <a
                      href={a.certificateUrl}
                      download={`${a.title}_certificate`}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-btn"
                      style={{ padding: "4px 12px", fontSize: "0.8rem", width: "auto", textDecoration: "none" }}
                    >
                      Download
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <CertificateModal 
        isOpen={!!selectedAchievement} 
        onClose={() => setSelectedAchievement(null)} 
        achievement={selectedAchievement}
      />
    </div>
  );
};

// Home dashboard
const StudentHome = () => {
  const { user } = useContext(AuthContext);
  const { achievements } = useContext(AchievementContext);
  const studentId = user?.username || user?.regNo;

  const myAchievementsCount = useMemo(() => {
    return achievements.filter(a => String(a.studentId) === String(studentId)).length;
  }, [achievements, studentId]);

  return (
    <div className="dashboard-content">
      <div className="student-header">
        <h2>Welcome, {user?.name || "Student"}!</h2>
        <p>Quick glance at your schedule, progress, and achievements.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Next Class</h3>
          <p>10:00 AM</p>
        </div>
        <div className="stat-card">
          <h3>Achievements</h3>
          <p>{myAchievementsCount}</p>
        </div>
        <div className="stat-card">
          <h3>Completion Progress</h3>
          <p>75%</p>
        </div>
        <div className="stat-card">
          <h3>Registration No</h3>
          <p>{studentId}</p>
        </div>
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h3>Today’s Schedule</h3>
          <ul>
            <li>09:00 – 10:00: Club Meeting</li>
            <li>11:00 – 12:00: Project Review</li>
            <li>1:00 – 2:00: Sports</li>
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
          <Route path="request-achievement" element={<RequestAchievement />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="events" element={<UpcomingEvents />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="achievements" element={<StudentAchievements />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="participation" element={<StudentParticipation />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;

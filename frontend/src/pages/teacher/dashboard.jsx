import React from 'react';
import { Link } from 'react-router-dom';
import './teacher.css';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/teacher/attendance" className="dashboard-link">
          View Attendance
        </Link>
        <Link to="/teacher/income" className="dashboard-link">
          View My Income
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
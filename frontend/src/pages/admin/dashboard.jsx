import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/classes" className="dashboard-link">
          Class Management
        </Link>
        <Link to="/admin/mark-attendance" className="dashboard-link">
          Mark Attendance
        </Link>
        <Link to="/admin/fees" className="dashboard-link">
          Fee Management
        </Link>
        <Link to="/admin/income" className="dashboard-link">
          Income Management
        </Link>
        <Link to="/admin/users" className="dashboard-link">
          User Management
        </Link>
        <Link to="/admin/reports" className="dashboard-link">
          Reports
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
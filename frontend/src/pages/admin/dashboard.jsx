import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-grid">
        <Link to="/admin/classes" className="dashboard-card">
          <h3>Class Management</h3>
        </Link>

        <Link to="/admin/attendance" className="dashboard-card">
          <h3>Mark Attendance</h3>
        </Link>

        <Link to="/admin/fees" className="dashboard-card">
          <h3>Fee Management</h3>
        </Link>

        <Link to="/admin/income" className="dashboard-card">
          <h3>Income Management</h3>
        </Link>

        <Link to="/admin/users" className="dashboard-card">
          <h3>User Management</h3>
        </Link>

        <Link to="/admin/reports" className="dashboard-card">
          <h3>Reports</h3>
        </Link>

        {/* Register User Card */}
        <Link to="/auth/register" className="dashboard-card register-card">
          <h3>Register New User</h3>
          <p>Add new admin, teacher, or student</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
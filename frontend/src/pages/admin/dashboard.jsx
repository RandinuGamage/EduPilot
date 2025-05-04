import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import Register from '../Auth/register';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Auth/register');
  };

  return (
    <div className="admin-dashboard">
      <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/classes" className="dashboard-link">
          Class Management
        </Link>
        <Link to="/admin/attendance" className="dashboard-link">
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
        <Link to="/Auth/register" className="dashboard-link">
          <button onClick={handleClick}>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
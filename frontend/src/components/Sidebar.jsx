import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        {user?.role === 'admin' && (
          <>
            <li>
              <Link to="/admin/dashboard" className="sidebar-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/classes" className="sidebar-link">
                Class Management
              </Link>
            </li>
            <li>
              <Link to="/admin/mark-attendance" className="sidebar-link">
                Mark Attendance
              </Link>
            </li>
            <li>
              <Link to="/admin/fees" className="sidebar-link">
                Fee Management
              </Link>
            </li>
            <li>
              <Link to="/admin/income" className="sidebar-link">
                Income Management
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="sidebar-link">
                User Management
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className="sidebar-link">
                Reports
              </Link>
            </li>
          </>
        )}
        {user?.role === 'teacher' && (
          <>
            <li>
              <Link to="/teacher/dashboard" className="sidebar-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/teacher/attendance" className="sidebar-link">
                Attendance
              </Link>
            </li>
            <li>
              <Link to="/teacher/income" className="sidebar-link">
                My Income
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
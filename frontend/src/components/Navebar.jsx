import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navebar.css';

function Navebar() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-logo">EduPilot</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              <FaUser /> Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navebar;


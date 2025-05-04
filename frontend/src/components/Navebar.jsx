import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector,  } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navebar.css';

function Navebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authSlice = useSelector(state => state.authSlice);
  const user = authSlice?.user; 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-logo">
        <img src="/EduPilot.png" alt="EduPilot Logo" className="logo-img" />
        EduPilot
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <FaSignInAlt /> Login
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


import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import api from '../../services/api';
import './Auth.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.someSlice?.loading || false);
  const error = useSelector(state => state.someSlice?.error || null);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data.user));
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.data.user.role === 'teacher') {
        navigate('/teacher/dashboard');
      }
    } catch (err) {
      dispatch(loginFailure(err.response.data.message));
    }
  };

  return (
    <div className="auth-container">
      <h2>
        <FaSignInAlt/> Login
      </h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
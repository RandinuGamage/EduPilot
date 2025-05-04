import React from 'react';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../../redux/actions/authActions';
import api from '../../services/api';
import './Auth.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default role is student
    const [subject, setSubject] = useState(''); // Only for teachers
    const [className, setClassName] = useState(''); // Only for teachers
    const [qulification, setQulification] = useState('') // Ony for teachers
    const [experiance, setExperiance] = useState('') // Ony for teachers
    const [parentName, setParentName] = useState(''); // Only for students
    const [grade, setGrade] = useState(''); // Only for students
    const [address, setAddress] = useState('') //Only for teachers and students
    const [contactNumber, setcontactNumber] = useState('') //Only for teachers and students
    const [dateOfBirth, setDateOfBirth] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(registerStart());
        try {
          const userData = { name, email, password, role };
          if (role === 'teacher') {
            userData.subject = subject;
            userData.qulification = qulification;
            userData.experiance = experiance;
            userData.contactNumber = contactNumber;
            userData.address = address;
          } else if(role === 'student'){
            userData.parentName = parentName;
            userData.grade = grade;
            userData.address = address;
            userData.contactNumber = contactNumber;
            userData.dateOfBirth = dateOfBirth;

          }
          const response = await api.post('/auth/register', userData);
          localStorage.setItem('token', response.data.token);
          dispatch(registerSuccess(response.data.user));
          navigate('/admin/dashboard'); // Redirect to admin dashboard after registration
        } catch (err) {
          dispatch(registerFailure(err.response.data.message));
        }
      };
    

    return (
    <div className="auth-container">
      <h2>
        <FaUser/> Register a new user
        </h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister} className="auth-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        {role === 'teacher' && (
          <>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Qulification</label>
              <input
                type="text"
                value={qulification}
                onChange={(e) => setQulification(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Experiance</label>
              <input
                type="text"
                value={experiance}
                onChange={(e) => setExperiance(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>contactNumber</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setcontactNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {role === 'student' && (
          <>
            <div className="form-group">
              <label>Parent Name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Grade</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setcontactNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
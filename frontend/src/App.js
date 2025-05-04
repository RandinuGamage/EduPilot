import React from 'react';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Navebar from './components/Navebar';
import Footer from './components/Footer';
import AdminDashboard from './pages/admin/dashboard';
import TeacherDashboard from './pages/teacher/dashboard';
import './index.css';
import Attendance from './pages/admin/attendance';
import Income from './pages/admin/income';
import userManagement from './pages/admin/userManagement';
import fees from './pages/admin/fees';
import classManagement from './pages/admin/classManagement';
import Reports from './pages/admin/reports';
import Tattendance from './pages/teacher/attendance';
import Tincome from './pages/teacher/income';




function App() {
  return (
    <>
      <Provider store={store}>
      <Router>
        <div className="app">
          <Navebar />
          <div className="app-content">
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Login />} /> {/* Login as the default route */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/teacher/*" element={<TeacherDashboard />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    </>
  );
}

export default App;

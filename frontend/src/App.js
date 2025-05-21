import React from 'react';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute'; 
import store from './app/store';

//common pages
import Login from './pages/Auth/login';
import Navebar from './components/Navebar';
import Footer from './components/Footer'; 

//admin pages
import AdminDashboard from './pages/admin/dashboard';
import Register from './pages/Auth/register';
import MarkAttendance from './pages/admin/attendance';
import Income from './pages/admin/income';
import userManagement from './pages/admin/userManagement';
import fees from './pages/admin/fees';
import classManagement from './pages/admin/classManagement';
import Reports from './pages/admin/reports';

//teacher pages
import TeacherDashboard from './pages/teacher/dashboard';
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
                
                {/* Admin Routes */}
                <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/classes" element={<classManagement />} />
                  <Route path="/admin/attendance" element={<MarkAttendance />} />
                  <Route path="/admin/fees" element={<fees />} />
                  <Route path="/admin/income" element={<Income />} />
                  <Route path="/admin/reports" element={<Reports />} />
                  <Route path="/admin/users" element={<userManagement />} />
                </Route>

                {/* Protected Routes for Teacher */}
                <Route element={<PrivateRoute allowedRoles={['teacher']} />}>
                  <Route path="/teacher" element={<TeacherDashboard />} />
                  {/* <Route path="/teacher/classes" element={<MyClassesPage />} /> */}
                  <Route path="/teacher/attendance" element={<Tattendance />} />
                  <Route path="/teacher/income" element={<Tincome />} />
                </Route>

                {/* Default redirect */}
                {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

                

              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </Provider>
    </>
  );
}

export default App;

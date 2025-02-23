import React from 'react';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/admin/dashboard';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Navebar from './components/Navebar';



function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Navebar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
          
        </div>
      </Router>
    </>
  );
}

export default App;

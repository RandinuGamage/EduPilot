import React from 'react';
import './Admin.css';

const Reports = () => {
  return (
    <div className="reports">
      <h2>Generate Reports</h2>
      <div className="report-options">
        <button>Generate Attendance Report</button>
        <button>Generate Fee Report</button>
        <button>Generate Income Report</button>
      </div>
    </div>
  );
};

export default Reports;
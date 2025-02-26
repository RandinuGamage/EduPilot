import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendanceStart, fetchAttendanceSuccess, fetchAttendanceFailure } from '../../redux/slices/attendanceSlice';
import api from '../../services/api';
import './teacher.css';

const Attendance = () => {
  const dispatch = useDispatch();
  const { attendance, loading, error } = useSelector((state) => state.attendance);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAttendance = async () => {
      dispatch(fetchAttendanceStart());
      try {
        const response = await api.get(`/attendance/teacher/${user._id}`);
        dispatch(fetchAttendanceSuccess(response.data));
      } catch (err) {
        dispatch(fetchAttendanceFailure(err.response.data.message));
      }
    };
    fetchAttendance();
  }, [dispatch, user]);

  return (
    <div className="attendance">
      <h2>Attendance for My Classes</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Class</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record._id}>
              <td>{record.student.name}</td>
              <td>{record.class.name}</td>
              <td>{record.status}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
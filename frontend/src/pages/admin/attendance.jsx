import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassesStart, fetchClassesSuccess, fetchClassesFailure } from '../../redux/slices/classSlice';
import api from '../../services/api';
import './admin.css';

const MarkAttendance = () => {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.class);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchClasses = async () => {
      dispatch(fetchClassesStart());
      try {
        const response = await api.get('/classes');
        dispatch(fetchClassesSuccess(response.data));
      } catch (err) {
        dispatch(fetchClassesFailure(err.response.data.message));
      }
    };
    fetchClasses();
  }, [dispatch]);

  const handleMarkAttendance = async () => {
    try {
      await api.post('/attendance', {
        ClassId: selectedClass.classId,
        attendance: Object.keys(attendance).map((studentId) => ({
          studentId,
          status: attendance[studentId],
        })),
      });
      alert('Attendance marked successfully!');
    } catch (err) {
      alert('Failed to mark attendance');
    }
  };

  return (
    <div className="mark-attendance">
      <h2>Mark Attendance</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="class-selector">
        <select onChange={(e) => setSelectedClass(classes.find((cls) => cls._id === e.target.value))}>
          <option value="">Select a Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <div className="attendance-list">
          <h3>Students in {selectedClass.name}</h3>
          <ul>
            {selectedClass.students.map((student) => (
              <li key={student._id}>
                <span>{student.name}</span>
                <label>
                  <input
                    type="checkbox"
                    checked={attendance[student._id] === 'present'}
                    onChange={(e) =>
                      setAttendance({
                        ...attendance,
                        [student._id]: e.target.checked ? 'present' : 'absent',
                      })
                    }
                  />
                  Present
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleMarkAttendance}>Mark Attendance</button>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
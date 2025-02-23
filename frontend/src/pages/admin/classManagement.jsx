import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchClassesStart,
  fetchClassesSuccess,
  fetchClassesFailure,
  addClass,
  updateClass,
  deleteClass,
  addStudentToClass,
  removeStudentFromClass,
} from '../../redux/slices/classSlice';
import api from '../../services/api';
import './admin.css';

// Add ClassManagement component here
const ClassManagement = () => {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.class);
  const [newClassName, setNewClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [studentToAdd, setStudentToAdd] = useState('');

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

  // Add handleAddClass function here
  const handleAddClass = async () => {
    try {
      const response = await api.post('/classes', { name: newClassName });
      dispatch(addClass(response.data));
      setNewClassName('');
    } catch (err) {
      alert('Failed to add class');
    }
  };

  // Add handleDeleteClass function here
  const handleDeleteClass = async (classId) => {
    try {
      await api.delete(`/classes/${classId}`);
      dispatch(deleteClass(classId));
    } catch (err) {
      alert('Failed to delete class');
    }
  };

    // Add handleAddStudent function here
  const handleAddStudent = async (classId) => {
    try {
      const response = await api.post(`/classes/${classId}/students`, { studentId: studentToAdd });
      dispatch(addStudentToClass({ classId, student: response.data }));
      setStudentToAdd('');
    } catch (err) {
      alert('Failed to add student');
    }
  };

  // Add handleRemoveStudent function here
  const handleRemoveStudent = async (classId, studentId) => {
    try {
      await api.delete(`/classes/${classId}/students/${studentId}`);
      dispatch(removeStudentFromClass({ classId, studentId }));
    } catch (err) {
      alert('Failed to remove student');
    }
  };

  // Add handleUpdateClass function here
  const handleUpdateClass = async () => {
    try {
      const response = await api.put(`/classes/${selectedClass._id}`, selectedClass);
      dispatch(updateClass(response.data));
      setSelectedClass(null);
    } catch (err) {
      alert('Failed to update class');
    }
  };

  

  return (
    <div className="class-management">
      <h2>Class Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="add-class">
        <input
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="New Class Name"
        />
        <button onClick={handleAddClass}>Add Class</button>
      </div>

      <div className="class-list">
        {classes.map((cls) => (
          <div key={cls._id} className="class-item">
            <h3>{cls.name}</h3>
            <div className="add-student">
              <input
                type="text"
                value={studentToAdd}
                onChange={(e) => setStudentToAdd(e.target.value)}
                placeholder="Student ID"
              />
              <button onClick={() => handleAddStudent(cls._id)}>Add Student</button>
            </div>
            <ul>
              {cls.students.map((student) => (
                <li key={student._id}>
                  {student.name}
                  <button onClick={() => handleRemoveStudent(cls._id, student._id)}>Remove</button>
                </li>
              ))}
            </ul>
            <button onClick={() => handleDeleteClass(cls._id)}>Delete Class</button>
            <div>
                <button onClick={() => handleUpdateClass(cls)}>Edit</button>
            </div>
        </div>
          
        ))}
      </div>
    </div>
  );
};

export default ClassManagement;
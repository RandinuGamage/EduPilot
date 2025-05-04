import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, deleteUser } from '../../redux/slices/userSlice';
import api from '../../services/api';
import './admin.css';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart());
      try {
        const response = await api.get('/users');
        dispatch(fetchUsersSuccess(response.data));
      } catch (err) {
        dispatch(fetchUsersFailure(err.response.data.message));
      }
    };
    fetchUsers();
  }, [dispatch]);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      dispatch(deleteUser(userId));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => setEditUser(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
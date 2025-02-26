import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacherIncomeStart, fetchTeacherIncomeSuccess, fetchTeacherIncomeFailure } from '../../redux/slices/teacherIncomeSlice';
import api from '../../services/api';
import './teacher.css';

const Income = () => {
  const dispatch = useDispatch();
  const { income, loading, error } = useSelector((state) => state.teacherIncome);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchIncome = async () => {
      if (user && user._id) {
        dispatch(fetchTeacherIncomeStart());
        try {
          const response = await api.get(`/income/teacher/${user._id}`);
          dispatch(fetchTeacherIncomeSuccess(response.data));
        } catch (err) {
          dispatch(fetchTeacherIncomeFailure(err.response.data.message));
        }
      }
    };
    fetchIncome();
  }, [dispatch, user]);

  return (
    <div className="income">
      <h2>My Income</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Income</th>
            <th>My Share</th>
          </tr>
        </thead>
        <tbody>
          {income.map((record) => (
            <tr key={record._id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.totalIncome}</td>
              <td>{record.teacherShare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Income;
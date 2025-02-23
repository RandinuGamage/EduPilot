import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomeStart, fetchIncomeSuccess, fetchIncomeFailure } from '../../redux/slices/incomeSlice';
import api from '../../services/api';
import './Admin.css';

const Income = () => {
  const dispatch = useDispatch();
  const { income, loading, error } = useSelector((state) => state.income);

  useEffect(() => {
    const fetchIncome = async () => {
      dispatch(fetchIncomeStart());
      try {
        const response = await api.get('/income');
        dispatch(fetchIncomeSuccess(response.data));
      } catch (err) {
        dispatch(fetchIncomeFailure(err.response.data.message));
      }
    };
    fetchIncome();
  }, [dispatch]);

  return (
    <div className="income-management">
      <h2>Income Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Income</th>
            <th>Institutional Share</th>
            <th>Teacher Share</th>
          </tr>
        </thead>
        <tbody>
          {income.map((record) => (
            <tr key={record._id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.totalIncome}</td>
              <td>{record.institutionalShare}</td>
              <td>{record.teacherShare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Income;
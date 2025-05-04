import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeesStart, fetchFeesSuccess, fetchFeesFailure } from '../../redux/slices/feeSlice';
import api from '../../services/api';
import './admin.css';

const Fees = () => {
  const dispatch = useDispatch();
  const { fees, loading, error } = useSelector((state) => state.fees);

  useEffect(() => {
    const fetchFees = async () => {
      dispatch(fetchFeesStart());
      try {
        const response = await api.get('/fees');
        dispatch(fetchFeesSuccess(response.data));
      } catch (err) {
        dispatch(fetchFeesFailure(err.response.data.message));
      }
    };
    fetchFees();
  }, [dispatch]);

  return (
    <div className="fee-management">
      <h2>Fee Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Class</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee._id}>
              <td>{fee.student.name}</td>
              <td>{fee.class.name}</td>
              <td>{fee.amount}</td>
              <td>{fee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fees;
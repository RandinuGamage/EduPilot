import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import classReducer from '../redux/slices/classSlice';
import feeReducer from '../redux/slices/feeSlice';
import userReducer from '../redux/slices/userSlice';
import attendanceReducer from '../redux/slices/attendanceSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classReducer,
    fees: feeReducer,
    user: userReducer,
    attendance: attendanceReducer,
  },
});

export default store;

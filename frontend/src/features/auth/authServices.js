import axios from 'axios';
import { response } from 'express';

const API_URL = 'api/users/';

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data){
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};


//login
// export const login = async (userData) => {
//   const response = await axios.post(API_URL + 'login', userData);
//   if (response.data){
//     localStorage.setItem('user', JSON.stringify(response.data));
//   }
//   return response.data;
// };


//logout
export const logout = () => {
  localStorage.removeItem('user');
};

const authServices = {
    register,
    login,
};

export default authServices;
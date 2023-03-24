import axios from 'axios';

const API_URL = 'https://study-tracker-api.vercel.app/api/users';

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Update user pay
const updatePay = async (userInfo) => {
  const {id, hourlyRate} = userInfo
  const response = await axios.put(API_URL + '/setpay/' + id, hourlyRate);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem('user');

const authService = { register, logout, login, updatePay };

export default authService;

import axios from 'axios';

// Create an Axios instance with a base URL
const backendurl = process.env.NODE_ENV === "production" ? 'https://saveidea.render.app/api/' : '/api';
const axiosInstance = axios.create({
  baseURL: backendurl,
  timeout: 10000,
  headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${localStorage.getItem('TOKEN')}` // Optional: Add
  },
});

export default axiosInstance;
// src/api/axiosClient.js

import axios from 'axios';


const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  withCredentials: true, 
});
export default axiosClient;
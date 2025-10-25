// src/api/axiosMlClient.js

import axios from 'axios';

const axiosMlClient = axios.create({
  baseURL: import.meta.env.VITE_ML_MODEL_URL,
});

axiosMlClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (!config || !error.response || error.response.status < 500) {
      return Promise.reject(error);
    }
    
    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= 2) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return axiosMlClient(config);
  }
);

export default axiosMlClient;
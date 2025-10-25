// src/api/userApi.js

import axiosClient from './axiosClient';

export const updateUserCoverImage = async (formData) => {
  try {
    const response = await axiosClient.patch('/users/update-cover-image', formData);
    return response.data;
  } catch (error) {
    console.error("Failed to update cover image:", error);
    throw error.response?.data || error;
  }
};
// src/api/tripApi.js

import axiosClient from './axiosClient';

export const saveTrip = async (tripPlan) => {
  try {
    const response = await axiosClient.post('/trips', { tripPlan });
    return response.data;
  } catch (error) {
    console.error("Failed to save trip:", error);
    throw error.response?.data || error;
  }
};

export const getMySavedTrips = async () => {
  try {
    const response = await axiosClient.get('/trips');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch saved trips:", error);
    throw error.response?.data || error;
  }
};

export const deleteTrip = async (tripId) => {
  try {
    const response = await axiosClient.delete(`/trips/${tripId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete trip:", error);
    throw error.response?.data || error;
  }
};
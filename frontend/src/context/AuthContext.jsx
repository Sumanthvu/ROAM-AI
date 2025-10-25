// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axiosClient.post('/users/refesh-token');
        
        if (response.data && response.data.success) {
          const profileResponse = await axiosClient.get('/users/profile');
          if (profileResponse.data && profileResponse.data.success) {
              setUser(profileResponse.data.data);
          }
        }
      } catch (error) {
        console.log("No active session found.");
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosClient.post("/users/login", {
        email,
        password,
      });
      if (response.data && response.data.success) {
        setUser(response.data.data.user);
        return response.data;
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const response = await axiosClient.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("THE ACTUAL ERROR OBJECT:", error);
      console.error("Registration step 1 failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await axiosClient.post("/users/verify-otp", { otp });
      return response.data;
    } catch (error) {
      console.error("OTP verification failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          "An unexpected error occurred during OTP verification."
        );
      }
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post("/users/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axiosClient.post('/users/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password failed:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('An unexpected error occurred.');
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await axiosClient.post('/users/reset-password', { email, otp, newPassword });
      return response.data;
    } catch (error) {
      console.error('Reset password failed:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('An unexpected error occurred.');
    }
  };

   const updateUser = (newUserData) => {
    setUser(prevUser => ({ ...prevUser, ...newUserData }));
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    register,
    verifyOtp,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user,
    loading,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from "react";
import axiosClient from "../api/axiosClient"; // Our configured axios instance

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check initial auth status

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await axiosClient.post("/users/login", {
        email,
        password,
      });
      if (response.data && response.data.success) {
        setUser(response.data.data.user); // Set user state with the user object from the response
        return response.data;
      }
    } catch (error) {
      console.error("Login failed:", error);
      // This is a more robust way to handle errors
      if (error.response && error.response.data) {
        // If the server sent back a specific error message (e.g., "Invalid credentials")
        throw error.response.data;
      }
      // For network errors where there is no response from the server
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      // We are sending multipart/form-data because of the cover image
      const response = await axiosClient.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // This will return a success message like "OTP sent successfully."
    } catch (error) {
       console.log("THE ACTUAL ERROR OBJECT:", error); 
      // This is the NEW catch block
      console.error("Registration step 1 failed:", error);
      // Check if the server provided a specific JSON error response.
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If it did, create a new error with THAT specific message and throw it.
        throw new Error(error.response.data.message);
      } else {
        // For other errors (network issues, etc.), throw a generic error.
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await axiosClient.post("/users/verify-otp", { otp });
      return response.data; // This will return "User registered successfully!"
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

  // Function to handle user logout
  const logout = async () => {
    try {
      await axiosClient.post("/users/logout");
      setUser(null); // Clear the user from state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Note: We will add the registration function here in a later step when we build the Register page.

  // The value that will be available to all consuming components
  const value = {
    user,
    setUser,
    login,
    logout,
    register,
    verifyOtp,
    isAuthenticated: !!user, // A handy boolean to check if the user object is not null
    loading,
  };

  // 3. Return the provider with the value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Create a custom hook for easy consumption of the context
export const useAuth = () => {
  return useContext(AuthContext);
};

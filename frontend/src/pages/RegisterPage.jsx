// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css'; // We will create this CSS file

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    coverImage: null,
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const { register, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const data = new FormData();
    data.append('userName', formData.userName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.coverImage) {
      data.append('coverImage', formData.coverImage);
    }

    try {
      const response = await register(data);
      setMessage(response.message || 'OTP sent to your email!');
      setShowOtpForm(true); // Show the OTP form
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await verifyOtp(otp);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Wait 2 seconds before redirecting
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {!showOtpForm ? (
        // Registration Form
        <div className="register-form-wrapper">
          <h2 className="register-title">Create an Account</h2>
          <p className="register-subtitle">Join us and start planning your next adventure!</p>
          <form onSubmit={handleRegisterSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="userName">Username</label>
              <input type="text" name="userName" id="userName" onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="coverImage">Cover Image (Optional)</label>
              <input type="file" name="coverImage" id="coverImage" onChange={handleFileChange} accept="image/*" />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      ) : (
        // OTP Verification Form
        <div className="register-form-wrapper">
          <h2 className="register-title">Verify Your Email</h2>
          <p className="register-subtitle">An OTP has been sent to your email address.</p>
          <form onSubmit={handleOtpSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <input type="text" name="otp" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </div>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
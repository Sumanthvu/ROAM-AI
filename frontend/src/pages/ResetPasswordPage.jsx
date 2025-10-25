// src/pages/ResetPasswordPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FormPages.css';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({ email: '', otp: '', newPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await resetPassword(formData.email, formData.otp, formData.newPassword);
      setMessage(response.message || 'Password has been reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-wrapper">
        <h2 className="form-title">Reset Your Password</h2>
        <p className="form-subtitle">Enter your email, the OTP you received, and your new password.</p>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label htmlFor="otp">OTP</label>
            <input type="text" name="otp" id="otp" onChange={handleChange} placeholder="Enter the OTP from your email" required />
          </div>
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input type="password" name="newPassword" id="newPassword" onChange={handleChange} placeholder="Enter your new password" required />
          </div>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
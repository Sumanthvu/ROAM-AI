// src/components/Layout.jsx

import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-brand">
          <Link to="/">Roam AI</Link>
        </div>
        <nav className="navbar-links">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.userName}!</span>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">My Profile</Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
// src/components/Layout.jsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css'; // We will create this CSS file next

const Layout = () => {
  return (
    <>
      <header className="navbar">
        <div className="navbar-brand">
          <Link to="/">Roam AI</Link>
        </div>
        <nav className="navbar-links">
          {/* We will add conditional links here later (e.g., show Profile/Logout if logged in) */}
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
      <main className="main-content">
        <Outlet /> {/* This is where the content of our different pages will be rendered */}
      </main>
    </>
  );
};

export default Layout;
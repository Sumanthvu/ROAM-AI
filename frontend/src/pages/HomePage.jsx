// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="homepage-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Roam AI</h1>
          <p className="hero-subtitle">
            Your personal AI-powered travel agent. Plan your perfect trip in minutes, 
            from destination suggestions to a fully detailed, day-by-day itinerary.
          </p>
          <div className="hero-cta">
            {isAuthenticated ? (
              <Link to="/dashboard" className="cta-button">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/register" className="cta-button primary">Get Started for Free</Link>
                <Link to="/login" className="cta-button">Sign In</Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800" 
            alt="Scenic travel destination" 
            className="hero-image"
          />
        </div>
      </div>

      <div className="features-section">
        <h2 className="features-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>1. Share Your Preferences</h3>
            <p>Tell our AI about your travel style, budget, interests, and group size. The more details, the better the plan.</p>
          </div>
          <div className="feature-card">
            <h3>2. Get AI-Powered Suggestions</h3>
            <p>Receive a curated list of destinations that perfectly match your criteria, complete with photos and key details.</p>
          </div>
          <div className="feature-card">
            <h3>3. Customize Your Trip</h3>
            <p>Select your favorite destination, then choose the attractions and local cuisines you want to experience.</p>
          </div>
          <div className="feature-card">
            <h3>4. Receive Your Instant Itinerary</h3>
            <p>Get a complete, day-by-day plan with timelines, safety tips, packing lists, and budget breakdowns. Save it to your profile for later!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
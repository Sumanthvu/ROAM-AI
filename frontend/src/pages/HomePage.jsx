import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const images = [
  "/beach1.jpeg", "/historic1.jpeg", "/road1.jpeg", "/trek1.jpg",
  "/beach2.jpeg", "/moun2.jpeg", "/trek2.jpeg", "/beach3.jpeg", "/moun3.jpeg",
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getPositionClass = (index, currentIndex, totalImages) => {
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
    const nextIndex = (currentIndex + 1) % totalImages;
    if (index === currentIndex) return 'position-center';
    if (index === prevIndex) return 'position-top';
    if (index === nextIndex) return 'position-bottom';
    return 'position-hidden';
  };

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to 
            <div className="yaatra-ai-animated">
              <span className="yaatra-ai-text">Yaatra AI</span>
              <span className="yaatra-ai-glow"></span>
            </div>
          </h1>

          <p className="hero-subtitle">
            Your personal AI-powered travel agent. Plan your perfect trip in minutes, 
            from destination suggestions to a fully detailed, day-by-day itinerary.
          </p>

          <div className="hero-cta">
            {isAuthenticated ? (
              <Link to="/dashboard" className="cta-button primary">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/signup" className="cta-button primary">Get Started for Free</Link>
                <Link to="/login" className="cta-button">Sign In</Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-image-carousel">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Travel destination ${index + 1}`}
              className={`carousel-image ${getPositionClass(index, currentIndex, images.length)}`}
            />
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="features-section">
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
      </section>
    </div>
  );
};

export default HomePage;
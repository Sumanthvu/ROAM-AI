"use client";

import React from "react"; // Using React.Fragment, so we need this import
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ContainerScroll } from "../components/ContainerScroll";
import DynamicSections from "../components/DynamicSections.js";
import "./HomePage.css";
import "../components/DynamicSections.css";

const images = [
  "img1.jpg",
  "/historic1.jpeg",
  "/road1.jpeg",
  "/road2.jpg",
  "/trek1.jpg",
  "/historic2.jpg",
  "/historic4.jpg",
  "/historic5.jpg",
];

const howItWorksSteps = [
  {
    icon: "🧭",
    title: "Step 1: Share Your Preferences",
    description:
      "Tell our AI about your travel style, budget, interests, and group size. The more details, the better the plan.",
  },
  {
    icon: "🤖",
    title: "Step 2: Get AI-Powered Suggestions",
    description:
      "Receive a curated list of destinations that perfectly match your criteria, complete with photos and key details.",
  },
  {
    icon: "🗺️",
    title: "Step 3: Customize Your Trip",
    description:
      "Select your favorite destination, then choose the attractions and local cuisines you want to experience.",
  },
  {
    icon: "🧳",
    title: "Step 4: Receive Your Instant Itinerary",
    description:
      "Get a complete, day-by-day plan with timelines, safety tips, packing lists, and budget breakdowns. Save it for later!",
  },
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getPositionClass = (index, currentIndex, totalImages) => {
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
    const nextIndex = (currentIndex + 1) % totalImages;
    if (index === currentIndex) return "position-center";
    if (index === prevIndex) return "position-top";
    if (index === nextIndex) return "position-bottom";
    return "position-hidden";
  };

  return (
    // This is the single root container for the entire page
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to{" "}
            <span
              className="cover-text"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className={`cover-inner ${hovered ? "hovered" : ""}`}>
                Yaatra AI
              </span>
            </span>
          </h1>
          <p className="hero-subtitle">
            Your personal AI-powered travel agent. Plan your perfect trip in
            minutes, from destination suggestions to a fully detailed,
            day-by-day itinerary.
          </p>
          <div className="hero-cta">
            {isAuthenticated ? (
              <Link to="/dashboard" className="cta-button primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="cta-button primary">
                  Get Started for Free
                </Link>
                <Link to="/register" className="cta-button">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image-carousel">
          {images.map((src, index) => (
            <img
              key={index}
              src={src || "/placeholder.svg"}
              alt={`Travel destination ${index + 1}`}
              className={`carousel-image ${getPositionClass(
                index,
                currentIndex,
                images.length
              )}`}
            />
          ))}
        </div>
      </section>

      <DynamicSections />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#1c275812",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "3rem",
        }}
      >
        <ContainerScroll
          titleComponent={
            <>
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  color: "#F4F7FB",
                  textAlign: "center",
                  margin: 0,
                  paddingBottom: "10rem",
                  lineHeight: "1.2",
                }}
              >
                Visualize Your Next Adventure with
                <br />
                <span
                  style={{
                    fontSize: "6rem",
                    fontWeight: "800",
                    display: "inline-block",
                    background:
                      "linear-gradient(90deg, #7A82FF 0%, #C172F5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginTop: "0.75rem",
                  }}
                >
                  Unforgettable Scenery
                </span>
              </h1>
            </>
          }
        >
          <img
            src="/image1.png"
            alt="hero"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "1rem",
              userDrag: "none",
              userSelect: "none",
            }}
            draggable={false}
          />
        </ContainerScroll>
      </div>

      {/*-- Using the improved "How It Works" Section --*/}
      <section className="features-section">
        <h2 className="features-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>1. Share Your Preferences</h3>
            <p>
              Tell our AI about your travel style, budget, interests, and group
              size. The more details, the better the plan.
            </p>
          </div>
          <div className="feature-card">
            <h3>2. Get AI-Powered Suggestions</h3>
            <p>
              Receive a curated list of destinations that perfectly match your
              criteria, complete with photos and key details.
            </p>
          </div>
          <div className="feature-card">
            <h3>3. Customize Your Trip</h3>
            <p>
              Select your favorite destination, then choose the attractions and
              local cuisines you want to experience.
            </p>
          </div>
          <div className="feature-card">
            <h3>4. Receive Your Instant Itinerary</h3>
            <p>
              Get a complete, day-by-day plan with timelines, safety tips,
              packing lists, and budget breakdowns. Save it to your profile for
              later!
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 className="footer-logo">Yaatra AI</h3>
              <p className="footer-description">
                Your intelligent travel companion. Plan smarter, travel better.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-column-title">Product</h4>
                <ul className="footer-list">
                  <li><Link to="/features" className="footer-link">Features</Link></li>
                  <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
                  <li><Link to="/destinations" className="footer-link">Destinations</Link></li>
                  <li><Link to="/itineraries" className="footer-link">Sample Itineraries</Link></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Company</h4>
                <ul className="footer-list">
                  <li><Link to="/about" className="footer-link">About Us</Link></li>
                  <li><Link to="/blog" className="footer-link">Blog</Link></li>
                  <li><Link to="/careers" className="footer-link">Careers</Link></li>
                  <li><Link to="/contact" className="footer-link">Contact</Link></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Support</h4>
                <ul className="footer-list">
                  <li><Link to="/help" className="footer-link">Help Center</Link></li>
                  <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                  <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
                  <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-column-title">Newsletter</h4>
                <p className="footer-newsletter-text">
                  Subscribe to get travel tips and exclusive deals.
                </p>
                <form className="footer-newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="footer-newsletter-input"
                  />
                  <button type="submit" className="footer-newsletter-button">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Yaatra AI. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/terms" className="footer-bottom-link">Terms</Link>
              <span className="footer-separator">•</span>
              <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
              <span className="footer-separator">•</span>
              <Link to="/cookies" className="footer-bottom-link">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
      
    </div> // This is now the correct closing tag for homepage-container
  );
};

export default HomePage;
"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ContainerScroll } from "../components/ContainerScroll";
import "./HomePage.css";

const images = [
  "img.png",
  "/beach1.jpeg",
  "/historic1.jpeg",
  "/road1.jpeg",
  "/trek1.jpg",
  "/beach2.jpeg",
  "/moun2.jpeg",
  "/trek2.jpeg",
  "/beach3.jpeg",
  "/moun3.jpeg",
];


// --- Custom Hook for Scroll Animation ---
const useAnimateOnScroll = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // This block only runs when the element's visibility changes
      if (entry.isIntersecting) {
        setIsVisible(true);
        // This is the key line: we stop observing after it becomes visible once.
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

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
    <div className="homepage-container">
      {/* ... Hero Section and ContainerScroll sections remain unchanged ... */}
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
                <Link to="/signup" className="cta-button primary">
                  Get Started for Free
                </Link>
                <Link to="/signin" className="cta-button">
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

  
    </div>
  );
};

export default HomePage;
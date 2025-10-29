import React, { useEffect, useRef } from "react";
import "./DynamicSections.css";

// --- Demo Data (no changes here) ---
const sectionsData = [
  {
    title: "Smart Trip Matcher",
    description:
      "Tell us your interests — adventure, beaches, culture, or food — and our AI instantly matches you with destinations that fit your vibe. No more endless searching, just perfect matches for your next trip.",
    imageUrl: "transparent.png",
  },
  {
    title: "Personalized Destination Insights",
    description:
      "Our ML model analyzes your travel preferences and suggests top destinations with detailed insights on weather, attractions, cuisines, and culture, tailored uniquely for you.",
    imageUrl: "second.png",
  },
  {
    title: "Dynamic Itinerary Builder",
    description:
      "Choose your favorite destinations and activities, and our AI crafts a full itinerary — including when to go, where to stay, and how much it will cost — optimized for your time and budget.",
    imageUrl: "third.png",
  },
  {
    title: "Taste the Journey",
    description:
      "Discover the top local cuisines and hidden food spots recommended by our AI, based on your preferences. From street food in Bangkok to fine dining in Paris — we’ve got your cravings covered.",
    imageUrl: "fourth.png",
  },
  {
    title: "Real-Time Stays & Budget Planner",
    description:
      "Get accurate hotel suggestions with real-time prices. Our system ensures your stay fits your comfort and budget — from cozy homestays to luxury resorts, all verified and up-to-date.",
    imageUrl: "fifth.png",
  },
  {
    title: "AI-Powered Travel Assistant",
    description:
      "Meet your personal travel planner that adapts to your preferences in real time. Change of plans? Our AI adjusts your itinerary instantly with new routes, stays, and experiences.",
    imageUrl: "sixth.png",
  },
  {
    title: "Smart Cost Optimization",
    description:
      "Our AI analyzes all available options to give you the most affordable yet comfortable travel experience — saving you money without compromising on quality.",
    imageUrl: "seventh.png",
  },
];


const DynamicSections = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.25, // Trigger when 25% of the element is visible
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className="dynamic-sections-container">
      <div className="dynamic-sections-header">
        <span className="dynamic-sections-title">Your Journey, Reimagined</span>
        <br />
        <br />
        <p className="dynamic-sections-subtitle">
          Discover how our intelligent features transform your travel planning from a chore into an exciting part of the adventure itself.
        </p>
      </div>
      {sectionsData.map((section, index) => (
        <section
          key={index}
          className={`dynamic-section ${
            index % 2 === 0 ? "image-left" : "image-right"
          }`}
          // Add a data-direction attribute for the CSS animation
          data-direction={index % 2 === 0 ? "right" : "left"}
          ref={(el) => (sectionRefs.current[index] = el)}
        >
          <div className="text-content-wrapper">
            <h3 className="section-title">{section.title}</h3>
            <p className="section-description">{section.description}</p>
          </div>
          <div className="image-content-wrapper">
            <img
              src={section.imageUrl || "/placeholder.svg"}
              alt={section.title}
              className="section-image"
            />
          </div>
        </section>
      ))}
    </div>
  );
};

export default DynamicSections;
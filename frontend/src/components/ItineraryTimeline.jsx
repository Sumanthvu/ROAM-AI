// src/components/ItineraryTimeline.jsx

import React from 'react';
import './ItineraryDisplay.css'; // We can reuse the same CSS for the timeline part

const ItineraryTimeline = ({ timeline }) => {
  const renderStep = (step) => {
    switch (step.type) {
      case 'travel':
        return <p><strong>Travel:</strong> Go from {step.from} to {step.to} via {step.options[0].mode} ({step.options[0].time}).</p>;
      case 'accommodation':
        return <p><strong>Stay:</strong> Check in at {step.options[0].name}. {step.options[0].note}</p>;
      case 'spot':
        return <p><strong>Visit:</strong> {step.name} ({step.category}). {step.reason}</p>;
      case 'restaurant':
        return <p><strong>Eat:</strong> {step.options[0].note} at {step.options[0].name}.</p>;
      case 'cuisine':
        return <p><strong>Try:</strong> {step.dish}, a local dish from {step.origin}.</p>;
      case 'break':
        return <p><strong>Break:</strong> {step.activity} ({step.duration}).</p>;
      default:
        return null;
    }
  };

  return (
    <div className="timeline">
      {timeline.map((day) => (
        <div key={day.day} className="day-card">
          <h3 className="day-title">Day {day.day}</h3>
          <div className="day-steps">
            {day.steps.map((step, index) => (
              <div key={index} className="step">
                <div className="step-time">
                  {step.arrival_time ? `${step.arrival_time}` : ''}
                </div>
                <div className="step-content">
                  {renderStep(step)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
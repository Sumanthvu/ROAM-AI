// src/components/ItineraryTimeline.jsx

import React from 'react';
import './ItineraryTimeline.css'; // We'll create a new, dedicated CSS file

const ItineraryTimeline = ({ timeline }) => {
  const getIconForStep = (type) => {
    switch (type) {
      case 'travel': return '🚗';
      case 'accommodation': return '🏨';
      case 'spot': return '📍';
      case 'restaurant': return '🍴';
      case 'cuisine': return '🍲';
      case 'break': return '☕';
      default: return '➡️';
    }
  };

  const renderStepDetails = (step) => {
    switch (step.type) {
      case 'travel':
        return (
          <div className="step-details">
            <p className="step-primary">Travel from {step.from} to {step.to}</p>
            {step.options?.map((opt, i) => (
              <p key={i} className="step-secondary">{opt.mode} ({opt.time}, ~{opt.cost})</p>
            ))}
          </div>
        );
      case 'accommodation':
        return (
          <div className="step-details">
            <p className="step-primary">Check-in to your Accommodation</p>
            <p className="step-secondary">Suggestions:</p>
            {step.options?.map((opt, i) => (
              <p key={i} className="step-suggestion">{opt.name} - {opt.price_range}, {opt.rating} ⭐</p>
            ))}
          </div>
        );
      case 'spot':
        return (
          <div className="step-details">
            <p className="step-primary">Visit: {step.name}</p>
            <p className="step-secondary">"{step.reason}"</p>
          </div>
        );
      case 'restaurant':
        return (
          <div className="step-details">
            <p className="step-primary">Dine at: {step.options[0].name}</p>
            <p className="step-secondary">Cuisines: {step.options[0].cuisines_served?.join(', ')}</p>
          </div>
        );
      case 'cuisine':
        return (
          <div className="step-details">
            <p className="step-primary">Local Dish: {step.dish}</p>
            <p className="step-secondary">Origin: {step.origin} | Recommended for: {step.time_to_consume}</p>
          </div>
        );
      case 'break':
        return (
          <div className="step-details">
            <p className="step-primary">Break: {step.activity}</p>
            <p className="step-secondary">Duration: {step.duration}</p>
          </div>
        );
      default:
        return <p>Invalid step type</p>;
    }
  };

  return (
    <div className="timeline-container">
      {timeline.map((day) => (
        <div key={day.day} className="day-container">
          <h3 className="day-title-timeline">Day {day.day}</h3>
          {day.steps.map((step, index) => (
            <div key={index} className="step-container">
              <div className="step-icon">{getIconForStep(step.type)}</div>
              <div className="step-content-wrapper">
                <div className="step-time-range">
                  {step.depart_time && step.arrival_time ? `${step.depart_time} - ${step.arrival_time}` : step.arrival_time || ''}
                </div>
                {renderStepDetails(step)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
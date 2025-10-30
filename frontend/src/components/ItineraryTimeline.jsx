// src/components/ItineraryTimeline.jsx

import React from 'react';
import './ItineraryTimeline.css';

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

  // Helper function to get the correct time label based on available data
  const getTimeLabel = (step) => {
    if (step.time) return `Time: ${step.time}`;
    if (step.depart_time && step.arrival_time) return `Time: ${step.depart_time} - ${step.arrival_time}`;
    if (step.arrival_time) return `Arrival Time: ${step.arrival_time}`;
    return null; // Return nothing if no time is specified
  };

  const renderStepDetails = (step) => {
    const timeLabel = getTimeLabel(step);
    
    // Determine the primary title for the step card
    let primaryTitle = step.type.replace('_', ' ');
    if (step.type === 'travel') {
        primaryTitle = `Travel from ${step.from} to ${step.to}`;
    } else if (step.type === 'accommodation') {
        primaryTitle = 'Check-in to your Accommodation';
    } else if (step.name) {
        primaryTitle = `Visit: ${step.name}`;
    } else if (step.activity) {
        primaryTitle = `Break: ${step.activity}`;
    } else if (step.options && step.options[0] && step.options[0].name) {
        primaryTitle = `Dine at: ${step.options[0].name}`;
    }

    return (
      <div className="step-card">
        <div className="step-header">
          <p className="step-primary-title">{primaryTitle}</p>
          {timeLabel && <p className="step-time">{timeLabel}</p>}
        </div>

        <div className="step-body">
            {step.type === 'spot' && step.reason && <p className="step-reason">"{step.reason}"</p>}
            
            {step.type === 'accommodation' && (
              <>
                <p className="step-suggestion-title">Suggestions:</p>
                {step.options?.map((opt, i) => (
                  <p key={i} className="step-suggestion">{opt.name} - {opt.price_range}, {opt.rating} ⭐</p>
                ))}
              </>
            )}

            {step.type === 'restaurant' && step.options?.[0]?.cuisines_served && (
                <>
                  <p className="step-suggestion-title">Cuisines:</p>
                  <div className="step-pills">
                      {step.options[0].cuisines_served.map((cuisine, i) => <span key={i} className="pill">{cuisine}</span>)}
                  </div>
                </>
            )}

            {step.type === 'travel' && step.options && (
                 <div className="step-pills">
                    {step.options.map((opt, i) => <span key={i} className="pill">{opt.mode} ({opt.time}, ~{opt.cost})</span>)}
                </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="timeline-container">
      {timeline.map((day) => (
        <div key={day.day} className="day-wrapper">
          <h3 className="day-title">Day {day.day}</h3>
          <div className="day-timeline">
            {day.steps.map((step, index) => (
              <div key={index} className="step-wrapper">
                <div className="step-icon-container">
                  <div className="step-icon">{getIconForStep(step.type)}</div>
                </div>
                {renderStepDetails(step)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
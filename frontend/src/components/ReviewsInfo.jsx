// src/components/ReviewsInfo.jsx
import React from 'react';
import './InfoTabs.css';

const ReviewsInfo = ({ reviews }) => {
  if (!reviews) return <p>No review information available.</p>;
  return (
    <div className="info-tab-container">
      <div className="info-section">
        <h4 className="info-title">Attraction Reviews</h4>
        <div className="review-grid">
          {reviews.attractions?.map((item, i) => (
            <div key={i} className="review-card">
              <h5>{item.name} <span>⭐ {item.average_rating}</span></h5>
              <p><strong>Pros:</strong> {item.pros?.join(', ')}</p>
              <p><strong>Cons:</strong> {item.cons?.join(', ')}</p>
              <p className="tip"><strong>Tip:</strong> {item.tip}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="info-section">
        <h4 className="info-title">Restaurant Reviews</h4>
        <div className="review-grid">
          {reviews.restaurants?.map((item, i) => (
            <div key={i} className="review-card">
              <h5>{item.name} <span>⭐ {item.average_rating}</span></h5>
              <p><strong>Pros:</strong> {item.pros?.join(', ')}</p>
              <p><strong>Cons:</strong> {item.cons?.join(', ')}</p>
              <p className="tip"><strong>Tip:</strong> {item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ReviewsInfo;
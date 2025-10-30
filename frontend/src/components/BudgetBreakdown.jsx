// src/components/BudgetBreakdown.jsx

import React from 'react';
import './BudgetBreakdown.css'; // New dedicated CSS

const BudgetBreakdown = ({ budget }) => {
  if (!budget) {
    return <p>No budget information available.</p>;
  }

  const { budget_range, per_day_estimate_per_person, notes } = budget;

  return (
    <div className="budget-container">
      <h2 className="budget-main-title">Budget Breakdown</h2>
      <div className="budget-grid">
        <div className="budget-card">
          <div className="budget-card-header">
            <h3>Total Budget Range</h3>
          </div>
          <div className="budget-card-content">
            <ul>
              <li><strong>Transport:</strong> ₹{budget_range?.transport.join(' - ₹')}</li>
              <li><strong>Accommodation:</strong> ₹{budget_range?.accommodation.join(' - ₹')}</li>
              <li><strong>Food:</strong> ₹{budget_range?.food.join(' - ₹')}</li>
              <li><strong>Entertainment:</strong> ₹{budget_range?.entertainment.join(' - ₹')}</li>
            </ul>
          </div>
        </div>

        <div className="budget-card">
          <div className="budget-card-header">
            <h3>Per Day Estimate (Per Person)</h3>
          </div>
          <div className="budget-card-content">
            <ul>
              <li><strong>Transport:</strong> {per_day_estimate_per_person?.transport}</li>
              <li><strong>Accommodation:</strong> {per_day_estimate_per_person?.accommodation}</li>
              <li><strong>Food:</strong> {per_day_estimate_per_person?.food}</li>
              <li><strong>Entertainment:</strong> {per_day_estimate_per_person?.entertainment}</li>
              <li className="total"><strong>Total:</strong> {per_day_estimate_per_person?.total}</li>
            </ul>
          </div>
        </div>
        
        {notes && notes.length > 0 && (
          <div className="budget-card full-width">
            <div className="budget-card-header">
              <h3>Notes</h3>
            </div>
            <div className="budget-card-content">
              <ul>
                {notes.map((note, index) => <li key={index}>{note}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetBreakdown;
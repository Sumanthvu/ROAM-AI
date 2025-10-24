// src/pages/DashboardPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './DashboardPage.css';
import LoadingSpinner from '../components/LoadingSpinner';
import SuggestionCard from '../components/SuggestionCard';

const DashboardPage = () => {
  const [preferences, setPreferences] = useState({
    travel_type: 'Adventure',
    total_budget: '50000',
    no_of_people: '2',
    group_type: 'friends',
    duration: '5',
    interests: 'mountains, trekking',
    start_date: new Date().toISOString().split('T')[0],
    planning_style: 'Holiday based',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [flowStep, setFlowStep] = useState('preferences');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mlModelUrl = import.meta.env.VITE_ML_MODEL_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuggestions([]);

    const payload = {
      ...preferences,
      total_budget: parseInt(preferences.total_budget, 10),
      no_of_people: parseInt(preferences.no_of_people, 10),
      duration: parseInt(preferences.duration, 10),
      budget_range: null,
    };

    try {
      // We send the 'payload' object directly, WITHOUT the extra 'preferences' wrapper.
      const response = await axios.post(`${mlModelUrl}/generate`, payload);

      if (response.data && response.data.places && response.data.places.length > 0) {
        setSuggestions(response.data.places);
        setFlowStep('suggestions');
      } else {
        setError('No suggestions found. Please try different preferences.');
      }
    } catch (err) {
      let specificError = 'Failed to fetch suggestions. Please check your input and try again.';
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail) && err.response.data.detail[0]?.msg) {
          const errorDetail = err.response.data.detail[0];
          specificError = `${errorDetail.msg} (field: ${errorDetail.loc[1]})`;
        } else {
          specificError = JSON.stringify(err.response.data.detail);
        }
      } else if (err.message) {
        specificError = err.message;
      }
      setError(specificError);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    // For now, we'll just log it. Next, we will trigger the next API call here.
    console.log("Selected Place:", place);
  };


  return (
    <div className="dashboard-container">
      {loading && <LoadingSpinner />}

      {flowStep === 'preferences' && (
        <div className="form-section">
            <h1 className="dashboard-title">Plan Your Next Adventure</h1>
            <p className="dashboard-subtitle">Tell us your preferences, and we'll suggest the perfect destinations for you.</p>
            <form onSubmit={handlePreferencesSubmit} className="preferences-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="travel_type">Travel Style</label>
                        <select name="travel_type" id="travel_type" value={preferences.travel_type} onChange={handleInputChange}>
                            <option value="Adventure">Adventure</option>
                            <option value="Leisure">Leisure</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Romantic">Romantic</option>
                            <option value="Family">Family</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="total_budget">Total Budget (INR)</label>
                        <input type="number" name="total_budget" id="total_budget" placeholder="e.g., 50000" value={preferences.total_budget} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="no_of_people">Number of People</label>
                        <input type="number" name="no_of_people" id="no_of_people" min="1" max="30" value={preferences.no_of_people} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="group_type">Group Type</label>
                        <select name="group_type" id="group_type" value={preferences.group_type} onChange={handleInputChange}>
                            <option value="friends">Friends</option>
                            <option value="family">Family</option>
                            <option value="couple">Couple</option>
                            <option value="solo">Solo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration (in days)</label>
                        <input type="number" name="duration" id="duration" min="1" max="45" placeholder="e.g., 5" value={preferences.duration} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_date">Start Date</label>
                        <input type="date" name="start_date" id="start_date" value={preferences.start_date} onChange={handleInputChange} />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="interests">Interests</label>
                        <input type="text" name="interests" id="interests" placeholder="e.g., mountains, trekking, beaches" value={preferences.interests} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="planning_style">Planning Style</label>
                        <select name="planning_style" id="planning_style" value={preferences.planning_style} onChange={handleInputChange}>
                            <option value="Not specified">Not specified</option>
                            <option value="Holiday based">Holiday based</option>
                            <option value="Season based">Season based</option>
                        </select>
                    </div>
                </div>
                {error && <p className="error-message form-error">{error}</p>}
                <button type="submit" className="submit-button" disabled={loading}>Get Suggestions</button>
            </form>
        </div>
      )}

      {flowStep === 'suggestions' && (
        <div className="suggestions-section">
          <h2 className="suggestions-title">Here are some suggestions for you:</h2>
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <SuggestionCard key={index} suggestion={suggestion} onSelect={handlePlaceSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
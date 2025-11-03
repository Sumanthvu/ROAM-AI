// src/pages/ProfilePage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMySavedTrips, deleteTrip } from "../api/tripApi";
import { updateUserCoverImage } from "../api/userApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileImageModal from "../components/ProfileImageModal";
import ConfirmationModal from "../components/ConfirmationModal";
import FloatingBackground from "../components/FloatingBackground";
import SavedTripPinCard from "../components/SavedTripPinCard"; // The card component itself
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await getMySavedTrips();
        if (response.success) {
          setTrips(response.data);
        }
      } catch (err) {
        setError("Failed to load your saved trips.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const openDeleteConfirmation = (tripId) => {
    setTripToDelete(tripId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!tripToDelete) return;
    try {
      await deleteTrip(tripToDelete);
      setTrips(trips.filter((trip) => trip._id !== tripToDelete));
      setMessage("Trip successfully deleted.");
    } catch (err) {
      setError("Failed to delete the trip. Please try again.");
    } finally {
      setIsConfirmModalOpen(false);
      setTripToDelete(null);
    }
  };

  const handleImageChange = async (file) => {
    const formData = new FormData();
    formData.append("coverImage", file);
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await updateUserCoverImage(formData);
      if (response.success) {
        updateUser(response.data);
        setMessage("Profile image updated successfully!");
      }
    } catch (err) {
      setError(err.message || "Failed to update image.");
    } finally {
      setLoading(false);
      setIsAvatarModalOpen(false);
    }
  };

  const handleImageRemove = async () => {
    const formData = new FormData();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await updateUserCoverImage(formData);
      if (response.success) {
        updateUser(response.data);
        setMessage("Profile image removed.");
      }
    } catch (err) {
      setError(err.message || "Failed to remove image.");
    } finally {
      setLoading(false);
      setIsAvatarModalOpen(false);
    }
  };

  const handleShowItinerary = (e, trip) => {
    e.preventDefault();
    navigate(`/trip/${trip._id}`, { state: { trip } });
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page-container">
      {loading && <LoadingSpinner />}
      {isAvatarModalOpen && (
        <ProfileImageModal
          user={user}
          onClose={() => setIsAvatarModalOpen(false)}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
        />
      )}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Trip Deletion"
        message="Are you sure you want to permanently delete this trip itinerary? This action cannot be undone."
      />

      <div className="profile-header">
        <FloatingBackground />
        <div
          className="profile-avatar-wrapper"
          onClick={() => setIsAvatarModalOpen(true)}
        >
          <img
            src={user.coverImage || "/default.png"}
            alt={user.userName}
            className="profile-avatar"
          />
          <div className="avatar-overlay">Click to change</div>
        </div>
        <div className="profile-info">
          <h1 className="profile-username">{user.userName}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <div className="saved-trips-section">
        <h2 className="section-title">My Saved Itineraries</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && trips.length === 0 ? (
          <p className="no-trips-message">You haven't saved any trips yet.</p>
        ) : (
          <div className="saved-trips-grid">
            {trips.map((trip, index) => (
              // The wrapper now directly handles the click and contains the card
              <div
                key={trip._id}
                className="trip-card-wrapper"
                // The style attribute adds a staggered delay to the entry animation
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={(e) => handleShowItinerary(e, trip)}
              >
                <SavedTripPinCard
                  trip={trip}
                  onDelete={openDeleteConfirmation}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

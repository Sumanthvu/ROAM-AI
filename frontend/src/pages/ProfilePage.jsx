// src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMySavedTrips, deleteTrip } from '../api/tripApi';
import { updateUserCoverImage } from '../api/userApi';
import LoadingSpinner from '../components/LoadingSpinner';
import SavedTripCard from '../components/SavedTripCard';
import ProfileImageModal from '../components/ProfileImageModal';
import ConfirmationModal from '../components/ConfirmationModal';
import DotGrid from '../components/DotGrid';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => { setError(''); setLoading(true); try { const response = await getMySavedTrips(); if (response.success) { setTrips(response.data); } } catch (err) { setError('Failed to load your saved trips.'); } finally { setLoading(false); } };
    fetchTrips();
  }, []);

  const openDeleteConfirmation = (tripId) => { setTripToDelete(tripId); setIsConfirmModalOpen(true); };
  const handleConfirmDelete = async () => { if (!tripToDelete) return; try { await deleteTrip(tripToDelete); setTrips(trips.filter(trip => trip._id !== tripToDelete)); setMessage("Trip successfully deleted."); } catch (err) { setError('Failed to delete the trip. Please try again.'); } finally { setIsConfirmModalOpen(false); setTripToDelete(null); } };
  const handleImageChange = async (file) => { const formData = new FormData(); formData.append('coverImage', file); setLoading(true); setMessage(''); setError(''); try { const response = await updateUserCoverImage(formData); if (response.success) { updateUser(response.data); setMessage('Profile image updated successfully!'); } } catch (err) { setError(err.message || 'Failed to update image.'); } finally { setLoading(false); setIsAvatarModalOpen(false); } };
  const handleImageRemove = async () => { const formData = new FormData(); setLoading(true); setMessage(''); setError(''); try { const response = await updateUserCoverImage(formData); if (response.success) { updateUser(response.data); setMessage('Profile image removed.'); } } catch(err) { setError(err.message || 'Failed to remove image.'); } finally { setLoading(false); setIsAvatarModalOpen(false); } };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page-container">
      {loading && <LoadingSpinner />}
      {isAvatarModalOpen && ( <ProfileImageModal user={user} onClose={() => setIsAvatarModalOpen(false)} onImageChange={handleImageChange} onImageRemove={handleImageRemove} /> )}
      <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={handleConfirmDelete} title="Confirm Trip Deletion" message="Are you sure you want to permanently delete this trip itinerary? This action cannot be undone." />

      <div className="profile-header">
        <DotGrid
          dotSize={4}
          gap={12}
          baseColor="#1e293b" 
          activeColor="#5227FF" 
          proximity={120}
          shockRadius={500}
          shockStrength={10}
          resistance={750}
          returnDuration={1.5}
        />
        <div className="profile-avatar-wrapper" onClick={() => setIsAvatarModalOpen(true)}>
          <img 
            src={user.coverImage || `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAnQMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQQFAgMGB//EADEQAAIBAwEHAgQFBQAAAAAAAAABAgMEETEFEhMhQVFhInEyM5GxQkNSgaEjNGJywf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cQAAAIbwBJxUqwpRzUmoryU7q/Ucwo4lLq+xmzqTqScpycn5A0Ku0lpSg35ZVneV5vnNpf48iuComUpS1k37sjAADTQ7jVqR+GbXszgAWqd/XhjLU12Zco7QpVOU04PzoZICvok01lNNPqSYNC5qUH6Jen9L0Na2u6dfkuUusWQWAAAAAAAAQ2kst4RlX146jcKTxBavud7Rut5ujB8l8T/AOGeUAAEAAAAAAAAAAAJTcWmnhrqQANeyvFWShUaU/uXD51Nppp4a0Zs2Nyq9Ln8a+JEVZAAArX1fg0cr4pckWTEv6vFuJLpHkgK4AKgAAABMU5SxFNvsgIBfo7NlL1VZYz0WpZWz7dLnFv9yKxwa89nUWvTvRfuUq9jUo84rej3RUVQAAAAA9KFV0asZrvz8o8wB9DCSnFSWjWUdGfsqrmDpS1jzXsaBFeV1U4VvOfZGDz6mrtWeKEYfqkZQQABQAADm3hLJsWVqqEN6SzUevjwUdnUuJcZekFn9zZIqMEgACGiQBl7QtFD+rTWI/iXYoH0NSKnFxkuT5MwJxcJyi9U8FHIACAAA9rSpwriEvOH7G4fOn0FGW/ShLvFEVn7XfrprsmZ5e2t86H+pRKgAAAAA0dkL5r9jSMnZU92tKD/ABI1iKAAAAAIZiXqxdVMdzbfcwa8+JWnPuwPMAFQAAA27B5tKfjkYhs7O/tIfv8AcKrbWXOm/dGea21Ib1upfpZkkQABQAAHVOcqc4zjqnlG5QqxrU1OL11XYwT2t686Esw0eq7kG6CtRvaNXC3lGXaRYTzoFSDmU1BZk0l5KVxtCEU40fVLv0QHW0bjh03Ti/XL+EZJ1OTlJyk22+rOSgAAgAABt2K3bWmvGTFS3mkupv0o7lOMeySCorw4lKcO6MFpptPVH0Rj7So8OtxEvTP7kFQAFQAAAE9UurLNGxq1FmXoXnX6AVSU305GrT2bRS9blJ/Q9VZW6/LX1YGLlvV/Ug2nY2z/AC0vZnhU2bB/LnKL88wMwHvWtK1Hm45ivxI8AAAAAACzYUuLcRzpHmzaKWzaLp0t+S9U/sXSKHjdUFXpOD16Psz2AHz04uEnGSw08M5NW/teKuJTXrWvlGUVA9KNGdae7Be7fQilTlVmoR1ZtW1CNCmoLXq+7A5trSFBclmfWTLABFAAAAAEYKd3YxqJyp4jLt0ZdAHz04uEnGSaa1TOTYvbXjQ3o/MX8mQ9Sog97O349ZZ+GPNnnSpyqz3ILLZtW9CNCmoR16vuRXqkklhEgAAABGCje2XEzUpLEuse5fAFHZtDcg5yWJPlh9EXjlx6rUKWPiWAOgAAAAAAAACG0teQEmZe2kp106Szv6+DRy5aadyVFIDxtbeFvHC5yerPcAAAAAAAAAAMAAcNYfIlPLAA6IyAAyRkADlyeTpJNZYAHWAAAAAAAAf/2Q==`} 
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
            {trips.map((trip) => (
              <SavedTripCard 
                key={trip._id} 
                trip={trip} 
                onDelete={openDeleteConfirmation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
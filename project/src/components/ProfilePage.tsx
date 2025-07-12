import React, { useState } from 'react';
import { Edit2, Save, X, Plus, Star, Calendar, MapPin, Globe, Lock, Camera } from 'lucide-react';
import { User, Review } from '../App';

interface ProfilePageProps {
  currentUser: User;
  onUpdateUser: (user: User) => void;
  reviews: Review[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, onUpdateUser, reviews }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(currentUser);
  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(currentUser);
    setIsEditing(false);
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEditedUser({ ...editedUser, profilePhoto: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addOfferedSkill = () => {
    if (newOfferedSkill.trim() && !editedUser.skillsOffered.includes(newOfferedSkill.trim())) {
      setEditedUser({
        ...editedUser,
        skillsOffered: [...editedUser.skillsOffered, newOfferedSkill.trim()]
      });
      setNewOfferedSkill('');
    }
  };

  const addWantedSkill = () => {
    if (newWantedSkill.trim() && !editedUser.skillsWanted.includes(newWantedSkill.trim())) {
      setEditedUser({
        ...editedUser,
        skillsWanted: [...editedUser.skillsWanted, newWantedSkill.trim()]
      });
      setNewWantedSkill('');
    }
  };

  const removeOfferedSkill = (skillToRemove: string) => {
    setEditedUser({
      ...editedUser,
      skillsOffered: editedUser.skillsOffered.filter(skill => skill !== skillToRemove)
    });
  };

  const removeWantedSkill = (skillToRemove: string) => {
    setEditedUser({
      ...editedUser,
      skillsWanted: editedUser.skillsWanted.filter(skill => skill !== skillToRemove)
    });
  };

  const toggleAvailability = (availability: string) => {
    if (editedUser.availability.includes(availability)) {
      setEditedUser({
        ...editedUser,
        availability: editedUser.availability.filter(a => a !== availability)
      });
    } else {
      setEditedUser({
        ...editedUser,
        availability: [...editedUser.availability, availability]
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                {editedUser.profilePhoto ? (
                  <img 
                    src={editedUser.profilePhoto} 
                    alt={editedUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-300">
                    {editedUser.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
              {currentUser.location && (
                <div className="flex items-center space-x-1 text-gray-400 mt-1">
                  <MapPin size={16} />
                  <span>{currentUser.location}</span>
                </div>
              )}
              <div className="flex items-center space-x-1 text-yellow-400 mt-1">
                <Star size={16} fill="currentColor" />
                <span>{currentUser.rating.toFixed(1)}</span>
                <span className="text-gray-400">({currentUser.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-400 mt-1">
                <Calendar size={16} />
                <span>Joined {new Date(currentUser.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Edit2 size={16} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Privacy Setting */}
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            {editedUser.isPublic ? <Globe size={20} className="text-green-400" /> : <Lock size={20} className="text-red-400" />}
            <div>
              <h3 className="font-medium text-white">Profile Visibility</h3>
              <p className="text-sm text-gray-400">
                {editedUser.isPublic ? 'Your profile is public and discoverable' : 'Your profile is private'}
              </p>
            </div>
          </div>
          {isEditing && (
            <button
              onClick={() => setEditedUser({ ...editedUser, isPublic: !editedUser.isPublic })}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                editedUser.isPublic 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {editedUser.isPublic ? 'Public' : 'Private'}
            </button>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{currentUser.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{currentUser.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.location || ''}
                onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                placeholder="Enter your location"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{currentUser.location || 'Not specified'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section - Side by Side as per prototype */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Offered */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Skills I Can Offer</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {editedUser.skillsOffered.map((skill, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm border border-green-800 flex items-center space-x-2"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => removeOfferedSkill(skill)}
                    className="text-green-300 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <input
                type="text"
                value={newOfferedSkill}
                onChange={(e) => setNewOfferedSkill(e.target.value)}
                placeholder="Add a skill you can offer..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOfferedSkill())}
              />
              <button
                onClick={addOfferedSkill}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>

        {/* Skills Wanted */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Skills I Want to Learn</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {editedUser.skillsWanted.map((skill, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm border border-blue-800 flex items-center space-x-2"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => removeWantedSkill(skill)}
                    className="text-blue-300 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <input
                type="text"
                value={newWantedSkill}
                onChange={(e) => setNewWantedSkill(e.target.value)}
                placeholder="Add a skill you want to learn..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWantedSkill())}
              />
              <button
                onClick={addWantedSkill}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Availability</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Weekdays', 'Weekends', 'Evenings', 'Mornings'].map((time) => (
            <label key={time} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editedUser.availability.includes(time)}
                onChange={() => isEditing && toggleAvailability(time)}
                disabled={!isEditing}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-white">{time}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save/Cancel buttons */}
      {isEditing && (
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
        </div>
      )}

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Reviews & Feedback</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-yellow-400">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-500'}
                        />
                      ))}
                    </div>
                    <span className="text-white font-medium">{review.rating}/5</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{review.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
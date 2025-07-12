import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, MessageSquare, Calendar } from 'lucide-react';
import { User, SwapRequest, Review } from '../App';
import SwapRequestModal from './SwapRequestModal';

interface UserDetailPageProps {
  user: User;
  currentUser: User | null;
  reviews: Review[];
  onCreateSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  onBack: () => void;
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({
  user,
  currentUser,
  reviews,
  onCreateSwapRequest,
  onBack
}) => {
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleRequestSwap = () => {
    if (!currentUser) {
      alert('Please login to send swap requests');
      return;
    }
    setShowRequestModal(true);
  };

  const handleCreateRequest = (request: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    onCreateSwapRequest(request);
    setShowRequestModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Browse</span>
      </button>

      {/* Profile Header */}
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
            {user.profilePhoto ? (
              <img 
                src={user.profilePhoto} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-gray-300">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            {user.location && (
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <MapPin size={18} />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-yellow-400 mb-2">
              <Star size={18} fill="currentColor" />
              <span className="text-lg font-semibold">{user.rating.toFixed(1)}</span>
              <span className="text-gray-400">({user.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 mb-4">
              <Calendar size={18} />
              <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
            
            {currentUser && currentUser.id !== user.id && (
              <button
                onClick={handleRequestSwap}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Request Skill Swap</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Offered */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Skills Offered</h2>
          {user.skillsOffered.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm border border-green-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No skills offered yet</p>
          )}
        </div>

        {/* Skills Wanted */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Skills Wanted</h2>
          {user.skillsWanted.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm border border-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No skills wanted yet</p>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Availability</h2>
        {user.availability.length > 0 ? (
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock size={18} />
            <span>{user.availability.join(', ')}</span>
          </div>
        ) : (
          <p className="text-gray-400">No availability specified</p>
        )}
      </div>

      {/* Reviews and Feedback */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Reviews & Feedback</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
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
        ) : (
          <div className="text-center py-8">
            <Star size={48} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No reviews yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Be the first to complete a skill swap and leave feedback!
            </p>
          </div>
        )}
      </div>

      {/* Swap Request Modal */}
      {showRequestModal && currentUser && (
        <SwapRequestModal
          currentUser={currentUser}
          targetUser={user}
          onCreateRequest={handleCreateRequest}
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </div>
  );
};

export default UserDetailPage;
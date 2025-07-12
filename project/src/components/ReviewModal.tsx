import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { User, SwapRequest, Review } from '../App';

interface ReviewModalProps {
  request: SwapRequest;
  currentUser: User;
  users: User[];
  onAddReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  request,
  currentUser,
  users,
  onAddReview,
  onClose
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const otherUser = users.find(u => u.id === (request.fromUser === currentUser.id ? request.toUser : request.fromUser));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      return;
    }

    onAddReview({
      swapId: request.id,
      fromUser: currentUser.id,
      toUser: otherUser!.id,
      rating,
      feedback: feedback || `Great experience swapping ${request.offeredSkill} for ${request.requestedSkill}!`
    });
  };

  if (!otherUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Rate Your Experience</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center mx-auto mb-3">
              {otherUser.profilePhoto ? (
                <img 
                  src={otherUser.profilePhoto} 
                  alt={otherUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-300">
                  {otherUser.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white">{otherUser.name}</h3>
            <p className="text-gray-400 text-sm">
              {request.offeredSkill} ↔ {request.requestedSkill}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
              How was your experience?
            </label>
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-colors"
                  >
                    <Star
                      size={32}
                      fill={starValue <= (hoveredRating || rating) ? '#FCD34D' : 'none'}
                      className={starValue <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-500'}
                    />
                  </button>
                );
              })}
            </div>
            {rating > 0 && (
              <p className="text-center text-gray-300 mt-2">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your experience with the skill swap..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Skip Review
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
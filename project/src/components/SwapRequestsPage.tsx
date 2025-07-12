import React, { useState } from 'react';
import { Clock, Check, X, Star, Trash2, MessageSquare } from 'lucide-react';
import { User, SwapRequest, Review } from '../App';
import ReviewModal from './ReviewModal';

interface SwapRequestsPageProps {
  currentUser: User;
  users: User[];
  swapRequests: SwapRequest[];
  onUpdateRequest: (requestId: string, status: SwapRequest['status']) => void;
  onDeleteRequest: (requestId: string) => void;
  onAddReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const SwapRequestsPage: React.FC<SwapRequestsPageProps> = ({
  currentUser,
  users,
  swapRequests,
  onUpdateRequest,
  onDeleteRequest,
  onAddReview
}) => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [reviewModalRequest, setReviewModalRequest] = useState<SwapRequest | null>(null);

  const receivedRequests = swapRequests.filter(req => req.toUser === currentUser.id);
  const sentRequests = swapRequests.filter(req => req.fromUser === currentUser.id);

  const getUserById = (userId: string) => users.find(u => u.id === userId);

  const getStatusColor = (status: SwapRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'accepted': return 'text-green-400 bg-green-900/30 border-green-800';
      case 'rejected': return 'text-red-400 bg-red-900/30 border-red-800';
      case 'completed': return 'text-blue-400 bg-blue-900/30 border-blue-800';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-800';
    }
  };

  const getStatusIcon = (status: SwapRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'accepted': return <Check size={16} />;
      case 'rejected': return <X size={16} />;
      case 'completed': return <Star size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const handleCompleteSwap = (request: SwapRequest) => {
    onUpdateRequest(request.id, 'completed');
    setReviewModalRequest(request);
  };

  const handleAddReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    onAddReview(review);
    setReviewModalRequest(null);
  };

  const renderRequestCard = (request: SwapRequest, isReceived: boolean) => {
    const otherUser = getUserById(isReceived ? request.fromUser : request.toUser);
    if (!otherUser) return null;

    return (
      <div key={request.id} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
              {otherUser.profilePhoto ? (
                <img 
                  src={otherUser.profilePhoto} 
                  alt={otherUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-gray-300">
                  {otherUser.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{otherUser.name}</h3>
              <p className="text-gray-400 text-sm">
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-lg border text-sm flex items-center space-x-1 ${getStatusColor(request.status)}`}>
            {getStatusIcon(request.status)}
            <span className="capitalize">{request.status}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-1">
                {isReceived ? 'They offer' : 'You offer'}
              </h4>
              <span className="px-3 py-1 bg-green-900/30 text-green-300 rounded-lg text-sm border border-green-800">
                {request.offeredSkill}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-1">
                {isReceived ? 'They want' : 'You want'}
              </h4>
              <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-lg text-sm border border-blue-800">
                {request.requestedSkill}
              </span>
            </div>
          </div>

          {request.message && (
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Message</h4>
              <p className="text-gray-300 text-sm">{request.message}</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex space-x-3">
          {isReceived && request.status === 'pending' && (
            <>
              <button
                onClick={() => onUpdateRequest(request.id, 'accepted')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Check size={16} />
                <span>Accept</span>
              </button>
              <button
                onClick={() => onUpdateRequest(request.id, 'rejected')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <X size={16} />
                <span>Reject</span>
              </button>
            </>
          )}

          {!isReceived && request.status === 'pending' && (
            <button
              onClick={() => onDeleteRequest(request.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Trash2 size={16} />
              <span>Cancel Request</span>
            </button>
          )}

          {request.status === 'accepted' && (
            <button
              onClick={() => handleCompleteSwap(request)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Star size={16} />
              <span>Mark as Completed</span>
            </button>
          )}

          {request.status === 'completed' && (
            <div className="flex items-center space-x-2 text-green-400">
              <Check size={16} />
              <span className="text-sm">Swap completed</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-4">Swap Requests</h1>
        <p className="text-gray-400">
          Manage your skill swap requests. Accept or reject incoming requests, and track your sent requests.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('received')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'received'
                ? 'text-white bg-gray-700 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <MessageSquare size={20} />
              <span>Received ({receivedRequests.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'sent'
                ? 'text-white bg-gray-700 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <MessageSquare size={20} />
              <span>Sent ({sentRequests.length})</span>
            </div>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'received' ? (
            <div className="space-y-4">
              {receivedRequests.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No requests received yet</p>
                  <p className="text-gray-500 text-sm mt-2">
                    When others request to swap skills with you, they'll appear here.
                  </p>
                </div>
              ) : (
                receivedRequests.map(request => renderRequestCard(request, true))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {sentRequests.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No requests sent yet</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Browse profiles on the home page to send your first swap request.
                  </p>
                </div>
              ) : (
                sentRequests.map(request => renderRequestCard(request, false))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalRequest && (
        <ReviewModal
          request={reviewModalRequest}
          currentUser={currentUser}
          users={users}
          onAddReview={handleAddReview}
          onClose={() => setReviewModalRequest(null)}
        />
      )}
    </div>
  );
};

export default SwapRequestsPage;
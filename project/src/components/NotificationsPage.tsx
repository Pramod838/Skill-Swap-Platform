import React from 'react';
import { Bell, MessageSquare, Check, X, Star, Clock } from 'lucide-react';
import { User, SwapRequest } from '../App';

interface NotificationsPageProps {
  currentUser: User;
  swapRequests: SwapRequest[];
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({
  currentUser,
  swapRequests
}) => {
  const userRequests = swapRequests.filter(req => 
    req.toUser === currentUser.id || req.fromUser === currentUser.id
  );

  const getNotificationIcon = (status: SwapRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock size={20} className="text-yellow-400" />;
      case 'accepted': return <Check size={20} className="text-green-400" />;
      case 'rejected': return <X size={20} className="text-red-400" />;
      case 'completed': return <Star size={20} className="text-blue-400" />;
      default: return <MessageSquare size={20} className="text-gray-400" />;
    }
  };

  const getNotificationMessage = (request: SwapRequest) => {
    const isReceived = request.toUser === currentUser.id;
    
    if (isReceived) {
      switch (request.status) {
        case 'pending':
          return `New swap request for ${request.requestedSkill}`;
        case 'accepted':
          return `You accepted a swap request for ${request.requestedSkill}`;
        case 'rejected':
          return `You rejected a swap request for ${request.requestedSkill}`;
        case 'completed':
          return `Swap completed: ${request.offeredSkill} ↔ ${request.requestedSkill}`;
        default:
          return 'Swap request update';
      }
    } else {
      switch (request.status) {
        case 'pending':
          return `Your swap request for ${request.requestedSkill} is pending`;
        case 'accepted':
          return `Your swap request for ${request.requestedSkill} was accepted!`;
        case 'rejected':
          return `Your swap request for ${request.requestedSkill} was declined`;
        case 'completed':
          return `Swap completed: ${request.offeredSkill} ↔ ${request.requestedSkill}`;
        default:
          return 'Swap request update';
      }
    }
  };

  const getNotificationColor = (status: SwapRequest['status']) => {
    switch (status) {
      case 'pending': return 'border-l-yellow-500';
      case 'accepted': return 'border-l-green-500';
      case 'rejected': return 'border-l-red-500';
      case 'completed': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3">
          <Bell size={24} className="text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
        </div>
        <p className="text-gray-400 mt-2">
          Stay updated with your skill swap activities and requests.
        </p>
      </div>

      {/* Notifications List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6">
          {userRequests.length === 0 ? (
            <div className="text-center py-12">
              <Bell size={48} className="text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No notifications yet</p>
              <p className="text-gray-500 text-sm mt-2">
                When you send or receive swap requests, you'll see updates here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {userRequests
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((request) => (
                  <div
                    key={request.id}
                    className={`bg-gray-700 rounded-lg p-4 border-l-4 ${getNotificationColor(request.status)} border border-gray-600`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        {getNotificationIcon(request.status)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {getNotificationMessage(request)}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                          <span>{new Date(request.createdAt).toLocaleTimeString()}</span>
                          <span className="capitalize px-2 py-1 bg-gray-600 rounded text-xs">
                            {request.status}
                          </span>
                        </div>
                        {request.message && (
                          <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-600">
                            <p className="text-gray-300 text-sm italic">"{request.message}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Clock size={20} className="text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {userRequests.filter(r => r.status === 'pending').length}
              </p>
              <p className="text-gray-400 text-sm">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Check size={20} className="text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {userRequests.filter(r => r.status === 'accepted').length}
              </p>
              <p className="text-gray-400 text-sm">Accepted</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Star size={20} className="text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {userRequests.filter(r => r.status === 'completed').length}
              </p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <MessageSquare size={20} className="text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {userRequests.length}
              </p>
              <p className="text-gray-400 text-sm">Total Requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
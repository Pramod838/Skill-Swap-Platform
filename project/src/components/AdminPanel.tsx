import React, { useState } from 'react';
import { Shield, Users, MessageSquare, Star, Download, Ban, Trash2, Eye, Search } from 'lucide-react';
import { User, SwapRequest, Review } from '../App';

interface AdminPanelProps {
  users: User[];
  swapRequests: SwapRequest[];
  reviews: Review[];
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  swapRequests,
  reviews,
  onUpdateUser,
  onDeleteUser
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'swaps' | 'reviews'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const totalUsers = users.filter(u => !u.isAdmin).length;
  const totalSwaps = swapRequests.length;
  const completedSwaps = swapRequests.filter(r => r.status === 'completed').length;
  const pendingSwaps = swapRequests.filter(r => r.status === 'pending').length;

  const filteredUsers = users.filter(user => 
    !user.isAdmin && 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBanUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      onUpdateUser({ ...user, isPublic: false });
    }
  };

  const generateReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      totalUsers,
      totalSwaps,
      completedSwaps,
      pendingSwaps,
      averageRating: reviews.length > 0 ? 
        (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2) : 'N/A',
      users: users.filter(u => !u.isAdmin).map(u => ({
        name: u.name,
        email: u.email,
        skillsOffered: u.skillsOffered.length,
        skillsWanted: u.skillsWanted.length,
        rating: u.rating,
        reviewCount: u.reviewCount,
        isPublic: u.isPublic
      })),
      swapRequests: swapRequests.map(r => ({
        fromUser: users.find(u => u.id === r.fromUser)?.name || 'Unknown',
        toUser: users.find(u => u.id === r.toUser)?.name || 'Unknown',
        offeredSkill: r.offeredSkill,
        requestedSkill: r.requestedSkill,
        status: r.status,
        createdAt: r.createdAt
      }))
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill-swap-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
          <div className="flex items-center space-x-3">
            <Users size={24} className="text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{totalUsers}</p>
              <p className="text-gray-400">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
          <div className="flex items-center space-x-3">
            <MessageSquare size={24} className="text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{totalSwaps}</p>
              <p className="text-gray-400">Total Swaps</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
          <div className="flex items-center space-x-3">
            <Star size={24} className="text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">{completedSwaps}</p>
              <p className="text-gray-400">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
          <div className="flex items-center space-x-3">
            <Shield size={24} className="text-orange-400" />
            <div>
              <p className="text-2xl font-bold text-white">{pendingSwaps}</p>
              <p className="text-gray-400">Pending</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">Platform Actions</h3>
        <div className="space-y-4">
          <button
            onClick={generateReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download size={16} />
            <span>Download Platform Report</span>
          </button>
          <div className="text-sm text-gray-400">
            Generate a comprehensive report including user activity, swap statistics, and feedback logs.
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                  {user.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-300">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm">
                    <span className="text-green-400">{user.skillsOffered.length} skills offered</span>
                    <span className="text-blue-400">{user.skillsWanted.length} skills wanted</span>
                    <span className="text-yellow-400">★ {user.rating.toFixed(1)} ({user.reviewCount})</span>
                    <span className={user.isPublic ? 'text-green-400' : 'text-red-400'}>
                      {user.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBanUser(user.id)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
                >
                  <Ban size={14} />
                  <span>Make Private</span>
                </button>
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSwaps = () => (
    <div className="space-y-4">
      {swapRequests.map(request => {
        const fromUser = users.find(u => u.id === request.fromUser);
        const toUser = users.find(u => u.id === request.toUser);
        
        return (
          <div key={request.id} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-white font-medium">{fromUser?.name || 'Unknown'}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-white font-medium">{toUser?.name || 'Unknown'}</span>
                  <span className={`px-2 py-1 rounded text-xs capitalize ${
                    request.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                    request.status === 'accepted' ? 'bg-green-900/30 text-green-400' :
                    request.status === 'rejected' ? 'bg-red-900/30 text-red-400' :
                    'bg-blue-900/30 text-blue-400'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  {request.offeredSkill} ↔ {request.requestedSkill}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(request.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Eye size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-4">
      {reviews.map(review => {
        const fromUser = users.find(u => u.id === review.fromUser);
        const toUser = users.find(u => u.id === review.toUser);
        
        return (
          <div key={review.id} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-medium">{fromUser?.name || 'Unknown'}</span>
                  <span className="text-gray-400">reviewed</span>
                  <span className="text-white font-medium">{toUser?.name || 'Unknown'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? 'currentColor' : 'none'}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-500'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{review.rating}/5</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-300 text-sm">{review.feedback}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3">
          <Shield size={24} className="text-red-400" />
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        </div>
        <p className="text-gray-400 mt-2">
          Monitor platform activity, manage users, and oversee skill swap operations.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex border-b border-gray-700">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'swaps', label: 'Swaps', icon: MessageSquare },
            { id: 'reviews', label: 'Reviews', icon: Star }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-white bg-gray-700 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'swaps' && renderSwaps()}
          {activeTab === 'reviews' && renderReviews()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, MapPin, Clock, MessageSquare, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { User, SwapRequest, Review } from '../App';
import SwapRequestModal from './SwapRequestModal';

interface HomePageProps {
  currentUser: User | null;
  users: User[];
  reviews: Review[];
  onCreateSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  onViewProfile: (userId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  currentUser, 
  users, 
  reviews, 
  onCreateSwapRequest, 
  onViewProfile 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  const usersPerPage = 4; // Changed to 4 to match prototype layout

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (user.id === currentUser?.id || !user.isPublic || user.isAdmin) return false;
      
      const matchesSearch = searchTerm === '' || 
        user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAvailability = availabilityFilter === 'all' || 
        user.availability.some(avail => avail.toLowerCase().includes(availabilityFilter.toLowerCase()));
      
      return matchesSearch && matchesAvailability;
    });
  }, [users, currentUser?.id, searchTerm, availabilityFilter]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleRequestSwap = (targetUser: User) => {
    if (!currentUser) {
      alert('Please login to send swap requests');
      return;
    }
    setSelectedUser(targetUser);
    setShowRequestModal(true);
  };

  const handleCreateRequest = (request: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    onCreateSwapRequest(request);
    setShowRequestModal(false);
    setSelectedUser(null);
  };

  const getUserReviews = (userId: string) => {
    return reviews.filter(r => r.toUser === userId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-4">Skill Swap Platform</h1>
        <p className="text-gray-400">
          Discover skills and connect with talented people. Browse public profiles and find your perfect skill swap partner.
          {!currentUser && (
            <span className="text-yellow-400 ml-2">
              Login to send swap requests!
            </span>
          )}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by skill or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Availability</option>
                <option value="weekends">Weekends</option>
                <option value="weekdays">Weekdays</option>
                <option value="evenings">Evenings</option>
                <option value="mornings">Mornings</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'Profile' : 'Profiles'} Found
          </h2>
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-gray-300 px-3">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {paginatedUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No profiles match your search criteria.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedUsers.map((user) => {
              const userReviews = getUserReviews(user.id);
              const latestReview = userReviews[userReviews.length - 1];
              
              return (
                <div key={user.id} className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-gray-500 transition-all">
                  {/* Row layout as per prototype */}
                  <div className="flex items-center space-x-6">
                    {/* Profile Picture */}
                    <div 
                      className="w-20 h-20 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all flex-shrink-0"
                      onClick={() => onViewProfile(user.id)}
                    >
                      {user.profilePhoto ? (
                        <img 
                          src={user.profilePhoto} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-gray-300">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 
                            className="text-lg font-semibold text-white cursor-pointer hover:text-blue-400 transition-colors"
                            onClick={() => onViewProfile(user.id)}
                          >
                            {user.name}
                          </h3>
                          {user.location && (
                            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-1">
                              <MapPin size={14} />
                              <span>{user.location}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1 text-yellow-400 text-sm mt-1">
                            <Star size={14} fill="currentColor" />
                            <span>{user.rating.toFixed(1)}</span>
                            <span className="text-gray-400">({user.reviewCount} reviews)</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 flex-shrink-0">
                          <button
                            onClick={() => onViewProfile(user.id)}
                            className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleRequestSwap(user)}
                            disabled={!currentUser}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <MessageSquare size={16} />
                            <span>Request</span>
                          </button>
                        </div>
                      </div>

                      {/* Skills Row */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Skills Offered</h4>
                          <div className="flex flex-wrap gap-1">
                            {user.skillsOffered.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-900/30 text-green-300 rounded-md text-xs border border-green-800"
                              >
                                {skill}
                              </span>
                            ))}
                            {user.skillsOffered.length > 3 && (
                              <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded-md text-xs">
                                +{user.skillsOffered.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Skills Wanted</h4>
                          <div className="flex flex-wrap gap-1">
                            {user.skillsWanted.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded-md text-xs border border-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                            {user.skillsWanted.length > 3 && (
                              <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded-md text-xs">
                                +{user.skillsWanted.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Availability and Feedback */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                          <Clock size={14} />
                          <span>{user.availability.join(', ')}</span>
                        </div>
                        
                        {latestReview && (
                          <div className="text-xs text-gray-400 max-w-xs truncate">
                            Latest: "{latestReview.feedback.slice(0, 40)}..."
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 7) {
              pageNumber = i + 1;
            } else if (currentPage <= 4) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 3) {
              pageNumber = totalPages - 6 + i;
            } else {
              pageNumber = currentPage - 3 + i;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === pageNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Swap Request Modal */}
      {showRequestModal && selectedUser && currentUser && (
        <SwapRequestModal
          currentUser={currentUser}
          targetUser={selectedUser}
          onCreateRequest={handleCreateRequest}
          onClose={() => {
            setShowRequestModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
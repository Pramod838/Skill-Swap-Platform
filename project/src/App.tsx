import React, { useState, useEffect } from 'react';
import { Home, User, MessageSquare, Settings, Shield, LogOut, Bell, Menu } from 'lucide-react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import SwapRequestsPage from './components/SwapRequestsPage';
import AdminPanel from './components/AdminPanel';
import NotificationsPage from './components/NotificationsPage';
import UserDetailPage from './components/UserDetailPage';

export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  profilePhoto?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
  isAdmin?: boolean;
  rating: number;
  reviewCount: number;
  joinDate: string;
}

export interface SwapRequest {
  id: string;
  fromUser: string;
  toUser: string;
  offeredSkill: string;
  requestedSkill: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  completedAt?: string;
}

export interface Review {
  id: string;
  swapId: string;
  fromUser: string;
  toUser: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'profile' | 'requests' | 'admin' | 'notifications' | 'userDetail'>('home');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedUsers = localStorage.getItem('skillSwapUsers');
    const savedRequests = localStorage.getItem('skillSwapRequests');
    const savedReviews = localStorage.getItem('skillSwapReviews');
    const savedCurrentUser = localStorage.getItem('skillSwapCurrentUser');

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with demo data only if no saved data exists
      initializeDemoData();
    }

    if (savedRequests) {
      setSwapRequests(JSON.parse(savedRequests));
    }

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }

    if (savedCurrentUser) {
      setCurrentUser(JSON.parse(savedCurrentUser));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('skillSwapUsers', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    localStorage.setItem('skillSwapRequests', JSON.stringify(swapRequests));
  }, [swapRequests]);

  useEffect(() => {
    localStorage.setItem('skillSwapReviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('skillSwapCurrentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('skillSwapCurrentUser');
    }
  }, [currentUser]);

  const initializeDemoData = () => {
    const demoUsers: User[] = [
      {
        id: '1',
        name: 'Sumit Sahu',
        email: 'sumit@example.com',
        location: 'Daga',
        profilePhoto: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['React', 'TypeScript', 'Node.js'],
        skillsWanted: ['Python', 'Machine Learning'],
        availability: ['Weekends', 'Evenings'],
        isPublic: true,
        rating: 4.8,
        reviewCount: 15,
        joinDate: '2024-01-15'
      },
      {
        id: '2',
        name: 'Suresh Singh',
        email: 'suresh@example.com',
        location: 'badla',
        profilePhoto: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Photoshop', 'UI Design', 'Figma'],
        skillsWanted: ['React', 'Frontend Development'],
        availability: ['Weekdays', 'Evenings'],
        isPublic: true,
        rating: 4.9,
        reviewCount: 23,
        joinDate: '2024-02-20'
      },
      {
        id: '3',
        name: 'Jonny sain',
        email: 'jonny@example.com',
        location: 'Raichur',
        profilePhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Python', 'Data Science', 'Excel'],
        skillsWanted: ['Photoshop', 'Video Editing'],
        availability: ['Weekends'],
        isPublic: true,
        rating: 4.6,
        reviewCount: 12,
        joinDate: '2024-03-10'
      },
      {
        id: '4',
        name: 'Emma reddy',
        email: 'emma@example.com',
        location: 'chennai',
        profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Video Editing', 'After Effects', 'Motion Graphics'],
        skillsWanted: ['Web Development', 'JavaScript'],
        availability: ['Evenings', 'Weekends'],
        isPublic: true,
        rating: 4.7,
        reviewCount: 18,
        joinDate: '2024-02-05'
      },
      {
        id: '5',
        name: 'Ashok Kumar',
        email: 'ashok@example.com',
        location: 'Mumbai',
        profilePhoto: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Machine Learning', 'Python', 'Data Analysis'],
        skillsWanted: ['UI Design', 'Figma'],
        availability: ['Weekdays', 'Mornings'],
        isPublic: true,
        rating: 4.5,
        reviewCount: 9,
        joinDate: '2024-03-20'
      },
      {
        id: '6',
        name: 'Arun Panwar',
        email: 'Arun@example.com',
        location: 'Bengaluru',
        profilePhoto: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Spanish', 'Marketing', 'Social Media'],
        skillsWanted: ['Graphic Design', 'Photography'],
        availability: ['Weekends', 'Evenings'],
        isPublic: true,
        rating: 4.4,
        reviewCount: 7,
        joinDate: '2024-04-01'
      },
      {
        id: '7',
        name: 'Deepak Kumar',
        email: 'deepak@example.com',
        location: 'Pune',
        profilePhoto: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Photography', 'Lightroom', 'Portrait Photography'],
        skillsWanted: ['Video Editing', 'YouTube'],
        availability: ['Weekends'],
        isPublic: true,
        rating: 4.6,
        reviewCount: 14,
        joinDate: '2024-03-15'
      },
      {
        id: '8',
        name: 'Sanjay Taylor',
        email: 'sanjay@example.com',
        location: 'Raichur',
        profilePhoto: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Writing', 'Content Creation', 'Copywriting'],
        skillsWanted: ['SEO', 'Digital Marketing'],
        availability: ['Weekdays', 'Mornings'],
        isPublic: true,
        rating: 4.8,
        reviewCount: 11,
        joinDate: '2024-02-28'
      },
      {
        id: '9',
        name: 'Traun Sharma',
        email: 'tarun@example.com',
        location: 'Mumbai',
        profilePhoto: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Guitar', 'Music Production', 'Audio Editing'],
        skillsWanted: ['Piano', 'Music Theory'],
        availability: ['Evenings', 'Weekends'],
        isPublic: true,
        rating: 4.3,
        reviewCount: 8,
        joinDate: '2024-04-10'
      },
      {
        id: '10',
        name: 'shubham Soni',
        email: 'soni@example.com',
        location: 'Jaipur',
        profilePhoto: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Yoga', 'Meditation', 'Wellness Coaching'],
        skillsWanted: ['Nutrition', 'Fitness Training'],
        availability: ['Mornings', 'Weekends'],
        isPublic: true,
        rating: 4.9,
        reviewCount: 16,
        joinDate: '2024-01-30'
      },
      {
        id: '11',
        name: 'Kevin Kumar',
        email: 'kevin@example.com',
        location: 'Balliya',
        profilePhoto: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Java', 'Spring Boot', 'Backend Development'],
        skillsWanted: ['React Native', 'Mobile Development'],
        availability: ['Weekdays', 'Evenings'],
        isPublic: true,
        rating: 4.5,
        reviewCount: 13,
        joinDate: '2024-03-05'
      },
      {
        id: '12',
        name: 'Krishu Patel',
        email: 'krishu@example.com',
        location: 'balliya',
        profilePhoto: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        skillsOffered: ['Singing', 'Voice Coaching', 'Performance'],
        skillsWanted: ['Songwriting', 'Music Business'],
        availability: ['Evenings', 'Weekends'],
        isPublic: true,
        rating: 4.7,
        reviewCount: 19,
        joinDate: '2024-02-12'
      },
      {
        id: 'admin',
        name: 'Admin User',
        email: 'admin73@gmail.com',
        skillsOffered: [],
        skillsWanted: [],
        availability: [],
        isPublic: false,
        isAdmin: true,
        rating: 5.0,
        reviewCount: 0,
        joinDate: '2024-01-01'
      }
    ];

    const demoRequests: SwapRequest[] = [
      {
        id: '1',
        fromUser: '1',
        toUser: '2',
        offeredSkill: 'React',
        requestedSkill: 'Photoshop',
        message: 'Hi! I\'d love to learn Photoshop and can teach you React in return.',
        status: 'pending',
        createdAt: '2024-07-10T10:00:00Z'
      },
      {
        id: '2',
        fromUser: '3',
        toUser: '1',
        offeredSkill: 'Python',
        requestedSkill: 'TypeScript',
        message: 'Interested in learning TypeScript, can offer Python expertise.',
        status: 'accepted',
        createdAt: '2024-07-08T14:30:00Z'
      },
      {
        id: '3',
        fromUser: '4',
        toUser: '5',
        offeredSkill: 'Video Editing',
        requestedSkill: 'Machine Learning',
        message: 'Would love to learn ML basics in exchange for video editing skills.',
        status: 'completed',
        createdAt: '2024-07-05T09:15:00Z',
        completedAt: '2024-07-12T16:30:00Z'
      }
    ];

    const demoReviews: Review[] = [
      {
        id: '1',
        swapId: '3',
        fromUser: '4',
        toUser: '5',
        rating: 5,
        feedback: 'David was an excellent teacher! Very patient and knowledgeable about Machine Learning concepts.',
        createdAt: '2024-07-15T14:30:00Z'
      },
      {
        id: '2',
        swapId: '3',
        fromUser: '5',
        toUser: '4',
        rating: 4,
        feedback: 'Great experience learning video editing. Emma explained everything very clearly.',
        createdAt: '2024-07-15T15:00:00Z'
      },
      {
        id: '3',
        swapId: '2',
        fromUser: '1',
        toUser: '3',
        rating: 5,
        feedback: 'Mike is a fantastic Python instructor. Highly recommend!',
        createdAt: '2024-07-16T10:20:00Z'
      }
    ];

    setUsers(demoUsers);
    setSwapRequests(demoRequests);
    setReviews(demoReviews);
  };

  const handleLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('home');
      return true;
    }
    return false;
  };

  const handleSignup = (userData: { name: string; email: string; password: string; location?: string }): boolean => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      location: userData.location,
      skillsOffered: [],
      skillsWanted: [],
      availability: [],
      isPublic: true,
      rating: 0,
      reviewCount: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const createSwapRequest = (request: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    const newRequest: SwapRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSwapRequests(prev => [...prev, newRequest]);
  };

  const updateSwapRequest = (requestId: string, status: SwapRequest['status']) => {
    setSwapRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status, ...(status === 'completed' ? { completedAt: new Date().toISOString() } : {}) }
        : req
    ));
  };

  const deleteSwapRequest = (requestId: string) => {
    setSwapRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [...prev, newReview]);
    
    // Update user rating
    const targetUser = users.find(u => u.id === review.toUser);
    if (targetUser) {
      const userReviews = [...reviews, newReview].filter(r => r.toUser === review.toUser);
      const avgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;
      updateUser({
        ...targetUser,
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: userReviews.length
      });
    }
  };

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setCurrentPage('userDetail');
  };

  const pendingRequestsCount = currentUser ? swapRequests.filter(req => 
    req.toUser === currentUser.id && req.status === 'pending'
  ).length : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>
              Skill Swap Platform
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'home' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              
              {currentUser && (
                <>
                  <button
                    onClick={() => setCurrentPage('profile')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      currentPage === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage('requests')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors relative ${
                      currentPage === 'requests' ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    <MessageSquare size={20} />
                    <span>Swap Requests</span>
                    {pendingRequestsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {pendingRequestsCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setCurrentPage('notifications')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      currentPage === 'notifications' ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    <Bell size={20} />
                    <span>Notifications</span>
                  </button>
                  {currentUser.isAdmin && (
                    <button
                      onClick={() => setCurrentPage('admin')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        currentPage === 'admin' ? 'bg-red-600' : 'hover:bg-gray-700'
                      }`}
                    >
                      <Shield size={20} />
                      <span>Admin</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                    onClick={() => setCurrentPage('profile')}
                  >
                    {currentUser.profilePhoto ? (
                      <img 
                        src={currentUser.profilePhoto} 
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-300">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300">Welcome, {currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto p-4">
        {currentPage === 'home' && (
          <HomePage 
            currentUser={currentUser}
            users={users}
            reviews={reviews}
            onCreateSwapRequest={createSwapRequest}
            onViewProfile={handleViewProfile}
          />
        )}
        {currentPage === 'login' && (
          <LoginPage onLogin={handleLogin} onSignup={handleSignup} />
        )}
        {currentPage === 'profile' && currentUser && (
          <ProfilePage 
            currentUser={currentUser}
            onUpdateUser={updateUser}
            reviews={reviews.filter(r => r.toUser === currentUser.id)}
          />
        )}
        {currentPage === 'requests' && currentUser && (
          <SwapRequestsPage 
            currentUser={currentUser}
            users={users}
            swapRequests={swapRequests}
            onUpdateRequest={updateSwapRequest}
            onDeleteRequest={deleteSwapRequest}
            onAddReview={addReview}
          />
        )}
        {currentPage === 'notifications' && currentUser && (
          <NotificationsPage 
            currentUser={currentUser}
            swapRequests={swapRequests}
          />
        )}
        {currentPage === 'admin' && currentUser?.isAdmin && (
          <AdminPanel 
            users={users}
            swapRequests={swapRequests}
            reviews={reviews}
            onUpdateUser={updateUser}
            onDeleteUser={(userId) => setUsers(prev => prev.filter(u => u.id !== userId))}
          />
        )}
        {currentPage === 'userDetail' && selectedUserId && (
          <UserDetailPage
            user={users.find(u => u.id === selectedUserId)!}
            currentUser={currentUser}
            reviews={reviews.filter(r => r.toUser === selectedUserId)}
            onCreateSwapRequest={createSwapRequest}
            onBack={() => setCurrentPage('home')}
          />
        )}
      </div>
    </div>
  );
}

export default App;
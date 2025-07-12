import React, { useState } from 'react';
import { ArrowRight, UserPlus, Home } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
  onSignup: (userData: { name: string; email: string; password: string; location?: string }) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (isLogin) {
      const success = onLogin(email, password);
      if (!success) {
        setError('Invalid credentials. Try demo accounts: alex@example.com, admin73@gmail.com (any password)');
      }
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Name, email, and password are required');
        return;
      }
      
      const success = onSignup({ name, email, password, location: location || undefined });
      if (!success) {
        setError('Email already exists. Please use a different email address.');
      } else {
        setSuccessMessage('Account created successfully! Please login with your credentials.');
        setIsLogin(true);
        setName('');
        setLocation('');
        setPassword('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Skill Swap Platform</h1>
          <p className="text-gray-400">
            {isLogin ? 'Welcome back! Sign in to continue.' : 'Join the community and start swapping skills.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                Location (Optional)
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your location"
              />
            </div>
          )}

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg border border-red-800">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="text-green-400 text-sm text-center bg-green-900/20 p-3 rounded-lg border border-green-800">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isLogin ? <ArrowRight size={20} /> : <UserPlus size={20} />}
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccessMessage('');
              setEmail('');
              setPassword('');
              setName('');
              setLocation('');
            }}
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">
              Demo accounts: alex@example.com, sarah@example.com, mike@example.com
            </p>
            <p className="text-xs text-gray-500">
              Admin access: admin73@gmail.com (any password)
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Forgot username/password? Contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { User, SwapRequest } from '../App';

interface SwapRequestModalProps {
  currentUser: User;
  targetUser: User;
  onCreateRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const SwapRequestModal: React.FC<SwapRequestModalProps> = ({
  currentUser,
  targetUser,
  onCreateRequest,
  onClose
}) => {
  const [offeredSkill, setOfferedSkill] = useState('');
  const [requestedSkill, setRequestedSkill] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!offeredSkill || !requestedSkill) {
      return;
    }

    onCreateRequest({
      fromUser: currentUser.id,
      toUser: targetUser.id,
      offeredSkill,
      requestedSkill,
      message: message || `Hi! I'd like to learn ${requestedSkill} and can teach you ${offeredSkill} in return.`,
      status: 'pending'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Request Skill Swap</h2>
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
              {targetUser.profilePhoto ? (
                <img 
                  src={targetUser.profilePhoto} 
                  alt={targetUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-300">
                  {targetUser.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white">{targetUser.name}</h3>
            <p className="text-gray-400 text-sm">Requesting skill swap</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose one of your offered skills
            </label>
            <select
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a skill you can offer...</option>
              {currentUser.skillsOffered.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose one of their wanted skills
            </label>
            <select
              value={requestedSkill}
              onChange={(e) => setRequestedSkill(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a skill you want to learn...</option>
              {targetUser.skillsWanted.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a personal message..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!offeredSkill || !requestedSkill}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>Send Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SwapRequestModal;
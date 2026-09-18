import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 mb-8">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-2 rounded-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Logged in as</p>
            <p className="font-medium text-slate-200">
              {currentUser?.name} <span className="text-slate-500">({currentUser?.role})</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400 rounded-lg transition-all border border-slate-700"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
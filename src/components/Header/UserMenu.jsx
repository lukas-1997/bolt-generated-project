import React, { useState } from 'react';
import { supabase } from '../../supabase';

export default function UserMenu({ user, onLoginClick }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <button
        onClick={onLoginClick}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-2 rounded-full border hover:shadow-md transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          {user.email?.[0].toUpperCase() || 'U'}
        </div>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

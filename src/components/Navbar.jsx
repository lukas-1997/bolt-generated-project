import React from 'react';
import { supabase } from '../supabase';

export default function Navbar({ user }) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
              BerlinStay
            </span>
          </h1>
          
          <div className="flex items-center gap-6">
            {user && (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + user.email}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

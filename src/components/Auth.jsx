import React from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabase';

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-2">BerlinStay</h1>
          <p className="text-gray-600">Find your perfect temporary home in Berlin</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#EF4444',
                    brandAccent: '#DC2626',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '8px',
                  height: '42px',
                },
                input: {
                  borderRadius: '8px',
                  height: '42px',
                },
              },
            }}
            providers={['google']}
          />
        </div>
      </div>
    </div>
  );
}

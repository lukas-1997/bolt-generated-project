import React, { useState } from 'react';
import { supabase } from '../supabase';

export default function TestStorage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setStatus('Uploading...');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;

      // Get the authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Test upload
      const { error: uploadError } = await supabase.storage
        .from('listing-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Test get URL
      const { data } = supabase.storage
        .from('listing-images')
        .getPublicUrl(fileName);

      setUrl(data.publicUrl);
      setStatus('Upload successful! Testing public access...');

    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message);
      setStatus('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Storage Policy Test</h2>
      
      {/* Status Display */}
      {status && (
        <div className="mb-4 p-2 bg-blue-50 text-blue-700 rounded">
          Status: {status}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {/* File Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Image to Test Upload
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          disabled={uploading}
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className={`w-full py-2 px-4 rounded-md text-white font-medium
          ${uploading || !file 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {uploading ? 'Uploading...' : 'Test Upload'}
      </button>

      {/* Preview */}
      {url && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Image:</h3>
          <img 
            src={url} 
            alt="Uploaded test" 
            className="w-full h-48 object-cover rounded-md"
          />
          <p className="mt-2 text-sm text-gray-500 break-all">
            Public URL: {url}
          </p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ContentService } from '../../../lib/contentService';
import { AuthService } from '../../../lib/auth';

// Component for editing a section in the dashboard
export default function EditSection() {
  // State variables for section data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Router and route params
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Fetch section and check authentication on mount or when id changes
  useEffect(() => {
    checkAuth();
    fetchSection();
  }, [id]);

  // Check if user is logged in and has a valid session
  const checkAuth = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      router.push('/login');
      return;
    }

    const { valid } = await AuthService.validateSession(sessionId);
    if (!valid) {
      router.push('/login');
    }
  };

  // Fetch section data from API using ContentService
  const fetchSection = async () => {
    try {
      const sectionId = parseInt(id);
      if (isNaN(sectionId)) {
        setError('Invalid section ID');
        return;
      }

      const { data, error } = await ContentService.getSectionById(sectionId);
      if (error || !data) {
        setError(error || 'Failed to fetch section data');
        return;
      }

      // Set fetched data into state
      setTitle(data.title);
      setDescription(data.description || '');
      setImageUrl(data.image_url || '');
    } catch (error) {
      setError('An error occurred while fetching data');
      console.error('Fetch section error:', error);
    }
  };

  // Handle form submission to update section
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const sectionId = parseInt(id);
      if (isNaN(sectionId)) {
        setError('Invalid section ID');
        return;
      }

      const { data, error } = await ContentService.updateSection(sectionId, {
        title,
        description,
        image_url: imageUrl || null,
      });

      if (error || !data) {
        setError(error || 'Failed to update section');
        return;
      }

      // Redirect to dashboard after successful update
      router.push('/dashboard');
    } catch (error) {
      setError('Unexpected error occurred');
      console.error('Update section error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Page heading */}
      <h1 className="text-2xl font-bold mb-6">Edit Section</h1>
      
      {/* Display errors */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      
      {/* Edit section form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Title input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        {/* Description textarea */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>
        
        {/* Image URL input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL (optional)
          </label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        {/* Form buttons */}
        <div className="flex items-center justify-between gap-2">
          {/* Update button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>

          {/* Cancel button */}
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>

          {/* Settings button */}
          <button
            type="button"
            onClick={() => router.push('/dashboard/settings')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Settings
          </button>
        </div>
      </form>
    </div>
  );
}

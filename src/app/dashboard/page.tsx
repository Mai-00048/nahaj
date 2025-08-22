'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Section } from '../types';
import { ContentService } from '../lib/contentService';
import { AuthService } from '../lib/auth';

export default function Dashboard() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchSections();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      router.push('/login');
      return;
    }

    const { valid } = await AuthService.validateSession(sessionId);
    if (!valid) {
      localStorage.removeItem('sessionId');
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  const fetchSections = async () => {
    try {
      const { data, error } = await ContentService.getAllSections();
      
      if (error) {
        setError(error);
        return;
      }

      setSections(data || []);
    } catch (error) {
      setError('An error occurred while fetching data');
      console.error('Fetch sections error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      const { success, error } = await ContentService.deleteSection(id);
      
      if (error || !success) {
        alert(error || 'Failed to delete section');
        return;
      }

      // Refetch sections after deletion
      fetchSections();
      alert('Section deleted successfully');
    } catch (error) {
      alert('An error occurred while deleting the section');
      console.error('Delete section error:', error);
    }
  };

 

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your Vision 2030 content sections</p>
          </div>
        
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 p-4 rounded-xl border border-red-200 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-xl mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Sections</p>
                <h3 className="text-2xl font-bold text-gray-900">{sections.length}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sections Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Content Sections</h2>
            <button 
              className="bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center shadow-sm shadow-blue-600/20"
              onClick={() => router.push('/dashboard/new')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Section
            </button>
          </div>
          
          {sections.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No sections yet</h3>
              <p className="text-gray-500">Get started by creating your first content section.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sections.map((section) => (
                <div key={section.id} className="px-6 py-5 hover:bg-gray-50 transition-all duration-150">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{section.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{section.description}</p>
                      {section.image_url && (
                        <div className="mt-2">
                          <img 
                            src={section.image_url} 
                            alt={section.title} 
                            className="w-32 h-32 object-cover rounded-xl shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-start space-x-2 ml-4">
                      <button 
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        onClick={() => router.push(`/dashboard/edit/${section.id}`)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                        onClick={() => handleDelete(section.id)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
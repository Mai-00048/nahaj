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
      setError('حدث خطأ أثناء جلب البيانات');
      console.error('Fetch sections error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      return;
    }

    try {
      const { success, error } = await ContentService.deleteSection(id);
      
      if (error || !success) {
        alert(error || 'فشل حذف القسم');
        return;
      }

      // إعادة جلب الأقسام بعد الحذف
      fetchSections();
      alert('تم حذف القسم بنجاح');
    } catch (error) {
      alert('حدث خطأ أثناء حذف القسم');
      console.error('Delete section error:', error);
    }
  };

  const handleLogout = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      await AuthService.logout(sessionId);
    }
    
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">لوحة التحكم - إدارة المحتوى</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          تسجيل الخروج
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">عدد الأقسام</h3>
          <p className="text-3xl font-bold text-blue-600">{sections.length}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">الأقسام</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sections.map((section) => (
            <div key={section.id} className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-800">{section.title}</h3>
              <p className="text-gray-600">{section.description}</p>
              {section.image_url && (
                <div className="mt-2">
                  <img 
                    src={section.image_url} 
                    alt={section.title} 
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
              <div className="mt-2 flex space-x-2">
                <button 
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => router.push(`/dashboard/edit/${section.id}`)}
                >
                  تعديل
                </button>
                <button 
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(section.id)}
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={() => router.push('/dashboard/new')}
          >
            إضافة قسم جديد
          </button>
        </div>
      </div>
    </div>
  );
}
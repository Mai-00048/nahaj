'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ContentService } from '../../../lib/contentService';
import { Section } from '../../../types';
import { AuthService } from '../../../lib/auth';

export default function EditSection() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    checkAuth();
    fetchSection();
  }, [id]);

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

  const fetchSection = async () => {
    try {
      const sectionId = parseInt(id);
      if (isNaN(sectionId)) {
        setError('معرف القسم غير صحيح');
        return;
      }

      const { data, error } = await ContentService.getSectionById(sectionId);
      
      if (error || !data) {
        setError(error || 'فشل جلب بيانات القسم');
        return;
      }

      setTitle(data.title);
      setDescription(data.description || '');
      setImageUrl(data.image_url || '');
    } catch (error) {
      setError('حدث خطأ أثناء جلب البيانات');
      console.error('Fetch section error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const sectionId = parseInt(id);
      if (isNaN(sectionId)) {
        setError('معرف القسم غير صحيح');
        return;
      }

      const { data, error } = await ContentService.updateSection(sectionId, {
        title,
        description,
        image_url: imageUrl || null,
      });

      if (error || !data) {
        setError(error || 'فشل تحديث القسم');
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      setError('حدث خطأ غير متوقع');
      console.error('Update section error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">تعديل القسم</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            العنوان
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
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            الوصف
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            رابط الصورة (اختياري)
          </label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isLoading ? 'جاري التحديث...' : 'تحديث'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            إلغاء
          </button>
          <button
  onClick={() => router.push('/dashboard/settings')}
  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
>
  الإعدادات
</button>
        </div>
      </form>
    </div>
  );
}
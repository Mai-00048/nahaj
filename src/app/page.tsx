'use client';

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import { supabase } from './lib/supabaseClient';
import { Section } from './types';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sections:', error);
        return;
      }

      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();

    // الاشتراك في التحديثات في الوقت الحقيقي
    const subscription = supabase
      .channel('sections-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sections',
        },
        () => {
          fetchSections(); // إعادة جلب البيانات عند أي تغيير
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-tajawal">
      <Hero />

      <section id="sections" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-tajawal text-3xl font-semibold text-center mb-12 text-gray-900 tracking-tight">
            Latest Articles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {sections.length > 0 ? (
              sections.map((section) => (
                <article
                  key={section.id}
                  className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer flex flex-col"
                  role="article"
                >
                  {section.image_url && (
                    <img
                      src={section.image_url}
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  <div className="relative z-10 p-6 flex flex-col flex-grow h-full justify-between bg-black/40 text-white">
                    <div>
                      <h3 className="font-tajawal text-xl font-semibold mb-2 line-clamp-2">
                        {section.title}
                      </h3>

                      <p className="font-tajawal mb-4 line-clamp-3">
                        {section.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <time dateTime={section.created_at || undefined}>
                        {section.created_at ? formatDate(section.created_at) : 'Not available'}
                      </time>

                      <button
                        className="font-tajawal text-blue-200 hover:text-white font-semibold transition"
                        aria-label={`Read more about ${section.title}`}
                      >
                        Read More &larr;
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 text-lg font-tajawal">
                No articles added yet
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
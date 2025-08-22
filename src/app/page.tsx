'use client';

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import { supabase } from './lib/supabaseClient';
import { Section } from './types';

// Format date to a readable string
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Home() {
  // State for storing sections data
  const [sections, setSections] = useState<Section[]>([]);
  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch sections from Supabase
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

  // Fetch data on component mount and set up real-time subscription
  useEffect(() => {
    fetchSections();

    // Subscribe to real-time updates for sections table
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
          fetchSections(); // Refetch data on any changes
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-tajawal">
      {/* Hero section component */}
      <Hero />

      {/* Sections listing section */}
      <section id="sections" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-tajawal text-3xl font-semibold text-center mb-12 text-gray-900 tracking-tight">
            Latest Articles
          </h2>

          {/* Grid layout for sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {sections.length > 0 ? (
              sections.map((section) => (
                <article
                  key={section.id}
                  className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer flex flex-col"
                  role="article"
                >
                  {/* Section image */}
                  {section.image_url && (
                    <img
                      src={section.image_url}
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {/* Section content overlay */}
                  <div className="relative z-10 p-6 flex flex-col flex-grow h-full justify-between bg-black/40 text-white">
                    <div>
                      {/* Section title */}
                      <h3 className="font-tajawal text-xl font-semibold mb-2 line-clamp-2">
                        {section.title}
                      </h3>

                      {/* Section description */}
                      <p className="font-tajawal mb-4 line-clamp-3">
                        {section.description}
                      </p>
                    </div>

                    {/* Section metadata and action button */}
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
              // Empty state when no sections are available
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
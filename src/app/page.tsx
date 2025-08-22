import Hero from './components/Hero';
import { supabase } from './lib/supabaseClient';
import { Section } from './types';

async function getSections(): Promise<Section[]> {
  try {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sections:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
}

export default async function Home() {
  const sections = await getSections();

  return (
    <div>
      <Hero />
      
      <section id="sections" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">أقسام الموقع</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.id} className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
                {section.image_url && (
                  <div className="mt-4">
                    <img 
                      src={section.image_url} 
                      alt={section.title} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
            
            {sections.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">لا توجد أقسام مضافة بعد</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* باقي الأقسام الثابتة */}
    </div>
  );
}
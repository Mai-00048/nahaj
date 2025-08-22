'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              رؤية المملكة العربية السعودية 2030
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
            نحو اقتصاد مزدهر ومجتمع حيوي ووطن طموح
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
                اكتشف المزيد
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition duration-300">
                مشاريع الرؤية
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-blue-500 rounded-2xl opacity-30 blur-lg"></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                <div className="rounded-xl overflow-hidden bg-gray-200 aspect-video flex items-center justify-center">
                  <span className="text-blue-800 font-semibold">صورة توضيحية للرؤية</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white"></div>
    </section>
  );
}
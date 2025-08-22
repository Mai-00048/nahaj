'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './hero.css';

 

export default function Hero() {
  const slides = [
    {
      image: 'https://img.jakpost.net/c/2019/01/28/2019_01_28_64132_1548670481._large.jpg',
      title: 'Built',
      description: '',
      gradient: 'from-green-200 to-blue-100',
    },
    {
      image: 'https://arabiandaily.com/wp-content/uploads/2024/09/90-min-2.jpg',
      title: 'Natural Harmony',
      description: 'Designing with the',
      gradient: 'from-blue-200 to-green-100',
    },
    {
      image: 'https://www.omanobserver.om/uploads/imported_images/uploads/2019/01/vision.jpg',
      title: 'Urban Evolution',
      description: 'Smart growth, vertical pride, and connected cities.',
      gradient: 'from-blue-300 to-gray-300',
    },
    {
      image: 'https://pbs.twimg.com/media/EqkswgEXYAAE2pj.jpg',
      title: '',
      description: '',
      gradient: 'from-green-300 to-yellow-100',
    },
    {
      image: 'https://www.imtilak.om/uploads/posts/d9ec1d9401b06e906ee98f41cf7e659fwaB972.webp',
      title: '',
      description: '',
      gradient: 'from-blue-100 to-gray-200',
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-white text-center" style={{ fontFamily: 'Tajawal, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#4A2B0F] mb-4"
        >
          OMAN 2040
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Building the future through culture, technology and vision
        </motion.p>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          بناء المستقبل من خلال الثقافة والتكنولوجيا والرؤية
        </motion.p>
        <div className="relative px-0 sm:px-4">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: -100,
              },
            }}
            className="hero-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="slide-container">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="slide-image"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-40 rounded-3xl`}
                  ></div>
                  {(slide.title || slide.description) && (
                    <div className="slide-content">
                      {slide.title && (
                        <h3 className="font-bold text-sm sm:text-base md:text-lg">{slide.title}</h3>
                      )}
                      {slide.description && (
                        <p className="text-xs sm:text-sm">{slide.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
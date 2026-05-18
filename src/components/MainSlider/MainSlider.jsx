import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import img1 from '../../assets/images/slider-image-1.jpeg';
import img2 from '../../assets/images/slider-image-2.jpeg';
import img3 from '../../assets/images/slider-image-3.jpeg';

export default function MainSlider() {
  const slides = [
    {
      image: img1,
      title:"FREE shipping for orders more than 100$",
      description: "Free Shipping to First-Time Customers Only, After promotions and discounts are applied.",
    },
    {
      image: img2,
      title: "FREE shipping for orders more than 100$",
      description: "Free Shipping to First-Time Customers Only, After promotions and discounts are applied.",
    },
    {
      image: img3,
      title: "FREE shipping for orders more than 100$",
      description:"Free Shipping to First-Time Customers Only, After promotions and discounts are applied.",
    },
  ];

  return (
    <section className="main-slider mb-5 px-2">
      <Swiper
     
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 650,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        
        className="rounded-3 overflow-hidden shadow">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="position-relative w-100" style={{ height: '500px' }}>
              <img
                src={slide.image}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                alt={slide.title} />
             
              
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center bg-dark bg-opacity-25">
                <div className="container text-white text-center text-md-start">
                  <div className="col-md-7 ps-md-5">
                    <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                    <p className="fs-5 mb-4">{slide.description}</p>
                    <Link 
                      to="" 
                      className="btn btn-dark btn-lg px-5 py-3 rounded-pill fw-bold">
                    
                     Shop now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
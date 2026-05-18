import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0">Shop Popular Categories</h4>
        <div className="text-success fw-medium cursor-pointer"></div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={15}
        slidesPerView={2} 
        loop={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false, 
          pauseOnMouseEnter: true, 
        }}
        grabCursor={true} 
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="pb-5"
      >
        {categories.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="category-card shadow-sm border rounded-3 overflow-hidden bg-white hover-shadow transition-all">

              <div className="position-relative" style={{ paddingTop: '100%' }}> 
                <img
                  src={item.image}
                  alt={item.name}
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-2 bg-light border-top text-center">
                <p className="m-0 small fw-bold text-dark text-truncate">
                  {item.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
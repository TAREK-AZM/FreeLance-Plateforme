
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useCategoriesStore } from "../../store/store"
import axios from "axios";


const Base_URL = import.meta.env.VITE_API2; // API Base URL from environment variables

export default function JobCategories() {
  const categories = useCategoriesStore((state) => state.Categories);

  const setCategories = useCategoriesStore((state) => state.setCategories);

useEffect(() => {

  const fetchCategories = async () => {
    try {

      const categories = [
        {
          title: "Graphics, Design & Architecture",
          image: "https://demo.yo-gigs.com/image/show/31/3/LARGE?t=-62169984000",
        },
        {
          title: "Marketing & Sales",
          image: "https://demo.yo-gigs.com/image/show/31/5/LARGE?t=-62169984000",
        },
        {
          title: "Water supply plumber",
          image: "https://demo.yo-gigs.com/image/show/31/174/LARGE?t=1711523596",
        },
        {
          title: "Development & IT Services",
          image: "https://demo.yo-gigs.com/image/show/31/1/LARGE?t=1717744916",
        },
        {
          title: "Plumber",
          image: "https://demo.yo-gigs.com/image/show/31/167/LARGE?t=1711523315",
        },
      ]
      setCategories(categories); // Update Zustand store
      const token = localStorage.getItem("token"); // Get the token
      console.log("🔑🔑🔑🔑 Using Token:🔑🔑", token);

      const response = await axios.get(`${Base_URL}/api/client/categories`, {
        headers: {
          Authorization: `${token}`, // Attach token in Authorization header
        },
      });
      if (response.status == 200) {
        setCategories(response.data); // Store categories in Zustand
      }

      console.log("✅ Categories fetched:", response.data);
      setCategories(response.data); // Store categories in Zustand
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    }
  };

  fetchCategories(); // Call the fetch function when component mounts
}, [])

  return (

    <section className="py-16 bg-gray-50">
      <style jsx global>{`
        /* Override the Swiper navigation arrow color */
        .swiper-button-next::after,
        .swiper-button-prev::after {
          color: white; /* Or any color you want */
        }

        .swiper-pagination-bullet {
          background-color: #999;   /* change default color */
          width: 10px;             /* change width */
          height: 10px;            /* change height */
          opacity: 0.7;            /* optional: change opacity */
        }
        .swiper-pagination-bullet-active {
          background-color: #12AE65;   /* change default color */
          opacity: 1;
        }
      `}

      
      </style>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Top Job Categories</h2>

        <Swiper
       
          // Enable modules
          modules={[Navigation, Pagination]}
          // Carousel settings
          spaceBetween={20}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          // Swiper breakpoints to adjust slides per view
          breakpoints={{
            1024: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="group relative overflow-hidden rounded-lg">
                <img
                  src={category.image || '/placeholder.svg'}
                  alt={category.title}
                  className="w-full h-84 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t  from-black/60 to-transparent text-center">
                  <div className="absolute bottom-4 left-4 right-4  mb-10">
                    <h3 className="text-white font-semibold ">{category.title}</h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}


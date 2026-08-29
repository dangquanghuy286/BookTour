// BannerSlider.js

import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import icons from "../../utils/icons";

const { FaStar } = icons;

const BannerSlider = ({ banners = [] }) => {
  const sliderSettings = {
    dots: true,
    infinite: banners.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    arrows: false,
    dotsClass: "slick-dots !bottom-3 !right-4 !left-auto !w-auto",
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      <Slider {...sliderSettings}>
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative w-full group overflow-hidden"
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />

            {/* Image wrapper */}
            <div className="w-full overflow-hidden">
              <img
                src={banner.imageUrl}
                alt={banner.title || "Banner"}
                loading="lazy"
                className="
                  w-full object-cover
                  aspect-[16/5] sm:aspect-[16/6] xs:aspect-[16/7]
                  transform-gpu will-change-transform
                  backface-hidden
                  scale-100 group-hover:scale-[1.05]
                  transition-transform duration-[700ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                "
              />
            </div>

            {/* Banner content */}
            <div className="absolute left-6 bottom-6 sm:left-8 sm:bottom-8 z-20 max-w-[55%]">
              <h2 className="text-base sm:text-xl md:text-2xl font-bold mb-3 leading-snug">
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow">
                  {banner.title}
                </span>
              </h2>

              {/* Button */}
              {banner.link && (
                <a
                  href={banner.link}
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2 sm:px-5 sm:py-2.5
                    text-xs sm:text-sm font-semibold text-white
                    bg-gradient-to-r from-teal-500 to-blue-600
                    hover:from-teal-600 hover:to-blue-700
                    rounded-full shadow-lg hover:shadow-xl
                    transform-gpu will-change-transform
                    hover:scale-105
                    transition-all duration-300 ease-out
                  "
                >
                  <FaStar className="text-sm sm:text-base" />
                  <span>Khám phá ngay</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;

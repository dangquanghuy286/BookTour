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
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: banners.length > 1,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    arrows: false,
    dotsClass: "slick-dots !bottom-3 !right-4 !left-auto !w-auto",
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      <Slider {...sliderSettings}>
        {banners.map((banner) => (
          <div key={banner.id} className="outline-none">
            <div className="relative w-full group overflow-hidden">
              {/* Overlay gradient */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Image */}
              <img
                src={banner.imageUrl}
                alt={banner.title || "Banner"}
                loading="lazy"
                draggable={false}
                className="
                  block w-full object-cover object-center
                  aspect-[16/8] sm:aspect-[16/6] lg:aspect-[16/5]
                  transform-gpu will-change-transform
                  scale-100 group-hover:scale-[1.03]
                  transition-transform duration-[1400ms] ease-out
                  motion-reduce:transition-none motion-reduce:transform-none
                "
              />

              {/* Content */}
              <div className="absolute left-5 bottom-5 sm:left-8 sm:bottom-8 z-20 max-w-[60%] sm:max-w-[55%]">
                <h2 className="text-base sm:text-xl md:text-3xl font-bold mb-3 leading-snug">
                  <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {banner.title}
                  </span>
                </h2>

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
                      transform-gpu hover:-translate-y-0.5
                      transition-all duration-500 ease-out
                    "
                  >
                    <FaStar className="text-sm sm:text-base" />
                    <span>Khám phá ngay</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;

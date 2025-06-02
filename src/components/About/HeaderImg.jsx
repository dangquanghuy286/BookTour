import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDataBanner } from "../../services/BannerService";
// Sửa lỗi đánh máy
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSniper";

const HeaderImg = () => {
  const [banners, setBanners] = useState([]); // Khởi tạo là mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getDataBanner();
        if (res.status === 200) {
          // Lọc các banner active và trong khoảng thời gian hợp lệ
          const activeBanners = res.data.content.filter(
            (banner) =>
              banner.isActive &&
              new Date(banner.startDate) <= new Date() &&
              new Date(banner.endDate) >= new Date()
          );
          setBanners(activeBanners || []);
        } else {
          setError(res.data?.error || "Không thể tải banner!");
        }
      } catch (error) {
        setError(error.message || "Đã xảy ra lỗi!");
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  // Cấu hình slider
  const sliderSettings = {
    dots: false,
    infinite: banners.length > 1, // Chỉ bật infinite nếu có nhiều hơn 1 banner
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Chuyển slide mỗi 4 giây
    pauseOnHover: true,
    cssEase: "linear",
    arrows: false, // Tắt mũi tên để phù hợp với banner
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false, // Ẩn dots trên mobile nhỏ
        },
      },
    ],
  };

  return (
    <div className="relative w-full">
      {loading ? (
        <LoadingSpinner message="Đang tải banner!" />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : banners.length === 0 ? (
        <ErrorMessage error="Không tìm thấy banner nào" isWarning={true} />
      ) : (
        <Slider {...sliderSettings}>
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative w-full group overflow-hidden rounded-xl shadow-xl"
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>

              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="object-cover w-full max-h-[800px] md:max-h-[700px] sm:max-h-[600px] group-hover:scale-105 transition-transform duration-500"
              />

              <div
                className="absolute left-4 right-4 sm:left-10 sm:right-auto bottom-10 sm:bottom-16 z-20 max-w-[90%] sm:max-w-[70%]"
                data-aos="fade-right"
              >
                <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3 leading-tight">
                  <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                    {banner.title}
                  </span>
                </h2>

                <a
                  href={banner.link}
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  🌟 Khám phá ngay
                </a>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HeaderImg;

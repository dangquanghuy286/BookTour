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
    dots: true,
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
            <div key={banner.id} className="relative w-full">
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="object-cover w-full max-h-[600px] md:max-h-[500px] sm:max-h-[400px]"
              />
              <p
                className="absolute top-[80%] left-5 sm:left-10 text-white text-xl sm:text-2xl md:text-4xl font-bold drop-shadow-lg max-w-[80%]"
                data-aos="fade-right"
              >
                {banner.title}
                <br />
                <a
                  href={banner.link}
                  className="text-sm sm:text-base md:text-lg text-white underline hover:text-[#00c0d1]"
                >
                  Khám phá ngay
                </a>
              </p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HeaderImg;

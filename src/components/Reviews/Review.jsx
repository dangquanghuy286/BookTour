import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getDataReview } from "../../services/ReviewService";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";
import ReviewCard from "./ReviewCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Review = () => {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getDataReview();
        if (res.status === 200) {
          setReview(res.data || []);
        } else {
          setError(res.data?.error || "Không thể tải review!");
        }
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi!");
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  // Tính toán cài đặt slider
  const slidesToShow = Math.min(review.length, 3);
  const canLoop = review.length > slidesToShow;

  const sliderSettings = {
    dots: true,
    infinite: canLoop, // Chỉ bật infinite nếu có đủ review
    speed: 500, // Tốc độ chuyển slide mượt mà hơn
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Lướt mỗi 3 giây
    pauseOnHover: true,
    cssEase: "linear", // Hiệu ứng mượt mà
    arrows: false, // Tắt mũi tên để phù hợp với banner
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(review.length, 2),
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="py-4 sm:py-6 md:py-8 lg:py-12 dark:bg-slate-900 bg-gray-50 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h1
          className="py-2 pl-3 my-4 sm:my-6 md:my-8 text-2xl sm:text-3xl md:text-4xl font-bold
          text-left border-l-8 border-[#00c0d1] text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Đánh Giá Từ Những Người Đã Trải Nghiệm!
        </h1>

        {loading ? (
          <LoadingSpinner message="Đang tải danh sách đánh giá!" />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : review.length === 0 ? (
          <ErrorMessage error="Không tìm thấy đánh giá nào" isWarning={true} />
        ) : (
          <div className="relative py-4">
            <Slider {...sliderSettings}>
              {review.slice(0, 5).map((item) => (
                <div key={item.review_id} className="px-2 py-4">
                  <ReviewCard review={item} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;

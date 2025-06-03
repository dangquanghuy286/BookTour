import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import icons from "../../utils/icons";
import StarDisplay from "../Star";
import { getTourById, getTourImages } from "../../services/TourService";

const { IoLocationOutline, FiClock, FaRegUser } = icons;

const DetailTour = () => {
  const { slug } = useParams(); // Lấy slug từ URL (ví dụ: tam-dao-mat-lanh-15)
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]); // State để lưu danh sách hình ảnh
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug logs
  console.log("Current URL:", window.location.pathname);
  console.log("Slug from useParams:", slug);

  useEffect(() => {
    const fetchTourAndImages = async () => {
      try {
        if (!slug) {
          throw new Error("Không tìm thấy slug trong URL");
        }

        // Tách id từ slug
        const id = slug.split("-").pop();
        console.log("Extracted ID:", id);

        // Kiểm tra xem id có phải là số không
        if (isNaN(id)) {
          throw new Error("ID không hợp lệ");
        }

        // Gọi API lấy thông tin tour
        const tourResponse = await getTourById(id);
        console.log("API Response (Tour):", tourResponse);

        if (tourResponse.status !== 200) {
          throw new Error("Tour không tồn tại");
        }
        setTour(tourResponse.data);

        // Gọi API lấy danh sách hình ảnh
        const imagesResponse = await getTourImages(id);
        console.log("API Response (Images):", imagesResponse);

        if (imagesResponse.status !== 200) {
          throw new Error("Không thể lấy hình ảnh tour");
        }
        setImages(imagesResponse.data); // Lưu danh sách URL hình ảnh

        setLoading(false);
      } catch (err) {
        console.error("Error in fetchTourAndImages:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTourAndImages();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Đang tải...</p>
        <p className="text-sm text-gray-500">Slug: {slug}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-gray-500">Slug: {slug}</p>
        <p className="text-sm text-gray-500">URL: {window.location.pathname}</p>
        <Link to="/tour/getalltour" className="text-blue-500 hover:underline">
          Quay lại danh sách tour
        </Link>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Không tìm thấy thông tin tour</p>
        <Link to="/tour/getalltour" className="text-blue-500 hover:underline">
          Quay lại danh sách tour
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white dark:bg-slate-950 shadow-lg rounded-2xl p-4 sm:p-6">
        {/* Hiển thị danh sách hình ảnh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {images.length > 0 ? (
            images.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Tour image ${index + 1}`}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-xl"
              />
            ))
          ) : (
            <p className="text-gray-500">Không có hình ảnh nào để hiển thị.</p>
          )}
        </div>

        {/* Thông tin tour */}
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {tour.title}
          </h1>
          {tour.star && (
            <div className="flex items-center gap-2">
              <StarDisplay rating={tour.star} />
              <span className="text-sm sm:text-base">({tour.star}/5)</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm sm:text-base opacity-80">
            <div className="flex items-center gap-2">
              <IoLocationOutline className="w-5 h-5" />
              <span>{tour.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-5 h-5" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegUser className="w-5 h-5" />
              <span>{tour.availableSlots} chỗ trống</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg sm:text-xl font-bold text-green-600">
              {tour.price_adult}/người
            </p>
          </div>
          {tour.description && (
            <div className="mt-4">
              <h2 className="text-lg sm:text-xl font-semibold">Mô tả</h2>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {tour.description}
              </p>
            </div>
          )}
          <div className="mt-6">
            <Link
              to={`/booking/${slug}`}
              className="inline-block px-6 py-3 bg-[#00c0d1] hover:bg-[#0090a0] text-white font-semibold rounded-md transition-colors duration-200"
            >
              Đặt ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTour;

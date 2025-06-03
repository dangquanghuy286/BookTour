import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icons from "../../utils/icons";

import { getTourById, getTourImages } from "../../services/TourService";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";
import TourImg from "../TourDeTail/TourImg";
import HeaderTitle from "../TourDeTail/HeaderTitle";
import TourConTent from "../TourDeTail/TourConTent";
import GoBack from "../GoBack/Goback";
import TourSchedule from "../TourDeTail/TourSchedule";

const { IoLocationOutline, FiClock, FaRegUser } = icons;

const DetailTour = () => {
  const { slug } = useParams(); // Lấy slug từ URL (ví dụ: tam-dao-mat-lanh-15)
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]); // State để lưu danh sách hình ảnh
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourAndImages = async () => {
      try {
        if (!slug) {
          throw new Error("Không tìm thấy slug trong URL");
        }

        // Tách id từ slug
        const id = slug.split("-").pop();
        // Kiểm tra xem id có phải là số không
        if (isNaN(id)) {
          throw new Error("ID không hợp lệ");
        }

        // Gọi API lấy thông tin tour
        const tourResponse = await getTourById(id);
        if (tourResponse.status !== 200) {
          throw new Error("Tour không tồn tại");
        }
        setTour(tourResponse.data);

        // Gọi API lấy danh sách hình ảnh
        const imagesResponse = await getTourImages(id);

        if (imagesResponse.status !== 200) {
          throw new Error("Không thể lấy hình ảnh tour");
        }
        setImages(imagesResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTourAndImages();
  }, [slug]);

  return (
    <div className="py-4 sm:py-6 md:py-8 lg:py-10 dark:bg-slate-900 bg-white dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h1
          className="tour_tittle py-2 pl-3 my-4 sm:my-6 md:my-8 text-xl sm:text-2xl md:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Tour
        </h1>

        {loading ? (
          <LoadingSpinner message="Đang tải danh sách tour..." />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : tour.length === 0 ? (
          <ErrorMessage error="Không tìm thấy tour nào." isWarning={true} />
        ) : (
          <>
            <div className="container mx-auto px-4 md:px-8 py-8">
              <HeaderTitle key={tour.id} tour={tour} />
              <TourImg key={images.id} images={images} />
              <TourConTent key={images.id} tour={tour} />
              <TourSchedule key={images.id} tour={tour} />
            </div>
            <GoBack />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailTour;

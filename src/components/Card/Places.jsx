import React, { useEffect, useState } from "react";
import EntriesFilter from "../Pagination";
import PlacesCard from "./PlacesCard";
import { getDataTour } from "../../services/TourService";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";

const Places = ({
  hideTitle = true,
  booking = true,
  size = "default",
  left = false,
  container = true,
  star = false,
  showPagination = true,
  title = "Khám Phá Kho Báu Việt Nam Cùng GoViet",
  tours = null,
}) => {
  const [placesData, setPlaceData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 8;

  const getAllTours = async (page = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getDataTour(page, limit);
      if (res.status !== 200) {
        throw new Error(res.data?.error || "Lỗi không xác định");
      }
      setPlaceData(res.data.tours || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message);
      setError(error.message || "Không thể tải dữ liệu tour.");
      setPlaceData([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tours) {
      setPlaceData(tours);
      setTotalPages(1);
      setError(null);
      setIsLoading(false);
    } else {
      getAllTours(currentPage);
    }
  }, [tours, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-4 sm:py-6 md:py-8 lg:py-10 dark:bg-slate-900 bg-white dark:text-white">
      <section
        data-aos="fade-up"
        className={container ? "container mx-auto px-4 sm:px-6 md:px-8" : ""}
      >
        {hideTitle && (
          <h1 className="tour_tittle py-2 pl-3 my-4 sm:my-6 md:my-8 text-xl sm:text-2xl md:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]">
            {title}
          </h1>
        )}

        {isLoading ? (
          <LoadingSpinner message="Đang tải danh sách tour..." />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : placesData.length === 0 ? (
          <ErrorMessage error="Không tìm thấy tour nào." isWarning={true} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-w-0">
            {placesData.map((item) => (
              <PlacesCard
                key={item.id}
                item={item}
                booking={booking}
                size={size}
                left={left}
                star={star}
              />
            ))}
          </div>
        )}

        {showPagination && !tours && totalPages > 1 && (
          <EntriesFilter
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
};

export default Places;

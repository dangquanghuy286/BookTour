import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";
import PlacesCard from "../Card/PlacesCard";
import { getDataTour } from "../../services/TourService";
import EntriesFilter from "../Pagination";

const DestinationCard = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("Tất cả");
  const regions = ["Tất cả", "Miền Bắc", "Miền Trung", "Miền Nam"];
  const [error, setError] = useState(null);
  const limit = 8;

  // Ánh xạ vùng theo định dạng API
  const regionMapping = {
    "Miền Bắc": "NORTH",
    "Miền Trung": "CENTRAL",
    "Miền Nam": "SOUTH",
    "Tất cả": undefined,
  };

  useEffect(() => {
    const fetchTour = async (page = 0, region = "Tất cả") => {
      setIsLoading(true);
      setError(null);
      try {
        // Chỉ thêm trường region vào filters nếu không phải "Tất cả"
        const filters =
          region === "Tất cả" ? {} : { region: regionMapping[region] };
        const res = await getDataTour(page, limit, filters);
        if (res.status === 200) {
          setData(res.data.tours || []);
          setTotalPages(res.data.totalPages || 0);
        } else {
          setError("Không thể tải danh sách tour!");
        }
      } catch (error) {
        setError(error.message || "Lỗi khi lấy danh sách tour!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTour(currentPage, selected);
  }, [currentPage, selected]);

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      <section
        className="container mx-auto px-4 py-2"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00c0d1] mt-4 mb-8 border-l-8 border-[#00c0d1] pl-3"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Khám phá các điểm đến phổ biến
        </h2>

        <div className="pt-6 dark:bg-slate-900 dark:text-white">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center justify-center p-3 bg-white border border-gray-300 rounded-full dark:bg-slate-950 shadow-[0_1px_4px_rgba(0,0,0,0.16)] w-fit mx-auto mb-12">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelected(region)}
                  className={`px-5 text-lg py-2 rounded-full font-semibold transition-all duration-300 ${
                    selected === region
                      ? "bg-[#00c0d1] text-white"
                      : "text-gray-700 dark:text-white hover:bg-gray-100 "
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            {isLoading ? (
              <LoadingSpinner message="Đang tải danh sách tour..." />
            ) : error ? (
              <ErrorMessage error={error} />
            ) : data.length === 0 ? (
              <ErrorMessage error="Không tìm thấy tour nào." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-w-0">
                {data.map((item, index) => (
                  <div
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    data-aos-duration="600"
                  >
                    <PlacesCard
                      item={item}
                      booking={true}
                      size="default"
                      left={false}
                      star={true}
                    />
                  </div>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <EntriesFilter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationCard;

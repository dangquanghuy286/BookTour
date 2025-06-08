import React from "react";
import useFilterTourBooking from "../../hooks/useFilterTourBooking";

import LoadingSpinner from "../LoadingSniper";
import TourBookedList from "./TourBookedList";

const TourBooked = () => {
  const statuses = [
    "Tất cả",
    "Chưa xác nhận",
    "Đã xác nhận",
    "Hoàn thành",
    "Đã hủy",
  ];
  const { selectedStatus, setSelectedStatus, bookings, loading } =
    useFilterTourBooking();

  return (
    <div className="bg-white dark:bg-slate-900">
      <section
        className="container mx-auto px-4 py-2"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {/* Tiêu đề */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00c0d1] mt-4 mb-8 border-l-8 border-[#00c0d1] pl-3"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Tour đã đặt
        </h2>
        <div className="pt-6 dark:bg-slate-900 dark:text-white">
          <div className="flex flex-col justify-center">
            {/* Vùng chọn trạng thái */}
            <div className="flex flex-wrap justify-center gap-3 p-3  bg-white border border-gray-300 dark:border-gray-700 rounded-full dark:bg-slate-950 shadow-[0_1px_4px_rgba(0,0,0,0.16)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.4)] mx-auto mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-3xl md:max-w-3xl">
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-3 w-full">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-1 md:py-1.5 lg:py-2 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg rounded-full font-semibold transition-all duration-300 ${
                      selectedStatus === status
                        ? "bg-[#00c0d1] text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <LoadingSpinner message="Đang tải danh sách tour..." />
            ) : bookings.length < 1 ? (
              <p className="text-center text-gray-500 dark:text-gray-300 text-base italic">
                Không có tour nào phù hợp với trạng thái này.
              </p>
            ) : (
              <TourBookedList bookings={bookings} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourBooked;

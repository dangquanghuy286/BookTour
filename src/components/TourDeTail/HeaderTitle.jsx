import React from "react";
import icons from "../../utils/icons";
import StarDisplay from "../Star";

const { IoLocationOutline, FaFacebook, MdFavorite } = icons;

const HeaderTitle = ({ tour }) => {
  return (
    <div className="flex justify-between flex-wrap items-start pb-10 gap-6">
      {/* Bên trái: Tiêu đề + sao + địa điểm */}
      <div
        data-aos="fade-left"
        className="space-y-4 bg-white dark:bg-slate-900 p-4 rounded-xl flex-1 min-w-[300px]"
      >
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-[700px] text-gray-900 dark:text-white">
            {tour.title}
          </h1>
          <div className="flex items-center gap-2">
            <StarDisplay rating={tour.average_rating} />
            <p className="text-sm sm:text-base md:text-lg">
              ( {tour.total_reviews} đánh giá)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
          <IoLocationOutline className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{tour.destination}</span>
        </div>
      </div>

      {/* Bên phải: Giá phía trên, 2 nút phía dưới */}
      <div className="flex flex-col items-end gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl min-w-[300px]">
        {/* Giá */}
        <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#00c0d1]">
          {tour.price_adult?.toLocaleString("vi-VN")}/khách
        </div>

        {/* 2 nút */}
        <div className="flex gap-3">
          {/* Nút Share Tour */}
          <div className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 p-1 w-[100px] sm:w-[120px] border border-gray-300 h-[36px] sm:h-[40px] rounded-2xl">
            <div className="flex items-center justify-center w-5 sm:h-5 sm:w-6 h-6 rounded-full bg-[#00c0d1]">
              <FaFacebook className="w-3 h-3 sm:w-4 sm:h-4 text-white " />
            </div>
            <span className="text-sm sm:text-base dark:text-bg-slate-900">
              Share Tour
            </span>
          </div>

          {/* Nút Yêu thích */}
          <div className="flex items-center gap-2 p-1 justify-center bg-white dark:bg-slate-900 w-[100px] sm:w-[120px] border border-gray-300 h-[36px] sm:h-[40px] rounded-2xl">
            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-[#00c0d1] rounded-full">
              <MdFavorite className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-sm sm:text-base dark:text-bg-slate-900">
              Tour list
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTitle;

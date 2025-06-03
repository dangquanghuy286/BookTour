import React from "react";
import icons from "../../utils/icons";
import StarDisplay from "../Star";

const { IoLocationOutline, CiShare1, MdFavorite } = icons;

const HeaderTitle = ({ tour }) => {
  console.log(tour);

  return (
    <div className="flex justify-between flex-wrap items-start pb-10 gap-6">
      {/* Bên trái: Tiêu đề + sao + địa điểm */}
      <div
        data-aos="fade-left"
        className="space-y-4 bg-white dark:bg-slate-900 p-4 rounded-xl flex-1 min-w-[300px]"
      >
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold max-w-[700px] text-gray-900 dark:text-white">
            {tour.title}
          </h1>
          <StarDisplay rating={tour.average_rating} />
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-base">
          <IoLocationOutline className="w-5 h-5" />
          <span>{tour.destination}</span>
        </div>
      </div>

      {/* Bên phải: Giá phía trên, 2 nút phía dưới */}
      <div className="flex flex-col items-end gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl min-w-[300px]">
        {/* Giá */}
        <div className="text-2xl font-bold text-primary">
          {tour.price_adult?.toLocaleString("vi-VN")}/khách
        </div>

        {/* 2 nút */}
        <div className="flex gap-3">
          {/* Nút Share Tour */}
          <div className="flex items-center justify-center gap-2 bg-white p-1 w-[120px] border border-gray-300 shadow-md h-[40px] rounded-2xl">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
              <CiShare1 className="w-4 h-4 text-black" />
            </div>
            <span className="text-gray-700 dark:text-bg-slate-900 text-sm">
              Share Tour
            </span>
          </div>

          {/* Nút Yêu thích */}
          <div className="flex items-center gap-2 p-1 justify-center bg-white w-[120px] border border-gray-300 shadow-md h-[40px] rounded-2xl">
            <div className="flex items-center justify-center w-6 h-6 bg-[#00c0d1] rounded-full">
              <MdFavorite className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-700 dark:text-bg-slate-900 text-sm">
              Tour list
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTitle;

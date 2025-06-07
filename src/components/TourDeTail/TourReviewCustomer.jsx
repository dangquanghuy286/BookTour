import React, { useState } from "react";
import { Link } from "react-router-dom";
import Img from "../../assets/Img/dauphay.webp";
import StarDisplay from "../Star";
import icons from "../../utils/icons";

const { FaUserAlt, FaEllipsisV } = icons;

const TourReviewCustomer = ({ tour }) => {
  // State để quản lý trạng thái mở/đóng của menu dropdown cho mỗi đánh giá
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // Hàm toggle menu dropdown
  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Hàm xử lý placeholder cho Sửa và Xóa
  const handleEdit = (reviewId) => {
    // Thêm logic sửa đánh giá tại đây
    setOpenMenuIndex(null); // Đóng menu sau khi chọn
  };

  const handleDelete = (reviewId) => {
    // Thêm logic xóa đánh giá tại đây
    setOpenMenuIndex(null); // Đóng menu sau khi chọn
  };
  const userInfo = JSON.parse(localStorage.getItem("user_id"));

  return (
    <div className="pt-6 bg-white dark:bg-slate-900">
      <div className="container mx-auto ">
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#00c0d1] mb-4 sm:mb-6">
            Đánh giá của các khách hàng
          </h1>
          <img
            src={Img}
            alt="Tour Policy"
            className="w-full max-w-[80px] sm:max-w-[100px] h-auto rounded-lg mb-4 sm:mb-6 object-contain"
          />
        </div>
        <div className="mt-2 sm:mt-4 md:mt-6 space-y-4 sm:space-y-6">
          {tour.reviews && tour.reviews.length > 0 ? (
            tour.reviews.map((fb, index) => (
              <div
                key={index}
                className="w-full max-w-[85%] sm:max-w-[600px] md:max-w-[720px] h-auto min-h-[160px] sm:min-h-[180px] md:min-h-[200px] bg-white dark:bg-slate-900 border border-gray-300 shadow-[0_1px_4px_rgba(0,0,0,0.16)]  rounded-2xl relative p-3 sm:p-4 md:p-5 text-gray-900 dark:text-gray-100"
              >
                {/* Avatar + Thông tin khách hàng */}
                <div className="flex items-start justify-between ">
                  <div className="flex items-start ">
                    {fb.avatar ? (
                      <img
                        src={fb.avatar}
                        alt="Avatar"
                        className="object-cover w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full"
                      />
                    ) : (
                      <FaUserAlt className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 text-gray-400 dark:text-gray-300" />
                    )}
                    <div className="ml-3 sm:ml-4 md:ml-6 space-y-1">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg">
                        {fb.user_name}
                      </h3>
                      <StarDisplay rating={fb.rating} />
                      <p className="text-xs sm:text-sm md:text-base">
                        {tour.duration}
                      </p>
                      <p className="text-xs sm:text-sm md:text-base">
                        {fb.comment}
                      </p>
                      <p className="font-semibold text-xs sm:text-sm">
                        {(() => {
                          const date = new Date(fb.created_at);
                          const day = String(date.getDate()).padStart(2, "0");
                          const month = String(date.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const year = date.getFullYear();
                          return `${day}-${month}-${year}`;
                        })()}
                      </p>
                    </div>
                  </div>
                  {/* Nút menu toggle */}
                  {/* Chỉ hiện nếu user hiện tại là người đã viết đánh giá */}
                  {fb.user_id === userInfo && (
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(index)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none"
                      >
                        <FaEllipsisV className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      {openMenuIndex === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handleEdit(fb.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(fb.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              Chưa có đánh giá nào.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourReviewCustomer;

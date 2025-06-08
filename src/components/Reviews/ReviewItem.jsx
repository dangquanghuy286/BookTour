/* eslint-disable no-unused-vars */
import React from "react";
import icons from "../../utils/icons";
import StarDisplay from "../Star";
import ReviewMenu from "./ReviewMenu";
const { FaUserAlt } = icons;
const ReviewItem = ({
  review,
  index,
  tour,
  userInfo,
  openMenuIndex,
  toggleMenu,
  handleEdit,
  handleDelete,
  isLoading,
}) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Ngày không hợp lệ";
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      return "Ngày không hợp lệ";
    }
  };

  return (
    <div
      key={review.review_id || index}
      className="w-full max-w-[85%] sm:max-w-[600px] md:max-w-[720px] h-auto min-h-[160px] sm:min-h-[180px] md:min-h-[200px] bg-white dark:bg-slate-900 border border-gray-300 shadow-[0_1px_4px_rgba(0,0,0,0.16)] rounded-2xl relative p-3 sm:p-4 md:p-5 text-gray-900 dark:text-gray-100"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt="Avatar"
              className="object-cover w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full"
            />
          ) : (
            <FaUserAlt className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 text-gray-400 dark:text-gray-300" />
          )}
          <div className="ml-3 sm:ml-4 md:ml-6 space-y-1">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg">
              {review.user_name || "Người dùng"}
            </h3>
            <StarDisplay rating={review.rating || 0} />
            <p className="text-xs sm:text-sm md:text-base">{tour.duration}</p>
            <p className="text-xs sm:text-sm md:text-base">
              {review.comment || "Không có nội dung"}
            </p>
            <p className="font-semibold text-xs sm:text-sm">
              {formatDate(review.created_at)}
            </p>
          </div>
        </div>
        {!isNaN(userInfo) && review.user_id === userInfo && (
          <ReviewMenu
            index={index}
            openMenuIndex={openMenuIndex}
            toggleMenu={toggleMenu}
            handleEdit={() => handleEdit(review)}
            handleDelete={() => handleDelete(review.review_id)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewItem;

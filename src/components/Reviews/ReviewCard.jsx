import React, { useState } from "react";
import icons from "../../utils/icons";
import StarDisplay from "../Star";
const { FaUserAlt } = icons;

const ReviewCard = ({ review }) => {
  const { comment, rating, created_at, avatar, user_name } = review;
  const [avatarError, setAvatarError] = useState(false);

  const borderColor = "#00c0d1";

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

  const avatarComponent =
    !avatar || avatarError ? (
      <div
        className="w-16 h-16 rounded-full bg-gray-200 border-2 flex items-center justify-center shrink-0"
        style={{ borderColor }}
      >
        {user_name ? (
          <span className="text-gray-700 font-bold text-xl">
            {user_name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <FaUserAlt className="w-8 h-8 text-gray-400" />
        )}
      </div>
    ) : (
      <img
        src={avatar}
        alt={`${user_name}'s avatar`}
        className="w-16 h-16 rounded-full object-cover border-2 shrink-0"
        style={{ borderColor }}
        onError={() => setAvatarError(true)}
      />
    );

  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 flex gap-5 items-start max-w-lg border border-gray-300 dark:border-slate-700 shadow-[0_1px_4px_rgba(0,0,0,0.16)] transition-all duration-300">
      {avatarComponent}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1 gap-2">
          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 truncate max-w-[160px]">
            {user_name || "Người dùng"}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
            {formatDate(created_at)}
          </span>
        </div>

        <div className="my-2">
          <StarDisplay rating={rating || 0} />
        </div>

        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
          {comment || "Không có nội dung"}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;

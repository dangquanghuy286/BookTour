import React, { useState } from "react";
import icons from "../../utils/icons";
const { FaStar } = icons;
const ReviewCard = ({ review }) => {
  const { comment, rating, created_at, avatar, user_name } = review;
  const [avatarError, setAvatarError] = useState(false);

  const borderColor = "#00c0d1";

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const dateFormatted = new Date(created_at).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const avatarComponent =
    !avatar || avatarError ? (
      <div
        className="w-16 h-16 rounded-full bg-gray-200 border-2 flex items-center justify-center"
        style={{ borderColor }}
      >
        <span className="text-gray-700 font-bold text-xl">
          {user_name?.charAt(0).toUpperCase() || "U"}
        </span>
      </div>
    ) : (
      <img
        src={avatar}
        alt={`${user_name}'s avatar`}
        className="w-16 h-16 rounded-full object-cover border-2"
        style={{ borderColor }}
        onError={() => setAvatarError(true)}
      />
    );

  return (
    <div className="bg-white dark:bg-slate-950  rounded-2xl p-6 flex gap-5 items-start max-w-lg border border-gray-300  transition-all duration-300  ">
      {avatarComponent}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 truncate max-w-[160px]">
            {user_name}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {dateFormatted}
          </span>
        </div>
        <div className="flex items-center gap-1 my-2">
          {[...Array(fullStars)].map((_, i) => (
            <FaStar
              key={`full-${i}`}
              className="text-yellow-400 fill-yellow-400"
              size={20}
            />
          ))}
          {halfStar && (
            <div className="relative">
              <FaStar className="text-gray-300" size={20} />
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <FaStar className="text-yellow-400 fill-yellow-400" size={20} />
              </div>
            </div>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <FaStar key={`empty-${i}`} className="text-gray-300" size={20} />
          ))}
        </div>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;

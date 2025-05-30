import React from "react";
import { Link } from "react-router-dom";
import StarDisplay from "../Star";
import icons from "../../utils/icons";
const { FiClock, MdFavorite, FaRegUser, IoLocationOutline } = icons;
const PlacesCard = ({
  item,
  booking = true,
  size = "default",
  left = false,
  star = false,
}) => {
  const sizeClasses =
    size === "small"
      ? "max-w-[280px] sm:max-w-[300px]"
      : size === "large"
      ? "w-full"
      : "max-w-[300px] sm:max-w-[350px]";

  return (
    <div
      className={`p-4 sm:p-5 dark:bg-slate-950 transition-all duration-500 shadow-[0_1px_4px_rgba(0,0,0,0.16)]
 cursor-pointer rounded-3xl  border border-gray-300 flex flex-col h-full ${sizeClasses} ${
        left ? "sm:ml-4" : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-3xl">
        <Link to={`/tours/${item.id}`}>
          <img
            src={item.img}
            alt={item.title}
            className="mx-auto h-[180px] sm:h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </Link>
        <div className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full right-4 top-4 sm:right-5 sm:top-5">
          <MdFavorite className="w-4 h-4 text-center text-orange-500" />
        </div>
        {star && (
          <div className="absolute flex items-center p-2 justify-center bg-white w-[90px] sm:w-[100px] h-[24px] rounded-full bottom-3 left-1/2 -translate-x-1/2">
            <StarDisplay rating={item.star} />
          </div>
        )}
      </div>
      {/* Phần nội dung */}
      <div className="flex-grow p-2 mt-2 space-y-2">
        <div className="flex gap-2 opacity-70 items-center">
          <IoLocationOutline className="w-6 h-6 sm:w-6 sm:h-6" />
          <p className="text-sm sm:text-base line-clamp-1">
            {item.destination}
          </p>
        </div>
        <Link
          to={`/tours/${item.id}`}
          onClick={() => window.scrollTo(0, 0)}
          className="text-base  sm:text-lg font-bold text-left hover:underline line-clamp-2"
        >
          {item.title}
        </Link>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <p>{item.duration}</p>
          </div>
          <div className="flex items-center">
            <FaRegUser className="w-4 h-4" />
            <span className="ml-1">{item.availableSlots}</span>
          </div>
        </div>
      </div>
      {/* Phần giá và nút */}
      <div className="flex items-center justify-between py-3 mt-3 border-t-2">
        <div className="opacity-70">
          <p className="text-sm sm:text-base font-bold">
            {item.price_adult}/người
          </p>
        </div>
        {booking && (
          <div className="flex items-center gap-2">
            <Link
              to={`/tours/${item.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-md text-white font-semibold text-xs sm:text-sm md:text-base bg-[#00c0d1] hover:bg-[#0090a0] transition-colors duration-200 whitespace-nowrap"
            >
              Đặt ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesCard;

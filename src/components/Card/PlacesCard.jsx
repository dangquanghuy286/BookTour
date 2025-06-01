import React from "react";
import { Link } from "react-router-dom";
import StarDisplay from "../Star";
import icons from "../../utils/icons";
const { FiClock, FaRegUser, IoLocationOutline } = icons;

const PlacesCard = ({
  item,
  booking = true,
  size = "default",
  left = false,
  star = false,
}) => {
  const sizeClasses =
    size === "small"
      ? "w-full max-w-[90%] sm:max-w-[280px]"
      : size === "large"
      ? "w-full"
      : "w-full max-w-[95%] sm:max-w-[320px] md:max-w-[350px]";

  return (
    <div
      className={`p-3 sm:p-4 md:p-5 dark:bg-slate-950 transition-all duration-500 shadow-[0_1px_4px_rgba(0,0,0,0.16)]
 cursor-pointer rounded-2xl sm:rounded-3xl border border-gray-300 flex flex-col h-full ${sizeClasses} ${
        left ? "sm:ml-2 md:ml-4" : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
        <Link to={`/tours/${item.id}`}>
          <img
            src={item.img}
            alt={item.title}
            className="mx-auto h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </Link>

        {star && (
          <div className="absolute flex items-center p-1.5 sm:p-2 justify-center w-[80px] sm:w-[90px] md:w-[100px] h-[22px] sm:h-[24px] rounded-full bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/40 backdrop-blur-sm">
            <div className="w-[60px] sm:w-[70px] md:w-[80px]  overflow-hidden">
              <StarDisplay rating={item.star} />
            </div>
          </div>
        )}
      </div>
      {/* Phần nội dung */}
      <div className="flex-grow p-2 sm:p-3 mt-2 space-y-1.5 sm:space-y-2">
        <div className="flex gap-1.5 sm:gap-2 opacity-70 items-center">
          <IoLocationOutline className="w-5 h-5 sm:w-6 sm:h-6" />
          <p className="text-xs sm:text-sm md:text-base line-clamp-1">
            {item.destination}
          </p>
        </div>
        <Link
          to={`/tours/${item.id}`}
          onClick={() => window.scrollTo(0, 0)}
          className="text-sm sm:text-base md:text-lg font-bold text-left hover:underline line-clamp-2"
        >
          {item.title}
        </Link>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <FiClock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <p>{item.duration}</p>
          </div>
          <div className="flex items-center">
            <FaRegUser className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="ml-1">{item.availableSlots}</span>
          </div>
        </div>
      </div>
      {/* Phần giá và nút */}
      <div className="flex items-center justify-between py-2 sm:py-3 mt-2 sm:mt-3 border-t-2">
        <div className="opacity-70">
          <p className="text-xs sm:text-sm md:text-base font-bold">
            {item.price_adult}/người
          </p>
        </div>
        {booking && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to={`/tours/${item.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-md text-white font-semibold text-xs sm:text-sm bg-[#00c0d1] hover:bg-[#0090a0] transition-colors duration-200 whitespace-nowrap"
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

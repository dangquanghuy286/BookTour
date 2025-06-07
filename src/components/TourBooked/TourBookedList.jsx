import React from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";

const { MdLocationOn, FaPhoneAlt, FaCalendarAlt, FaUserAlt, MdOutlinePayment } =
  icons;

const TourBookedList = ({ bookings }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getStatusInfo = (status) => {
    switch (status) {
      case "PENDING":
        return { bg: "bg-yellow-400/70", text: "Chờ xác nhận" };
      case "CONFIRMED":
        return { bg: "bg-blue-500/70", text: "Đã xác nhận" };
      case "COMPLETED":
        return { bg: "bg-green-500/70", text: "Hoàn thành" };
      default:
        return { bg: "bg-red-500/70", text: "Đã hủy" };
    }
  };

  return (
    <div className="pt-4 sm:pt-6 lg:pt-8">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10">
        {bookings.map((booking, index) => {
          const statusInfo = getStatusInfo(booking.booking_status);

          return (
            <div
              key={index}
              className="w-full p-3 sm:p-4 lg:p-6 xl:p-8 rounded-lg sm:rounded-xl shadow-sm sm:shadow border border-gray-200 dark:border-gray-700 dark:bg-slate-950"
            >
              <div className="relative flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
                {/* Tour Image */}
                <div className="relative flex-shrink-0 w-full lg:w-[280px] xl:w-[320px] 2xl:w-[360px]">
                  <img
                    src={booking.img}
                    alt={booking.title}
                    className="w-full h-[200px] sm:h-[250px] lg:h-[200px] xl:h-[240px] 2xl:h-[280px] rounded-lg object-cover shadow-md"
                  />
                  <div
                    className={`absolute w-[115px] top-2 left-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md ${statusInfo.bg}`}
                  >
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {statusInfo.text}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3 sm:space-y-4 lg:space-y-5">
                  {/* Header Section */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Booking ID: #{booking.booking_id}
                      </p>
                      <Link className="flex items-start gap-2 group">
                        <MdLocationOn className="text-base sm:text-lg lg:text-xl text-red-500 mt-0.5 flex-shrink-0" />
                        <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 dark:text-white leading-tight group-hover:text-blue-600 transition-colors break-words">
                          {booking.title}
                        </h1>
                      </Link>
                    </div>
                    <div className="text-right sm:text-left lg:text-right flex-shrink-0">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Tổng tiền
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-red-600 dark:text-red-400">
                        {booking.total_price?.toLocaleString()} VNĐ
                      </p>
                    </div>
                  </div>

                  {/* Main Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                    {/* Customer Info */}
                    <div className="text-xs sm:text-sm lg:text-base space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-1">
                        Khách hàng
                      </h3>
                      <div className="space-y-1.5">
                        <p className="break-words">
                          <span className="font-medium text-gray-600 dark:text-gray-400">
                            Họ tên:
                          </span>{" "}
                          <span className="text-gray-800 dark:text-gray-200">
                            {booking.full_name}
                          </span>
                        </p>
                        <div className="flex items-center gap-2">
                          <FaPhoneAlt className="text-gray-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400 break-all">
                            {booking.phone_number}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tour Info */}
                    <div className="text-xs sm:text-sm lg:text-base space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-1">
                        Tour
                      </h3>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <FaCalendarAlt className="text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400 break-words">
                            {formatDate(booking.start_date)} -{" "}
                            {formatDate(booking.end_date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUserAlt className="text-gray-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {booking.num_adults} người lớn,{" "}
                            {booking.num_children} trẻ em
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 pt-2 sm:pt-3">
                    <div className="text-xs sm:text-sm lg:text-base space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-1">
                        Thanh toán
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                          <MdOutlinePayment className="text-gray-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {booking.payment_method}
                          </span>
                        </div>
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            booking.payment_status === "COMPLETED"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {booking.payment_status === "COMPLETED"
                            ? "Đã thanh toán"
                            : "Chưa thanh toán"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {/* {booking.special_requests && (
                    <div className="pt-2 sm:pt-3">
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 mb-2">
                        Yêu cầu đặc biệt
                      </h3>
                      <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border-l-4 border-blue-400">
                        {booking.special_requests}
                      </div>
                    </div>
                  )} */}

                  {/* Divider */}
                  <hr className="my-3 sm:my-4 lg:my-5 border-gray-200 dark:border-gray-700" />

                  {/* Action Button */}
                  {booking.booking_status === "COMPLETED" && (
                    <div className="flex justify-start">
                      <Link
                        to={`/tours/${booking.tour_id}`}
                        onClick={() => {
                          localStorage.setItem(
                            "booking_id",
                            booking.booking_id
                          );
                          localStorage.setItem("tour_id", booking.tour_id);
                          window.scrollTo(0, 0);
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium rounded-lg border-2 border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      >
                        <span>Đánh giá</span>
                        <span className="text-base">↗</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TourBookedList;

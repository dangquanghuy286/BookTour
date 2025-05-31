/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { destinations, prices, durations } from "../../contexts/TourContext";
import icons from "../../utils/icons";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSniper";

const { MdLocationOn, MdAccessTime, MdAttachMoney, FaSyncAlt } = icons;

const HeroFilter = () => {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!destination && !duration && !price) {
      setError("Vui lòng chọn ít nhất một tiêu chí tìm kiếm");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Tìm kiếm với:", { destination, duration, price });
    } catch (err) {
      setError("Có lỗi xảy ra khi tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setDestination("");
    setDuration("");
    setPrice("");
    setError(null);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30 sm:bg-black/35 md:bg-black/40 z-10"></div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 relative z-20">
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-2 sm:mb-3 md:mb-4 lg:mb-5">
            <div className="inline-block px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              Xin chào và chào mừng bạn đến với GOVIET! 🇻🇳
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 md:mb-3 leading-tight drop-shadow-2xl">
              Khám phá{" "}
              <span className="text-[#00c0d1] drop-shadow-lg">niềm vui</span>{" "}
              dành riêng cho bạn!
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-white/90 mb-1 drop-shadow-lg">
              Hàng nghìn trải nghiệm thú vị đang chờ bạn khám phá!
            </p>

            <p className="text-xs sm:text-sm text-[#00c0d1] font-medium drop-shadow-lg">
              Đừng chần chừ, hãy đặt ngay
            </p>
          </div>

          {/* Search Form */}
          <div className="relative">
            <div className="bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-3 md:p-4 lg:p-5 backdrop-blur-sm border border-gray-300">
              {error && (
                <ErrorMessage
                  isWarning={
                    error === "Vui lòng chọn ít nhất một tiêu chí tìm kiếm"
                  }
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                {/* Destination Field */}
                <div className="group">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Điểm đến
                  </label>
                  <div className="relative">
                    <MdLocationOn className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 md:w-4 h-3 sm:h-4 md:h-4 text-gray-400 group-focus-within:text-[#019fb5] transition-colors" />
                    <select
                      className="w-full pl-6 sm:pl-8 md:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-600"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <option value="">Chọn điểm đến</option>
                      {destinations.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Duration Field */}
                <div className="group">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Thời gian
                  </label>
                  <div className="relative">
                    <MdAccessTime className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 md:w-4 h-3 sm:h-4 md:h-4 text-gray-400 group-focus-within:text-[#019fb5] transition-colors" />
                    <select
                      className="w-full pl-6 sm:pl-8 md:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-600"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="">Chọn thời gian</option>
                      {durations.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Field */}
                <div className="group sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Giá cả
                  </label>
                  <div className="relative">
                    <MdAttachMoney className="absolute left-2 sm:left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 md:w-4 h-3 sm:h-4 md:h-4 text-gray-400 group-focus-within:text-[#019fb5] transition-colors" />
                    <select
                      className="w-full pl-6 sm:pl-8 md:pl-9 pr-2 sm:pr-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-600"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <option value="">Chọn giá</option>
                      {prices.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <div className="flex gap-2 sm:gap-3 md:gap-4">
                  <button
                    className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-[#019fb5] to-[#00c0d1] hover:from-[#018fa5] hover:to-[#00b0c1] text-white font-semibold rounded-md sm:rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <span className="text-sm sm:text-base">🔍</span>
                        <span>Tìm kiếm ngay</span>
                      </>
                    )}
                  </button>

                  <button
                    className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-semibold rounded-md sm:rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base"
                    onClick={resetFilters}
                    disabled={loading}
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFilter;

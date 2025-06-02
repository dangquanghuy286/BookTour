import React, { useState } from "react";
import icons from "../../utils/icons";

import {
  durations,
  priceRanges,
  regions,
  sortOptions,
} from "../../contexts/TourContext";
import StarDisplay from "../Star";

const {
  FiFilter,
  FaChevronDown,
  FaChevronUp,
  IoLocationOutline,
  FiClock,
  MdAttachMoney,
  FaTimes,
} = icons;

const Filter = ({ onFilterChange, totalResults = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [rating, setRating] = useState(0); // State để lưu giá trị rating

  const handlePriceRangeChange = (range) => {
    onFilterChange({ priceRange: { ...range, label: range.label } });
  };

  const handleRatingChange = (value) => {
    setRating(value);
    onFilterChange({ rating: value }); // Gửi giá trị rating lên parent component
  };

  const clearFilters = () => {
    const defaultFilters = {
      region: "",
      priceRange: { min: 0, max: 10000000, label: "" },
      duration: "",
      sortBy: "newest",
      rating: 0, // Reset rating
    };
    onFilterChange(defaultFilters);
    setRating(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.16)] border border-gray-300 overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50 dark:hover:from-slate-800 dark:hover:to-slate-800 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#00c0d1] to-[#00a0b0] shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
            <FiFilter className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-900 dark:text-white">
              Bộ lọc tìm kiếm
            </h3>
          </div>
          {totalResults > 0 && (
            <div className="ml-auto mr-2">
              <span className="bg-gradient-to-r from-[#00c0d1] to-[#00a0b0] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                {totalResults}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {isOpen ? (
            <FaChevronUp className="w-4 h-4 text-[#00c0d1]" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="border-t border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50/50 to-white dark:from-slate-800/50 dark:to-slate-900">
          <div className="p-4 space-y-6">
            {/* Sắp xếp */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#00c0d1]"></div>
                Sắp xếp theo
              </label>
              <select
                onChange={(e) => onFilterChange({ sortBy: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#00c0d1]/20 focus:border-[#00c0d1] transition-all duration-300 hover:border-[#00c0d1]/50"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Khu vực */}
            <div className="group">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <div className="p-1.5 rounded-lg bg-[#00c0d1]/10">
                  <IoLocationOutline className="w-4 h-4 text-[#00c0d1]" />
                </div>
                Khu vực
              </label>
              <select
                onChange={(e) => onFilterChange({ region: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-[#00c0d1]/20 focus:border-[#00c0d1] transition-all duration-300 hover:border-[#00c0d1]/50"
              >
                {regions.map((region) => (
                  <option
                    key={region}
                    value={region === "Tất cả khu vực" ? "" : region}
                  >
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Thời gian */}
            <div className="group">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <div className="p-1.5 rounded-lg bg-[#00c0d1]/10">
                  <FiClock className="w-4 h-4 text-[#00c0d1]" />
                </div>
                Thời gian tour
              </label>
              <select
                onChange={(e) => onFilterChange({ duration: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-[#00c0d1]/20 focus:border-[#00c0d1] transition-all duration-300 hover:border-[#00c0d1]/50"
              >
                {durations.map((duration) => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Khoảng giá */}
            <div className="group">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                <div className="p-1.5 rounded-lg bg-[#00c0d1]/10">
                  <MdAttachMoney className="w-4 h-4 text-[#00c0d1]" />
                </div>
                Khoảng giá
              </label>
              <div className="space-y-3">
                {priceRanges.map((range, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#00c0d1]/5 transition-all duration-200 group/item"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="priceRange"
                        onChange={() => handlePriceRangeChange(range)}
                        className="sr-only"
                      />
                      <div
                        className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover/item:border-[#00c0d1] transition-all duration-200"
                        style={{
                          borderColor: "var(--checked, #d1d5db)",
                          background: "var(--checked-bg, transparent)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.setProperty("--checked", "#00c0d1");
                        }}
                        onMouseLeave={(e) => {
                          if (!e.target.previousElementSibling.checked) {
                            e.target.style.setProperty("--checked", "#d1d5db");
                          }
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#00c0d1] opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium group-hover/item:text-[#00c0d1] transition-colors duration-200">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Đánh giá */}
            <div className="group">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <div className="p-1.5 rounded-lg bg-[#00c0d1]/10">
                  <span className="text-[#00c0d1]">★</span>
                </div>
                Đánh giá
              </label>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label
                    key={star}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#00c0d1]/5 transition-all duration-200 group/item"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={rating === star}
                        onChange={() => handleRatingChange(star)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                          rating === star
                            ? "border-[#00c0d1]"
                            : "border-gray-300 group-hover/item:border-[#00c0d1]"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-[#00c0d1] transition-opacity duration-200 ${
                            rating === star
                              ? "opacity-100"
                              : "opacity-0 group-hover/item:opacity-100"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/item:text-[#00c0d1]">
                      <StarDisplay rating={star} />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={clearFilters}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-lg hover:border-[#00c0d1] hover:text-[#00c0d1] hover:bg-[#00c0d1]/5 transition-all duration-300 flex items-center justify-center gap-2 font-medium group"
              >
                <FaTimes className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                Xóa bộ lọc
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#00c0d1] to-[#00a0b0] text-white rounded-lg hover:from-[#00a0b0] hover:to-[#008a99] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;

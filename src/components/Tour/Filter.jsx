import React, { useState } from "react";
import icons from "../../utils/icons";

const {
  FiFilter,
  FaChevronDown,
  FaChevronUp,
  IoLocationOutline,
  FiClock,
  MdAttachMoney,
  FaCalendarAlt,
  FaTimes,
} = icons;

const Filter = ({ onFilterChange, totalResults = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    destination: "",
    priceRange: { min: 0, max: 10000000 },
    duration: "",
    category: "",
    sortBy: "popular",
  });

  // Dữ liệu cho các tùy chọn lọc
  const destinations = [
    "Tất cả điểm đến",
    "Đà Nẵng",
    "Sapa",
    "Hạ Long",
    "Phú Quốc",
    "Nha Trang",
    "Đà Lạt",
    "Hồ Chí Minh",
    "Huế",
    "Hội An",
    "Cần Thơ",
  ];

  const durations = [
    "Tất cả thời gian",
    "1 ngày",
    "2-3 ngày",
    "4-5 ngày",
    "1 tuần",
    "Trên 1 tuần",
  ];

  const categories = [
    "Tất cả loại tour",
    "Du lịch biển",
    "Du lịch núi",
    "Du lịch đảo",
    "Du lịch văn hóa",
    "Du lịch lịch sử",
    "Du lịch ẩm thực",
    "Du lịch nghỉ dưỡng",
  ];

  const sortOptions = [
    { value: "popular", label: "Phổ biến nhất" },
    { value: "price-low", label: "Giá thấp đến cao" },
    { value: "price-high", label: "Giá cao đến thấp" },
    { value: "newest", label: "Mới nhất" },
    { value: "rating", label: "Đánh giá cao nhất" },
  ];

  const priceRanges = [
    { label: "Dưới 1 triệu", min: 0, max: 1000000 },
    { label: "1-3 triệu", min: 1000000, max: 3000000 },
    { label: "3-5 triệu", min: 3000000, max: 5000000 },
    { label: "5-10 triệu", min: 5000000, max: 10000000 },
    { label: "Trên 10 triệu", min: 10000000, max: 50000000 },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handlePriceRangeChange = (range) => {
    const newFilters = { ...filters, priceRange: range };
    setFilters(newFilters);

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      destination: "",
      priceRange: { min: 0, max: 10000000 },
      duration: "",
      category: "",
      sortBy: "popular",
    };
    setFilters(defaultFilters);

    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  const hasActiveFilters = () => {
    return (
      filters.destination ||
      filters.duration ||
      filters.category ||
      filters.priceRange.min > 0 ||
      filters.priceRange.max < 10000000
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <FiFilter className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Bộ lọc tìm kiếm
          </h3>
          {hasActiveFilters() && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
              Đang lọc
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {totalResults > 0 && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {totalResults} kết quả
            </span>
          )}
          {isOpen ? (
            <FaChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-6">
          {/* Sắp xếp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sắp xếp theo
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Điểm đến */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <IoLocationOutline className="w-4 h-4" />
              Điểm đến
            </label>
            <select
              value={filters.destination}
              onChange={(e) =>
                handleFilterChange("destination", e.target.value)
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {destinations.map((dest) => (
                <option
                  key={dest}
                  value={dest === "Tất cả điểm đến" ? "" : dest}
                >
                  {dest}
                </option>
              ))}
            </select>
          </div>

          {/* Thời gian */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiClock className="w-4 h-4" />
              Thời gian tour
            </label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {durations.map((duration) => (
                <option
                  key={duration}
                  value={duration === "Tất cả thời gian" ? "" : duration}
                >
                  {duration}
                </option>
              ))}
            </select>
          </div>

          {/* Loại tour */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaCalendarAlt className="w-4 h-4" />
              Loại tour
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category === "Tất cả loại tour" ? "" : category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Khoảng giá */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <MdAttachMoney className="w-4 h-4" />
              Khoảng giá
            </label>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={
                      filters.priceRange.min === range.min &&
                      filters.priceRange.max === range.max
                    }
                    onChange={() => handlePriceRangeChange(range)}
                    className="text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={clearFilters}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Xóa bộ lọc
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;

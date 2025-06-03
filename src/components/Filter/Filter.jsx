import React, { useState } from "react";
import icons from "../../utils/icons";
import {
  durations,
  priceRanges,
  regions,
  sortOptions,
} from "../../contexts/TourContext";
import StarDisplay from "../Star";
import FilterSelect from "./FilterSelect";
import FilterRadioGroup from "./FilterRadioGroup";

const {
  FiFilter,
  FaChevronDown,
  FaChevronUp,
  IoLocationOutline,
  FiClock,
  MdAttachMoney,
} = icons;

const Filter = ({ onFilterChange, totalResults = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [rating, setRating] = useState(0);

  const handleChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const handlePriceChange = (range) => {
    onFilterChange({ priceRange: { ...range, label: range.label } });
  };

  const handleRatingChange = (value) => {
    setRating(value);
    handleChange("rating", value);
  };

  const clearFilters = () => {
    setRating(0);
    onFilterChange({
      region: "",
      priceRange: { min: 0, max: 10000000, label: "" },
      duration: "",
      sortBy: "newest",
      rating: 0,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow border border-gray-300 overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-cyan-50 dark:hover:bg-slate-800 transition"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#00c0d1] to-[#00a0b0] shadow">
            <FiFilter className="text-white w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Bộ lọc tìm kiếm
          </h3>
          {totalResults > 0 && (
            <span className="ml-2 bg-gradient-to-r from-[#00c0d1] to-[#00a0b0] text-white text-xs font-medium px-3 py-1 rounded-full shadow">
              {totalResults}
            </span>
          )}
        </div>
        {isOpen ? (
          <FaChevronUp className="text-[#00c0d1] w-4 h-4" />
        ) : (
          <FaChevronDown className="text-gray-400 w-4 h-4" />
        )}
      </div>

      {isOpen && (
        <div className=" dark:border-gray-700 bg-gradient-to-br from-gray-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 p-4 space-y-6">
          {/* Sort */}
          <FilterSelect
            label="Sắp xếp theo"
            icon={<div className="w-2 h-2 rounded-full bg-[#00c0d1]" />}
            options={sortOptions}
            onChange={(val) => handleChange("sortBy", val)}
          />

          {/* Region */}
          <FilterSelect
            label="Khu vực"
            icon={<IoLocationOutline className="text-[#00c0d1] w-4 h-4" />}
            options={regions.map((r) => ({
              value: r === "Tất cả khu vực" ? "" : r,
              label: r,
            }))}
            onChange={(val) => handleChange("region", val)}
          />

          {/* Duration */}
          <FilterSelect
            label="Thời gian tour"
            icon={<FiClock className="text-[#00c0d1] w-4 h-4" />}
            options={durations}
            onChange={(val) => handleChange("duration", val)}
          />

          {/* Price Range */}
          <FilterRadioGroup
            label="Khoảng giá"
            icon={<MdAttachMoney className="text-[#00c0d1] w-4 h-4" />}
            options={priceRanges.map((r) => ({ label: r.label, value: r }))}
            name="priceRange"
            onChange={(val) => handlePriceChange(val)}
          />

          {/* Rating */}
          <FilterRadioGroup
            label="Đánh giá"
            icon={<span className="text-[#00c0d1]">★</span>}
            options={[5, 4, 3, 2, 1].map((star) => ({
              label: <StarDisplay rating={star} />,
              value: star,
            }))}
            name="rating"
            selectedValue={rating}
            onChange={(val) => handleRatingChange(val)}
          />

          {/* Clear Filters */}
          <div className="pt-2 text-right">
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-[#00c0d1] hover:underline"
            >
              Xoá bộ lọc
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;

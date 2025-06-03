import React, { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronRight } from "react-icons/fa";

const TourSchedule = ({ tour }) => {
  const [openDay, setOpenDay] = useState(null);

  const toggleDropdown = (day) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <div className="pt-10">
      <div className="container">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Lịch Trình
        </h1>
        <div className="w-full md:w-3/4 mt-6 space-y-4">
          {tour.itinerary.map((dayItem) => (
            <div
              key={dayItem.day}
              className="border border-gray-300 bg-white dark:bg-slate-900 p-5 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
            >
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg"
                onClick={() => toggleDropdown(dayItem.day)}
              >
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-xl text-[#00c0d1]" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Ngày {dayItem.day}: {dayItem.title}
                  </span>
                </div>
                <div className="flex items-center justify-center w-6 h-6">
                  {openDay === dayItem.day ? (
                    <FaChevronDown className="text-lg text-gray-600 dark:text-gray-300" />
                  ) : (
                    <FaChevronRight className="text-lg text-gray-600 dark:text-gray-300" />
                  )}
                </div>
              </div>
              {openDay === dayItem.day && (
                <ul className="mt-4 ml-8 space-y-2 text-gray-600 dark:text-gray-300 list-disc">
                  {dayItem.content.map((line, index) => (
                    <li key={index} className="text-base">
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourSchedule;

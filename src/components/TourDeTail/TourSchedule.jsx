import React, { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronRight } from "react-icons/fa";
import Img from "../../assets/Img/dauphay.webp";
const TourSchedule = ({ tour }) => {
  const [openDay, setOpenDay] = useState(null);

  const toggleDropdown = (day) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <div className="pt-10">
      <div className="container">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold text-[#00c0d1] mb-4">Lịch Trình</h1>
          <img
            src={Img}
            alt="Tour Policy"
            className="w-full max-w-[100px] h-auto rounded-lg  mb-6 object-contain"
          />
        </div>
        <div className="w-full md:w-3/4 mt-6 space-y-4">
          {tour.itinerary.map((dayItem) => (
            <div
              key={dayItem.day}
              className="border border-gray-300 bg-white dark:bg-slate-900 p-2  rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
            >
              <div
                className="flex items-center justify-between cursor-pointer  p-2 rounded-lg"
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

import React from "react";
import icons from "../../utils/icons";

import TourSidebar from "./TourSideBar";
const { FaCheck, IoCloseSharp } = icons;

const TourConTent = ({ tour }) => {
  return (
    <div className="pt-10">
      <div className="container">
        <h1 className="text-3xl font-semibold ">Khám phá Tours</h1>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="w-full md:w-3/4">
            <h1 className="mt-2 text-2xl font-semibold text-[#00c0d1]">
              Điểm nhấn
            </h1>
            <div className="mt-2 space-y-2 text-lg ">
              {tour.description.split("|").map((part, index) => (
                <p key={index} className="text-black dark:text-white ">
                  <span className="font-semibold text-[#00c0d1]">
                    {part.trim().split(":")[0]}:
                  </span>{" "}
                  {part.trim().split(":").slice(1).join(":").trim()}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Card: Bao gồm */}
              <div className="w-full p-5 border border-gray-300 shadow-[0_1px_4px_rgba(0,0,0,0.16)] rounded-xl bg-white dark:bg-slate-900 ">
                <h1 className="text-2xl font-semibold text-[#00c0d1]">
                  Bao gồm
                </h1>
                <div className="mt-5 space-y-5">
                  {tour.include.map((incl, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheck className="w-4 h-4 text-green-300" />
                      <p>{incl}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Card: Không bao gồm */}
              <div className="w-full p-5 border border-gray-300 shadow-[0_1px_4px_rgba(0,0,0,0.16)] rounded-xl bg-white dark:bg-slate-900 ">
                <h1 className="text-2xl font-semibold text-[#00c0d1]">
                  Không bao gồm
                </h1>
                <div className="mt-5 space-y-5">
                  {tour.notinclude.map((notincl, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <IoCloseSharp className="w-4 h-4 text-orange-500" />
                      <p>{notincl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <TourSidebar tour={tour} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourConTent;

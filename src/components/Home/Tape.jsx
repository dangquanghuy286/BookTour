import React, { Fragment } from "react";
import { data } from "../../contexts/TourContext";

const Tape = () => {
  return (
    <div className="overflow-hidden">
      <div className="bg-gradient-to-r from-teal-300 to-[#03a0c5]">
        <div className="relative flex">
          <div className="animate-scroll flex flex-none gap-6 py-3 will-change-transform">
            {/* Tạo 3 bản sao để đảm bảo animation liền mạch */}
            {[...new Array(3)].map((_, setIndex) => (
              <Fragment key={setIndex}>
                {data.map((item) => (
                  <div key={`${setIndex}-${item.id}`} className="flex-none">
                    <img
                      src={item.logoLink}
                      alt={`logo-${item.id}`}
                      className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>

          {/* Gradient overlay để tạo hiệu ứng fade */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#03a0c5] to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#03a0c5] to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Tape;

import React from "react";
import { Link } from "react-router-dom";
import Img from "../../assets/Img/dauphay.webp";

const TourFAQ = () => {
  return (
    <div className="pt-6 bg-white dark:bg-slate-900">
      <div className="container">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-xl md:text-2xl font-bold text-[#00c0d1] mb-4">
            Câu Hỏi Thường Gặp
          </h1>
          <img
            src={Img}
            alt="Tour Policy"
            className="w-full max-w-[100px] h-auto rounded-lg mb-6 object-contain"
          />
        </div>
        <div className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
            Bạn có thể xem Câu hỏi thường gặp
          </p>
          <Link
            to="/faq"
            className="text-sm sm:text-base md:text-lg text-[#00c0d1] font-medium hover:underline hover:text-[#009fb0] transition-colors duration-200"
          >
            tại đây
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourFAQ;

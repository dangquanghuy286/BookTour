import React from "react";
import { Link } from "react-router-dom";
import Img from "../../assets/Img/dauphay.webp";

const TourPolicy = () => {
  return (
    <div className="pt-6  bg-white dark:bg-slate-900 ">
      <div className="container  ">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold text-[#00c0d1] mb-4">
            Điều Khoản Dịch Vụ
          </h1>
          <img
            src={Img}
            alt="Tour Policy"
            className="w-full max-w-[100px] h-auto rounded-lg  mb-6 object-contain"
          />
        </div>
        <div className="flex items-center gap-2 text-lg ">
          <p className="text-base text-gray-700 dark:text-gray-300">
            Bạn có thể xem Quy định chung và lưu ý
          </p>
          <Link
            to="/termsofservice"
            className="text-[#00c0d1] font-medium hover:underline hover:text-[#009fb0] transition-colors duration-200"
          >
            tại đây
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourPolicy;

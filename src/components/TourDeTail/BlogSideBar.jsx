import React from "react";

import { useNavigate } from "react-router-dom";
import { company } from "../../contexts/TourContext";
import icons from "../../utils/icons";

const { MdEmail, FiPhoneCall } = icons;
const BlogSidebar = ({ tour }) => {
  console.log(tour);

  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate("/payment", {
      state: {
        item: tour,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Phần Tour Booking */}
      <div
        data-aos="fade-up"
        className="bg-white dark:bg-slate-900 dark:text-white border border-gray-300 rounded-xl shadow-lg w-full p-5"
      >
        <h1 className="text-xl font-semibold">Tour Booking</h1>
        <hr className="mt-5 border-gray-300 dark:border-gray-600" />
        <div className="flex flex-col pt-5 space-y-10">
          <div className="flex gap-3">
            <label className="text-base font-semibold text-[#00c0d1]">
              Điểm xuất phát
            </label>
            <p>{tour.departurePoint}</p>
          </div>
          <div className="flex gap-3">
            <label className="text-base font-semibold text-[#00c0d1]">
              Điểm đến
            </label>
            <p>{tour.destination}</p>
          </div>
          <div className="flex gap-3">
            <label className="text-base font-semibold text-[#00c0d1]">
              Ngày bắt đầu
            </label>
            <p>{tour.startDate}</p>
          </div>
          <div className="flex gap-3">
            <label className="text-base font-semibold text-[#00c0d1]">
              Ngày kết thúc
            </label>
            <p>{tour.endDate}</p>
          </div>
        </div>
        <hr className="mt-5 border-gray-300 dark:border-gray-600" />
        <div className="flex items-center justify-between mt-5">
          <p className="font-semibold text-[#00c0d1]">Thời gian:</p>
          <p className="text-gray-500 dark:text-gray-300">{tour.duration}</p>
        </div>
        <hr className="mt-5 border-gray-300 dark:border-gray-600" />
        <div className="mt-5 space-y-4">
          <h1 className="font-semibold text-[#00c0d1]">Vé</h1>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#00c0d1]">Người lớn</p>
              <p className="text-gray-500 dark:text-gray-300">
                {tour.price_adult.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#00c0d1] ">
                Trẻ em (3 đến 11 tuổi)
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                {tour.price_child.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#00c0d1] ">
                Trẻ em (3 tuổi trở xuống)
              </p>
              <p className="text-gray-500 dark:text-gray-300">Free</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="w-full py-2 mt-5 font-semibold text-white rounded-lg bg-[#00c0d1]"
        >
          Đặt ngay
        </button>
        <p className="mt-2 text-center cursor-pointer hover:underline">
          Bạn cần trợ giúp không?
        </p>
      </div>

      {/* Phần Bạn cần trợ giúp */}
      <div className="bg-white dark:bg-slate-900 dark:text-white border border-gray-300 shadow-lg rounded-xl w-full p-5">
        <p className="text-xl font-semibold">Bạn cần trợ giúp</p>
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-2">
            <MdEmail className="w-6 h-6 text-orange-500" />
            <p className="text-base text-gray-500 dark:text-gray-300">
              {company.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FiPhoneCall className="w-6 h-6 text-orange-500" />
            <p className="text-base text-gray-500 dark:text-gray-300">
              {company.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;

import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { company } from "../../contexts/TourContext";
import icons from "../../utils/icons";

const { MdEmail, FiPhoneCall } = icons;
const TourSidebar = ({ tour }) => {
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
        className="bg-white dark:bg-slate-900 dark:text-white border border-gray-300 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.16)] w-full p-5"
      >
        <h1 className="text-xl font-semibold">Tour Booking</h1>
        <hr className="mt-5 border-gray-300 dark:border-gray-600" />
        <div className="flex flex-col pt-5 space-y-10">
          <div className="flex gap-3">
            <label className="text-base font-semibold text-[#00c0d1]">
              Điểm xuất phát:
            </label>
            <p>{tour.departurePoint}</p>
          </div>
          <div className="flex gap-3">
            <label className="text-base font-semibold text-[#00c0d1]">
              Điểm đến:
            </label>
            <p>{tour.destination}</p>
          </div>
          <div className="flex gap-3">
            <label className="text-base font-semibold text-[#00c0d1]">
              Ngày bắt đầu:
            </label>
            <p>{tour.startDate}</p>
          </div>
          <div className="flex gap-3">
            <label className="text-base font-semibold text-[#00c0d1]">
              Ngày kết thúc:
            </label>
            <p>{tour.endDate}</p>
          </div>
        </div>
        <hr className="mt-5 border-gray-300 dark:border-gray-600" />
        <div className="flex items-center justify-between mt-5">
          <p className="font-semibold text-[#00c0d1]">Thời gian:</p>
          <p className="text-base">{tour.duration}</p>
        </div>
        <hr className="mt-5 border-gray-300 dark:border-gray-600" />
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-[#00c0d1]">Hạng Vé</h1>
            <span className="font-medium text-base">
              {tour.tag === "Economy"
                ? "Tiết kiệm"
                : tour.tag === "Standard"
                ? "Tiêu chuẩn"
                : tour.tag === "Premium"
                ? "Cao cấp"
                : tour.tag || "Không xác định"}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#00c0d1]">Người lớn:</p>
              <p className="text-base">{tour.price_adult.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#00c0d1] ">
                Trẻ em (3 đến 11 tuổi):
              </p>
              <p className="text-base">{tour.price_child.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#00c0d1] ">
                Trẻ em (3 tuổi trở xuống):
              </p>
              <p className="text-base">Free</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="w-full py-2 mt-5 font-semibold text-white rounded-lg bg-[#00c0d1]"
        >
          Đặt ngay
        </button>
        <Link to="/contact">
          <p className="mt-2 text-center cursor-pointer hover:underline">
            Bạn cần trợ giúp không?
          </p>
        </Link>
      </div>

      {/* Phần Bạn cần trợ giúp */}
      <div className="bg-white dark:bg-slate-900 dark:text-white border border-gray-300 shadow-[0_1px_4px_rgba(0,0,0,0.16)] rounded-xl w-full p-5">
        <p className="text-xl font-semibold">Bạn cần trợ giúp</p>
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-2">
            <MdEmail className="w-6 h-6 text-[#00c0d1]" />
            <p className="text-base ">{company.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <FiPhoneCall className="w-6 h-6 text-[#00c0d1]" />
            <p className="text-base ">{company.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourSidebar;

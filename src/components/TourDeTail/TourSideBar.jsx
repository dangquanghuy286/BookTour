import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { company } from "../../contexts/TourContext";
import icons from "../../utils/icons";

const { MdEmail, FiPhoneCall } = icons;

const TAG_LABELS = {
  Economy: "Tiết kiệm",
  Standard: "Tiêu chuẩn",
  Premium: "Cao cấp",
};

const formatPrice = (value) =>
  value != null ? `${value.toLocaleString()}đ` : "N/A";

const labelClass = "font-semibold text-[#00c0d1]";

const TourSidebar = ({ tour }) => {
  const navigate = useNavigate();

  if (!tour) return null;

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate("/payment", { state: { tour } });
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
            <label className={labelClass}>Điểm xuất phát:</label>
            <p>{tour.departurePoint}</p>
          </div>

          <div className="flex gap-3">
            <label className={labelClass}>Điểm đến:</label>
            <p>{tour.destination}</p>
          </div>

          <div className="flex gap-3">
            <label className={labelClass}>Ngày bắt đầu:</label>
            <p>{tour.startDate}</p>
          </div>

          <div className="flex gap-3">
            <label className={labelClass}>Ngày kết thúc:</label>
            <p>{tour.endDate}</p>
          </div>
        </div>

        <hr className="mt-5 border-gray-300 dark:border-gray-600" />

        <div className="flex items-center justify-between mt-5">
          <p className={labelClass}>Thời gian:</p>
          <p className="text-base">{tour.duration}</p>
        </div>

        <hr className="mt-5 border-gray-300 dark:border-gray-600" />

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className={labelClass}>Hạng Vé</h1>

            <span className="font-medium text-base">
              {TAG_LABELS[tour.tag] || tour.tag || "Không xác định"}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className={labelClass}>Người lớn:</p>
              <p className="text-base">{formatPrice(tour.price_adult)}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className={labelClass}>Trẻ em (3 đến 11 tuổi):</p>

              <p className="text-base">
                {formatPrice(tour.price_child ?? tour.price_children)}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className={labelClass}>Trẻ em (3 tuổi trở xuống):</p>

              <p className="text-base">Free</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleClick}
          className="w-full py-2 mt-5 font-semibold text-white rounded-lg bg-[#00c0d1] hover:bg-[#0090a0] transition-colors duration-200"
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
          {/* Email */}
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-2 hover:underline"
          >
            <MdEmail className="w-6 h-6 text-[#00c0d1]" />

            <p className="text-base">{company.email}</p>
          </a>

          {/* Phone */}
          <a
            href={`tel:${company.phone}`}
            className="flex items-center gap-2 hover:underline"
          >
            <FiPhoneCall className="w-6 h-6 text-[#00c0d1]" />

            <p className="text-base">{company.phone}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TourSidebar;

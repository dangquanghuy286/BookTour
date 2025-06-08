import React, { useState } from "react";
import icons from "../../utils/icons";
import { cancelBooking } from "../../services/BookingService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { FaSyncAlt } = icons;

const CancelBooked = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(data);

  const handleCancel = async () => {
    const confirm = await Swal.fire({
      title: "Xác nhận hủy?",
      text: "Bạn có chắc chắn muốn hủy tour này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hủy tour",
      cancelButtonText: "Không",
    });

    if (!confirm.isConfirmed) return;

    try {
      setIsLoading(true);
      const response = await cancelBooking(data.booking_id);
      if (response.status === 200) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Hủy tour thành công!",
            confirmButtonColor: "#00c0d1",
          });
          navigate("/tourBooked");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1200);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.response?.data || "Không thể hủy tour!",
        confirmButtonColor: "#00c0d1",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    data?.booking_status === "COMPLETED" || data?.booking_status === "CANCELED";

  return (
    <div className="w-full">
      <button
        disabled={isDisabled}
        onClick={handleCancel}
        className={`flex items-center justify-center gap-2 w-full px-4 py-2 text-base font-semibold rounded-full transition-all duration-300 
          ${
            isDisabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
          }`}
      >
        {isLoading ? (
          <>
            <FaSyncAlt className="animate-spin text-white" />
            <span>Đang hủy...</span>
          </>
        ) : (
          <>
            <FaSyncAlt />
            <span>Hủy đặt tour</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CancelBooked;

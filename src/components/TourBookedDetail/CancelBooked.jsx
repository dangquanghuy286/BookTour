import React, { useState } from "react";
import icons from "../../utils/icons";
import { cancelBooking } from "../../services/BookingService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { FaSyncAlt } = icons;

const CancelBooked = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

    setIsLoading(true);
    try {
      const response = await cancelBooking(data?.booking_id);

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Hủy tour thành công!",
          confirmButtonColor: "#00c0d1",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/tourBooked");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Không thành công",
          text: "Không thể hủy tour, vui lòng thử lại!",
          confirmButtonColor: "#00c0d1",
        });
      }
    } catch (error) {
      const message =
        typeof error?.response?.data === "string"
          ? error.response.data
          : error?.response?.data?.message || "Không thể hủy tour!";

      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: message,
        confirmButtonColor: "#00c0d1",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    isLoading ||
    data?.booking_status === "COMPLETED" ||
    data?.booking_status === "CANCELED";

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

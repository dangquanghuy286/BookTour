import React, { useState } from "react";
import icons from "../../utils/icons";
import { cancelBooking } from "../../services/BookingService";
const { FaSyncAlt } = icons;
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CancelBooked = (props) => {
  const { data } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleCancel = async () => {
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
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 1200);
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.response?.data || "Không thể hủy tour!",
        confirmButtonColor: "#00c0d1",
      });
    }
    setIsLoading(false);
  };
  return (
    <div>
      <button
        disabled={
          data?.booking_status === "COMPLETED" ||
          data?.booking_status === "CANCELED"
        }
        className={`w-full p-2 text-lg font-semibold text-white rounded-2xl ${
          data.booking_status === "CANCELED" ||
          data.booking_status === "COMPLETED"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        } transition-colors duration-300`}
        onClick={handleCancel}
      >
        {isLoading ? (
          <div>
            <FaSyncAlt className="animate-spin text-white inline-block mr-2" />
            Đang hủy đặt tour
          </div>
        ) : (
          <div>
            <FaSyncAlt className="inline-block mr-2" />
            Hủy đặt tour
          </div>
        )}
      </button>
    </div>
  );
};

export default CancelBooked;

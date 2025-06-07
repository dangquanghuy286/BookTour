/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getBookingById } from "../services/BookingService";

const statusMap = {
  "Tất cả": "",
  "Chưa xác nhận": "PENDING",
  "Đã xác nhận": "CONFIRMED",
  "Hoàn thành": "COMPLETED",
  "Đã hủy": "CANCELLED",
};

const useFilterTourBooking = () => {
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      setError(null);
      try {
        // Gọi API với userId và status (nếu có)
        const response = await getBookingById(
          userId,
          statusMap[selectedStatus]
        );

        if (response.status === 200) {
          setBookings(response.data);
        } else {
          setError(response.data || "Không thể tải danh sách tour.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data || "Đã xảy ra lỗi khi tải danh sách tour.";
        setError(errorMessage);
        console.error("Error fetching bookings:", error);
        console.error("Error response:", error.response);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchApi();
    } else {
      setError("Không tìm thấy thông tin người dùng.");
      setLoading(false);
    }
  }, [selectedStatus, userId]);

  return {
    selectedStatus,
    setSelectedStatus,
    bookings,
    loading,
    error,
  };
};

export default useFilterTourBooking;

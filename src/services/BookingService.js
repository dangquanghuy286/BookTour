import { get, post } from "../utils/requestserver";

export const postBooking = async (bookingData) => {
  try {
    const response = await post("bookings", bookingData);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || "Something went wrong",
    };
  }
};

export const getPromotion = async (code) => {
  try {
    const response = await get(`promotions/validate/${code}`);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || "Không thể xác thực mã giảm giá",
    };
  }
};
export const getBookingById = async (userId, status = "") => {
  try {
    // Thêm tham số status vào query string nếu có
    const url = status
      ? `bookings/user/${userId}?status=${status}`
      : `bookings/user/${userId}`;
    const response = await get(url);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || "Không thể lấy thông tin đặt chỗ",
    };
  }
};

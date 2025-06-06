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

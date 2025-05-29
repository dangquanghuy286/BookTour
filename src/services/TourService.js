import { get } from "../utils/requestserver";

// Lấy tất cả tour
export const getDataTour = async (page, limit = 8) => {
  try {
    const res = await get("tours", {
      params: { page, limit },
    });

    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error("Error fetching tours:", error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || "Lỗi khi lấy danh sách tour",
    };
  }
};

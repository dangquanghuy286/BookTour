import { get } from "../utils/requestserver";

// Lấy tất cả tour với các tham số lọc và phân trang
export const getDataTour = async (page = 0, limit = 8, filters = {}) => {
  try {
    // Tạo object params cơ bản
    const params = {
      page,
      limit,
      ...filters,
    };

    // Xử lý đặc biệt cho region (chuyển thành UPPER_CASE nếu có)
    if (params.region) {
      params.region = params.region.toUpperCase();
    }

    // Xử lý đặc biệt cho duration (thêm hậu tố nếu cần)
    if (params.duration && typeof params.duration === "number") {
      params.duration = `${params.duration}_days`;
    }

    const res = await get("tours", { params });

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

export const getDataTourPopular = async () => {
  try {
    const res = await get("tours/top-booked");
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu!", error);
    return {
      status: error.res?.status || 500,
      data: error.res?.data || "Lỗi khi lấy danh sách tour !",
    };
  }
};

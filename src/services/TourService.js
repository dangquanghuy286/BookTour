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
// Lấy thông tin chi tiết của một tour theo id
export const getTourById = async (id) => {
  try {
    // Gọi API với endpoint /tours/:id
    const res = await get(`tours/${id}`);

    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error(`Error fetching tour with id ${id}:`, error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || `Lỗi khi lấy thông tin tour với id ${id}`,
    };
  }
};
// Lấy danh sách hình ảnh của tour theo id
export const getTourImages = async (id) => {
  try {
    // Gọi API với endpoint /tours/:id/images
    const res = await get(`/tours/${id}/images`);

    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error(`Error fetching images for tour with id ${id}:`, error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || `Lỗi khi lấy hình ảnh tour với id ${id}`,
    };
  }
};
// Lấy danh sách điểm đi và điểm đến
export const getLocations = async () => {
  try {
    const res = await get("tours/locations");
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error("Error fetching locations:", error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || "Lỗi khi lấy danh sách điểm đi và điểm đến",
    };
  }
};

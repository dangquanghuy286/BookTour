import { get } from "../utils/requestserver";

export const getBlog = async (page = 0, limit = 8) => {
  try {
    const res = await get("blogs", {
      params: { page, limit },
    });

    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { error: "Lỗi khi lấy danh sách blog" },
    };
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await get(`blogs/${id}`);
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { error: "Lỗi khi lấy bài viết" },
    };
  }
};

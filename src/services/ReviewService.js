import { del, edit, get, post } from "../utils/requestserver";

export const getDataReview = async () => {
  try {
    const res = await get("reviews");
    return {
      status: res.status,
      data: res.data,
    };
  } catch (er) {
    return {
      status: er.res?.status || "500",
      data: er.res?.data || "Lỗi khi lấy dữ liệu!",
    };
  }
};
export const postReview = async (data) => {
  try {
    const res = await post("reviews", data);
    return {
      status: res.status,
      data: res.data,
    };
  } catch (er) {
    return {
      status: er.res?.status || "500",
      data: er.res?.data || "Lỗi khi lấy dữ liệu!",
    };
  }
};
export const deleteReview = async (id) => {
  try {
    const res = await del(`reviews/${id}`);
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || "Lỗi khi xóa dữ liệu!",
    };
  }
};

export const putDataReview = async (id, data) => {
  try {
    const res = await edit(`reviews/${id}`, data);
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || "Lỗi khi cập nhật dữ liệu!",
    };
  }
};

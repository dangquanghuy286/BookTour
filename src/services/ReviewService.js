import { get, post } from "../utils/requestserver";

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

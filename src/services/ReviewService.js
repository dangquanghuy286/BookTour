import { get } from "../utils/requestserver";

export const getDataReview = async () => {
  try {
    const res = await get("reviews");
    return {
      status: res.status,
      data: res.data,
    };
  } catch (er) {
    console.error("Lỗi", er);
    return {
      status: er.res?.status || "500",
      data: er.res?.data || "Lỗi khi lấy dữ liệu!",
    };
  }
};

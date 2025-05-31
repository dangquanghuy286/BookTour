import { get } from "../utils/requestserver";

export const getDataGuide = async () => {
  try {
    const res = await get("guides");
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      status: error.res?.status || "500",
      data: error.res?.data || "Lỗi khi lấy dữ liệu!",
    };
  }
};

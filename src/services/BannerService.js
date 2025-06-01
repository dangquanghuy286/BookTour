import { get } from "../utils/requestserver";

export const getDataBanner = async () => {
  try {
    const res = await get("banners");
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    console.error("Erro", error);
    return {
      status: error.res?.status || 500,
      data: error.res?.data || { error: "Loi khi tai du lieu" },
    };
  }
};

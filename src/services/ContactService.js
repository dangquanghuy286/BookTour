import { post } from "../utils/requestserver";

export const postContact = async (data) => {
  try {
    const result = await post("contact", data); // Gửi dữ liệu trong body
    return result.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error("Lỗi khi gửi liên hệ:", error);
    throw error; // Ném lỗi để xử lý ở frontend
  }
};

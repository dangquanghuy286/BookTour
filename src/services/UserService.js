import { post } from "../utils/requestserver";

export const login = async (user_name, password) => {
  try {
    if (!user_name || !password) {
      throw new Error("Username and password are required");
    }

    const response = await post("users/login", { user_name, password });

    if (!response?.data) {
      throw new Error("Invalid response from server");
    }

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error.response?.data) {
      throw {
        status: error.response.status,
        data: error.response.data,
      };
    }

    // Còn lại thì ném lỗi mặc định
    throw {
      status: 500,
      data: {
        errorCode: "UNKNOWN_ERROR",
        message: error.message || "Login failed",
      },
    };
  }
};

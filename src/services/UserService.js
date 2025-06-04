import { post } from "../utils/requestserver";

export const login = async (user_name, password) => {
  try {
    const res = await post("users/login", { user_name, password });
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    if (error.res?.data) {
      throw {
        status: error.res.status,
        data: error.res.data,
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

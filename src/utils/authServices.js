// Xác thực người dùng
export const isAuthenticated = () => !!localStorage.getItem("token");

// Lưu token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

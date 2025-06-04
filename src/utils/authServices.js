// Xác thực người dùng
export const isAuthenticated = () => !!localStorage.getItem("token");

// Kiểm tra role
export const hasRole = (role) => {
  const userRole = localStorage.getItem("role");
  return parseInt(userRole) === role;
};

// Lưu role
export const setRole = (role) => {
  localStorage.setItem("role", role);
};

// Lưu token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

function PrivateRoutes() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Outlet />;
  }

  // Hiển thị cảnh báo nếu chưa đăng nhập
  Swal.fire({
    icon: "warning",
    title: "Bạn cần đăng nhập trước",
    showConfirmButton: false,
    timer: 1500,
    position: "top-end",
  });

  return <Navigate to="/login" replace />;
}

export default PrivateRoutes;

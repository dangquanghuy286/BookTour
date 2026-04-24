import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

function PrivateRoutes() {
  const token = localStorage.getItem("token");

  // Hiển thị alert một lần khi component mount và không có token
  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Bạn cần đăng nhập trước",
        showConfirmButton: false,
        timer: 1500,
        position: "top-end",
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoutes;

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../utils/authServices";
import { checkLogin } from "../../actions/loginReducers";
import Swal from "sweetalert2";

const RedirectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const user_name = query.get("user_name");
    const email = query.get("email");
    const userId = query.get("userId");

    if (token && user_name) {
      setToken(token);
      localStorage.setItem("user_name", user_name);
      if (email) localStorage.setItem("email", email);
      if (userId && userId !== "null" && !isNaN(userId)) {
        localStorage.setItem("user_id", userId);
      }

      dispatch(checkLogin(true));

      // Thông báo thành công
      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        text: "Chào mừng bạn quay trở lại!",
        showConfirmButton: false,
        timer: 1500,
        position: "top-end",
      });

      // Redirect về trang chủ và reload
      setTimeout(() => {
        navigate("/");
        // Reload trang để đảm bảo tất cả component được cập nhật
        window.location.reload();
      }, 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi xác thực",
        text: "Không nhận được thông tin đăng nhập. Vui lòng thử lại.",
        timer: 3000,
        showConfirmButton: false,
        position: "top-end",
      });
      navigate("/login");
    }
  }, [location, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00c0d1] mx-auto mb-4"></div>
        <p className="text-[#00c0d1] text-lg">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
};

export default RedirectPage;

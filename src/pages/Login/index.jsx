import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import InputPassword from "../../components/Pass/PassInput";
import { Swal } from "sweetalert2/dist/sweetalert2";
import { login } from "../../services/UserService";
const { FaUserAlt, FcGoogle } = icons;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validate = (user_name, password) => {
    const newErrors = {};
    if (!user_name) newErrors.user_name = "Vui lòng nhập tên đăng nhập!";
    else if (!/^[a-zA-Z0-9_]+$/.test(user_name)) {
      newErrors.user_name = "Tên đăng nhập chỉ chứa chữ, số hoặc dấu _";
    }
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(user_name, password);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: Object.values(newErrors)[0],
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top-end",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await login(user_name, password);
      if (res.data?.token) {
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
          showConfirmButton: false,
          timer: 1500,
          position: "top-end",
        });
        setTimeout(() => navigate("/"), 1600);
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      setLoading(false);
      let errorMessage = "Đã xảy ra lỗi không xác định";
      let errorTitle = "Đăng nhập thất bại";

      if (error.response?.data?.errorCode) {
        const { errorCode, message } = error.response.data;
        switch (errorCode) {
          case "DATA_NOT_FOUND":
            setErrors({ user_name: "Tên đăng nhập không tồn tại" });
            errorMessage = "Tên đăng nhập không tồn tại";
            break;
          case "INVALID_PASSWORD":
            setErrors({ password: "Mật khẩu không đúng" });
            errorMessage = "Mật khẩu không đúng";
            break;
          case "ACCOUNT_BLOCKED":
            errorMessage =
              "Tài khoản đã bị chặn. Vui lòng liên hệ quản trị viên.";
            break;
          case "ACCOUNT_NOT_ACTIVATED":
            errorMessage =
              "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt.";
            break;
          case "INVALID_PARAM":
            errorMessage = message || "Thông tin đăng nhập không hợp lệ";
            break;
          case "UNKNOWN_ERROR":
          default:
            errorMessage = message || "Đã xảy ra lỗi không xác định";
            break;
        }
      }
      Swal.fire({
        icon: "error",
        title: errorTitle,
        text: errorMessage,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top-end",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
    const query = new URLSearchParams(location.search);
    if (query.get("error")) {
      console.log("error");
    }
  }, [navigate]);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-white dark:bg-slate-950 max-w-md rounded-2xl border border-gray-300 p-8 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <h2 className="text-3xl font-bold text-[#00c0d1] text-center m-4">
          Đăng Nhập
        </h2>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          {/* Tên đăng nhập */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00c0d1]" />
            <input
              type="text"
              placeholder="Tên Đăng Nhập"
              value={user_name}
              onChange={(e) => {
                setUserName(e.target.value);
                setErrors({ ...errors, user_name: "" }); // Xóa lỗi khi người dùng nhập lại
              }}
              className={`h-12 w-full rounded-2xl border-2 bg-transparent px-12 text-lg dark:text-white text-black border-[#00c0d1] placeholder-[#00c0d1] focus:outline-none ${
                errors.user_name ? "border-red-500" : ""
              }`}
            />
            {errors.user_name && (
              <p className="text-red-500 text-sm mt-1">{errors.user_name}</p>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="relative">
            <InputPassword
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" }); // Xóa lỗi khi người dùng nhập lại
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Ghi nhớ và Quên mật khẩu */}
          <div className="flex items-center justify-between text-sm text-[#00c0d1]">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-cyan-300 rounded" />
              <span>Ghi nhớ tôi</span>
            </label>
            <Link>
              <span className="text-[#00c0d1] transition-colors hover:underline">
                Quên mật khẩu
              </span>
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold text-white ${
              loading
                ? "bg-[#79f1fc] cursor-not-allowed "
                : "bg-[#00c0d1] hover:bg-cyan-700"
            }transition-colors duration-300`}
          >
            {loading ? "Đang đăng nhập ..." : "Đăng nhập"}
          </button>
        </form>
        <div className="flex items-center justify-center text-[#00c0d1] my-6">
          <span>— hoặc —</span>
        </div>
        <a
          href="http://localhost:8088/oauth2/authorization/google"
          className="flex items-center justify-center gap-3 p-3 border rounded-xl bg-white dark:text-[#101828] font-medium hover:scale-[1.01] transition-transform"
        >
          <FcGoogle className="w-6 h-6" />
          Đăng nhập với Google
        </a>

        <p className="text-center text-[#00c0d1] mt-6">
          Chưa có tài khoản?{" "}
          <Link to="/register">
            <span className="font-black text-[#01e5fa] hover:underline">
              Đăng ký
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputPassword from "./PassInput";
import GoBack from "../GoBack/Goback";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { changePassword } from "../../services/UserService";

const ChangePassWithCode = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Added errors state
  const navigate = useNavigate();

  // Kiểm tra độ mạnh của mật khẩu mới
  //   const isStrongPassword = (password) => {
  //     const minLength = 8;
  //     const hasUpperCase = /[A-Z]/.test(password);
  //     const hasLowerCase = /[a-z]/.test(password);
  //     const hasNumbers = /\d/.test(password);
  //     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  //     return (
  //       password.length >= minLength &&
  //       hasUpperCase &&
  //       hasLowerCase &&
  //       hasNumbers &&
  //       hasSpecialChar
  //     );
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem("code");

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Mật khẩu ít nhất 6 ký tự",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Mật khẩu xác nhận không khớp",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await changePassword(token, newPassword);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thay đổi mật khẩu thành công",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          localStorage.removeItem("code");
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Thay đổi mật khẩu thất bại",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Có lỗi xảy ra khi thay đổi mật khẩu",
      });
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-white dark:bg-slate-950 max-w-md rounded-2xl border border-gray-300 p-8 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <h2 className="text-3xl font-bold text-[#00c0d1] text-center m-4">
          Đặt Lại Mật Khẩu Mới
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <InputPassword
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mật khẩu mới"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="relative">
            <InputPassword
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu mới"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <GoBack
                className="w-full rounded-md bg-gray-300 px-6 py-2 text-center text-white shadow-md transition duration-300 hover:scale-105"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="flex-1 rounded-md bg-gradient-to-r from-[#019fb5] to-[#00c0d1] px-6 py-2 text-white shadow-md transition duration-300 hover:scale-105"
              disabled={loading}
            >
              {loading ? "Đang Xử Lý..." : "Đổi Mật Khẩu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassWithCode;

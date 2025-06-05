/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputPassword from "../Pass/PassInput";
import GoBack from "../GoBack/Goback";
import Swal from "sweetalert2";
import { putChangeInfo } from "../../services/UserService";

const ChangePass = () => {
  // Quản lý trạng thái lỗi, trạng thái loading, và ID người dùng
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Dữ liệu form gồm mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Lấy user_id từ localStorage khi component được mount
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) setUserId(id);
  }, []);

  // Cập nhật dữ liệu form khi người dùng nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Kiểm tra độ mạnh của mật khẩu mới
  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  // Hàm kiểm tra hợp lệ dữ liệu form
  const validateForm = ({ currentPassword, newPassword, confirmPassword }) => {
    const newErrors = {};
    if (!currentPassword) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập mật khẩu hiện tại",
        "warning"
      );
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }
    if (!newPassword) {
      Swal.fire("Thiếu thông tin", "Vui lòng nhập mật khẩu mới", "warning");
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (!isStrongPassword(newPassword)) {
      Swal.fire(
        "Mật khẩu yếu",
        "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
        "warning"
      );
      newErrors.newPassword = "Mật khẩu không đủ mạnh";
    }
    if (!confirmPassword) {
      Swal.fire("Thiếu thông tin", "Vui lòng xác nhận mật khẩu mới", "warning");
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (newPassword !== confirmPassword) {
      Swal.fire("Không khớp", "Mật khẩu mới và xác nhận không khớp", "warning");
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    return newErrors;
  };

  // Xử lý sự kiện submit form để đổi mật khẩu
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = {
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      };
      try {
        setLoading(true);
        // Gửi request đổi mật khẩu đến server
        const res = await putChangeInfo(userId, data);
        if (res.status === 200) {
          Swal.fire("Thành Công", "Đổi Mật Khẩu Thành Công!", "success");
          // Xóa dữ liệu người dùng cũ và chuyển về trang đăng nhập
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_name");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          Swal.fire("Thất bại", "Mật khẩu hiện tại không đúng", "warning");
        }
      } catch (error) {
        Swal.fire("Lỗi", "Không thể kết nối tới máy chủ", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // Nếu không có userId thì hiển thị thông báo lỗi
  if (!userId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
        <p>Không thể tải thông tin người dùng. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  // Giao diện form đổi mật khẩu
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-white dark:bg-slate-950 max-w-md rounded-2xl border border-gray-300 p-8 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <h2 className="text-3xl font-bold text-[#00c0d1] text-center m-4">
          Mật Khẩu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <InputPassword
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Mật khẩu hiện tại"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>
          <div className="relative">
            <InputPassword
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Mật khẩu mới"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="relative">
            <InputPassword
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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

export default ChangePass;

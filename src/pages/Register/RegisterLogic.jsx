import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { register } from "../../services/UserService";
import RegisterForm from "./RegisterForm";

const RegisterLogic = () => {
  const [formData, setFormData] = useState({
    email: "",
    user_name: "",
    full_name: "",
    phoneNumber: "",
    address: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ";
    }
    if (!formData.user_name || formData.user_name.length < 3) {
      newErrors.user_name = "Tên đăng nhập phải có ít nhất 3 ký tự";
    }
    if (!formData.full_name) {
      newErrors.full_name = "Vui lòng nhập họ và tên";
    }
    if (!formData.phoneNumber || !/^\d{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }
    if (!formData.address) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Vui lòng chọn ngày sinh";
    } else {
      const today = new Date();
      const dob = new Date(formData.date_of_birth);
      if (dob >= today) {
        newErrors.date_of_birth = "Ngày sinh không được là tương lai";
      } else {
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 18) {
          newErrors.date_of_birth = "Bạn phải đủ 18 tuổi để đăng ký";
        }
      }
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!formData.confirm_password) {
      newErrors.confirm_password = "Vui lòng nhập lại mật khẩu";
    } else if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = "Mật khẩu không khớp";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng kiểm tra lại các thông tin đã nhập",
      });
    }
    return Object.keys(newErrors).length === 0;
  };

  //Nhan thay doi va ghi de du lieu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    // Tranh load lai trang
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      //   Form gui di
      const dataToSend = {
        user_name: formData.user_name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        confirm_password: formData.confirm_password.trim(),
        full_name: formData.full_name.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        address: formData.address.trim(),
        date_of_birth: formData.date_of_birth,
        roleId: 1,
      };

      const res = await register(dataToSend);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: res.data || "Bạn sẽ được chuyển hướng đến trang đăng nhập.",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Đăng ký thất bại",
          text: res.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text:
          error.response?.data?.message ||
          error.message ||
          "Có lỗi xảy ra, vui lòng thử lại",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleRegister = () => {
    if (!loading) {
      window.location.href =
        "http://localhost:8088/oauth2/authorization/google";
    }
  };

  return (
    <RegisterForm
      formData={formData}
      errors={errors}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleGoogleRegister={handleGoogleRegister}
    />
  );
};

export default RegisterLogic;

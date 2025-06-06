import React from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
const {
  FaUserAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FcGoogle,
} = icons;
import InputPassword from "../../components/Pass/PassInput";

const RegisterForm = ({
  formData,
  errors,
  loading,
  handleChange,
  handleSubmit,
  handleGoogleRegister,
}) => {
  return (
    <>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="relative">
          <div className="absolute left-3 top-0 h-12 flex items-center">
            <FaEnvelope className="text-[#00c0d1]" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`h-12 w-full rounded-2xl border-2 bg-transparent pl-12 pr-2 text-lg dark:text-white text-black border-[#00c0d1] placeholder-[#00c0d1] focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Username */}
        <div className="relative">
          <div className="absolute left-3 top-0 h-12 flex items-center">
            <FaUserAlt className="text-[#00c0d1]" />
          </div>
          <input
            type="text"
            name="user_name"
            placeholder="Tên Đăng Nhập"
            value={formData.user_name}
            onChange={handleChange}
            className={`h-12 w-full rounded-2xl border-2 bg-transparent pl-12 pr-2 text-lg dark:text-white text-black border-[#00c0d1] placeholder-[#00c0d1] focus:outline-none ${
              errors.user_name ? "border-red-500" : ""
            }`}
          />
          {errors.user_name && (
            <p className="text-red-500 text-sm mt-1">{errors.user_name}</p>
          )}
        </div>

        {/* Full Name */}
        <div className="relative">
          <div className="absolute left-3 top-0 h-12 flex items-center">
            <FaUserAlt className="text-[#00c0d1]" />
          </div>
          <input
            type="text"
            name="full_name"
            placeholder="Họ và Tên"
            value={formData.full_name}
            onChange={handleChange}
            className={`h-12 w-full rounded-2xl border-2 bg-transparent pl-12 pr-2 text-lg dark:text-white text-black border-[#00c0d1] placeholder-[#00c0d1] focus:outline-none ${
              errors.full_name ? "border-red-500" : ""
            }`}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="relative">
          <div className="absolute left-3 top-0 h-12 flex items-center">
            <FaPhone className="text-[#00c0d1]" />
          </div>
          <input
            type="tel"
            name="phoneNumber" // Changed from phone_number to phoneNumber
            placeholder="Số Điện Thoại"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`h-12 w-full rounded-2xl border-2 bg-transparent pl-12 pr-2 text-lg dark:text-white text-black border-[#00c0d1] placeholder-[#00c0d1] focus:outline-none ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Address */}
        <div className="relative">
          <div className="absolute left-3 top-0 h-12 flex items-center">
            <FaMapMarkerAlt className="text-[#00c0d1]" />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Địa Chỉ"
            value={formData.address}
            onChange={handleChange}
            className={`h-12 w-full rounded-2xl border-2 bg-transparent pl-12 pr-2 text-lg dark:text-white text-black border-[#00c0d1] placeholder-[#00c0d1] focus:outline-none ${
              errors.address ? "border-red-500" : ""
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <div className="absolute left-3 top-0 h-12 flex items-center">
            <FaCalendarAlt className="text-[#00c0d1]" />
          </div>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className={`h-12 w-full rounded-2xl border-2 bg-transparent pl-12 pr-2 text-lg dark:text-white border-[#00c0d1] placeholder-[#00c0d1] focus:outline-none ${
              errors.date_of_birth ? "border-red-500" : ""
            }`}
          />
          {errors.date_of_birth && (
            <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <InputPassword
            value={formData.password}
            onChange={(e) => {
              handleChange({
                target: { name: "password", value: e.target.value },
              });
            }}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <InputPassword
            value={formData.confirm_password}
            placeholder="Xác nhận mật khẩu"
            onChange={(e) => {
              handleChange({
                target: { name: "confirm_password", value: e.target.value },
              });
            }}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-2xl font-semibold text-white ${
            loading
              ? "bg-[#79f1fc] cursor-not-allowed"
              : "bg-[#00c0d1] hover:bg-cyan-700"
          } transition-colors duration-300`}
        >
          {loading ? "Đang đăng ký ..." : "Đăng ký"}
        </button>
      </form>
      <div className="flex items-center justify-center text-[#00c0d1] my-6">
        <span>— hoặc —</span>
      </div>
      <button
        onClick={handleGoogleRegister}
        disabled={loading}
        className={`w-full py-3 rounded-2xl font-semibold bg-transparent text-[#00c0d1] flex items-center justify-center gap-2 ${
          loading ? "bg-white/10 cursor-not-allowed" : "hover:underline"
        } transition-colors duration-200`}
      >
        <FcGoogle className="text-xl w-6 h-6" />
        Đăng ký bằng Google
      </button>
      <p className="text-center text-[#00c0d1] mt-6">
        Đã có tài khoản?{" "}
        <Link to="/login">
          <span className="font-black text-[#01e5fa] hover:underline">
            Đăng nhập
          </span>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;

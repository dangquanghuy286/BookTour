/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { getCode } from "../../services/UserService";
const { AiOutlineArrowLeft } = icons;
const VerifyCode = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleInputChange = (index, value) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 1) {
      const newCode = [...code];
      newCode[index] = numericValue;
      setCode(newCode);

      if (numericValue && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  // Xóa số
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Chưa nhập đủ mã",
        text: "Vui lòng nhập đủ 6 số",
      });
      return;
    }

    setIsLoading(true);
    try {
      Swal.fire({
        title: "Đang kiểm tra...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await getCode(verificationCode);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Mã xác nhận hợp lệ",
          timer: 1500,
          showConfirmButton: false,
        });
        localStorage.setItem("code", verificationCode);
        navigate("/changePasswordCode");
      } else {
        throw new Error("Invalid code");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Mã xác nhận không hợp lệ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1
          className="mb-8 border-l-8 border-blue-300 pl-3 text-2xl font-bold text-[#00c0d1] sm:text-3xl"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Xác nhận mã
        </h1>

        <div className="mx-auto max-w-md rounded-md border border-gray-300 bg-white p-6 shadow-sm dark:bg-slate-950">
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => navigate("/sendEmail")}
              aria-label="Quay lại trang gửi email"
              className="text-[#00c0d1] hover:opacity-80"
            >
              <AiOutlineArrowLeft className="h-8 w-8" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Nhập mã xác nhận
            </h2>
          </div>

          <p className="mb-6 text-center text-sm text-gray-500">
            Vui lòng kiểm tra tin nhắn trong <br />
            <span className="font-medium text-[#00c0d1]">{email}</span>
          </p>

          <div className="mb-6 flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-12 w-10 rounded border-b-2 border-gray-400 text-center text-xl font-semibold focus:border-orange-500 focus:outline-none dark:bg-white dark:text-black"
                disabled={isLoading}
                aria-label={`Mã xác nhận số ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full rounded-lg bg-[#00c0d1] p-3 text-white transition-opacity disabled:opacity-50"
            aria-label="Gửi mã xác nhận"
          >
            {isLoading ? "Đang xử lý..." : "Tiếp tục"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;

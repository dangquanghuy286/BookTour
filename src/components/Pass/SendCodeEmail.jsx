import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { sendCodeEmail } from "../../services/UserService";
const { AiOutlineArrowLeft } = icons;
const SendCodeEmail = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top-end",
      });
      return;
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      Swal.fire({
        icon: "warning",
        title: "Email không hợp lệ!",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top-end",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await sendCodeEmail(email);
      if (res.status === 200) {
        localStorage.setItem("email", email);
        Swal.fire({
          icon: "success",
          title: "Đã Gửi Code Qua Email Của Bạn!",
          showConfirmButton: false,
          timer: 1500,
          position: "top-end",
        });

        setTimeout(() => nav("/verifyCode"), 1600);
      } else {
        setError("Không có dữ liệu blog.");
      }
    } catch (error) {
      console.error("Lỗi", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-2">
        {/* Tiêu đề */}
        <h1
          className="py-2 pl-3 my-4 sm:my-6 md:my-8 text-xl sm:text-2xl md:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Tìm Email !
        </h1>

        <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-950 border border-gray-300 rounded-md shadow-[0_1px_4px_rgba(0,0,0)]">
          <div className="flex flex-row items-center justify-start gap-4 mt-10">
            <AiOutlineArrowLeft
              onClick={() => nav("/login")}
              className="h-8 w-8 text-[#00c0d1] cursor-pointer"
            />
            <p className="text-3xl  font-bold text-gray-800 dark:text-white">
              Đặt Lại Mật Khẩu
            </p>
          </div>

          {loading ? (
            <LoadingSpinner message="Đang Tải..." />
          ) : (
            <>
              {error && <ErrorMessage isWarning={false} message={error} />}
              <div className="flex flex-col items-center mt-10 space-y-8">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full max-w-[500px] p-3 rounded-md bg-transparent text-[#00c0d1] border"
                  placeholder="Nhập Email Của Bạn ..."
                />

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full p-3 rounded-2xl font-semibold text-white transition-colors duration-300 ${
                    loading
                      ? "bg-[#79f1fc] cursor-not-allowed"
                      : "bg-[#00c0d1] hover:bg-cyan-700"
                  }`}
                >
                  {loading ? "Đang Gửi..." : "Gửi"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendCodeEmail;

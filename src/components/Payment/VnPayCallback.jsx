import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VnPayCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const responseCode = searchParams.get("vnp_ResponseCode");
    const transactionStatus = searchParams.get("vnp_TransactionStatus");

    // Thiếu params bắt buộc -> không phải request hợp lệ từ VNPay
    if (!responseCode || !transactionStatus) {
      Swal.fire({
        icon: "warning",
        title: "Không hợp lệ",
        text: "Không tìm thấy thông tin giao dịch.",
        confirmButtonColor: "#00c0d1",
      }).then(() => {
        navigate("/payment");
      });
      return;
    }

    const params = Object.fromEntries(searchParams.entries());

    const verifyPayment = async () => {
      try {
        // Gửi toàn bộ query params lên backend để verify vnp_SecureHash
        // Backend tự kiểm tra chữ ký, KHÔNG tin responseCode ở client
        const res = await axios.post("/api/payment/vnpay/verify", params);

        const { isValid, status } = res.data;

        if (isValid && status === "success") {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Thanh toán thành công!",
            confirmButtonColor: "#00c0d1",
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/tourBooked");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Thanh toán thất bại hoặc dữ liệu không hợp lệ!",
            confirmButtonColor: "#00c0d1",
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/payment");
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Lỗi hệ thống",
          text: "Không thể xác thực giao dịch. Vui lòng liên hệ hỗ trợ nếu đã bị trừ tiền.",
          confirmButtonColor: "#00c0d1",
        }).then(() => {
          navigate("/payment");
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Đang xác thực giao dịch...</p>
      </div>
    );
  }

  return null;
};

export default VnPayCallback;

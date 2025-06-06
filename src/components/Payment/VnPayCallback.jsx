import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const VnPayCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const responseCode = searchParams.get("vnp_ResponseCode");
    const transactionStatus = searchParams.get("vnp_TransactionStatus");

    if (responseCode === "00" && transactionStatus === "00") {
      setTimeout(() => {
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
      }, 1500);
    } else if (responseCode && transactionStatus) {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Thanh toán thất bại!",
          confirmButtonColor: "#00c0d1",
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/payment");
        });
      }, 1500);
    }
  }, [navigate]);

  return null;
};

export default VnPayCallback;

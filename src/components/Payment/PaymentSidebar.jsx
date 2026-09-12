import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getPromotion, postBooking } from "../../services/BookingService";

const PaymentSidebar = ({
  agreed,
  fullName,
  email,
  phone,
  address,
  specialRequests,
  paymentMethod,
  countAdults,
  countChildren,
  tour,
}) => {
  const [promoInput, setPromoInput] = useState("");
  const [discount, setDiscount] = useState(0); // Phần trăm giảm giá
  const [isSubmitting, setIsSubmitting] = useState(false); // Chặn double-submit
  const navigate = useNavigate();

  // Hàm chuyển chuỗi giá tiền sang số
  const cleanPrice = (priceStr) => {
    if (!priceStr) return 0;
    return Number(priceStr.replace(/[^0-9]/g, "")) || 0;
  };

  // Tính toán tổng tiền
  const priceAdult = cleanPrice(tour?.price_adult);
  const priceChild = cleanPrice(tour?.price_child);
  const subtotal = countAdults * priceAdult + countChildren * priceChild;

  // FIX: discountAmount giờ được TÍNH LẠI mỗi lần subtotal/discount đổi,
  // thay vì lưu cứng trong state (bug cũ: đổi số lượng vé sau khi áp mã
  // sẽ khiến số tiền giảm giá bị "lệch" so với subtotal mới).
  const discountAmount = Math.min((subtotal * discount) / 100, subtotal);

  // FIX: chặn tổng tiền âm nếu discount tính toán vượt subtotal
  const total = Math.max(subtotal - discountAmount, 0);
  const total_quality = countAdults + countChildren;

  // Hàm áp dụng mã giảm giá
  const handleApplyPromotion = async () => {
    if (!promoInput) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Vui lòng nhập mã giảm giá!",
        confirmButtonColor: "#00c0d1",
      });
      return;
    }

    try {
      const response = await getPromotion(promoInput);
      if (response.status === 200) {
        const promotion = response.data;
        // FIX: chặn giá trị discount không hợp lệ (âm, > 100, NaN...)
        const safeDiscount = Number(promotion.discount);
        if (isNaN(safeDiscount) || safeDiscount < 0 || safeDiscount > 100) {
          throw new Error("Mã giảm giá không hợp lệ!");
        }
        setDiscount(safeDiscount);
      } else {
        throw new Error(response.data.message || "Mã giảm giá không hợp lệ!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message || "Mã giảm giá không hợp lệ!",
        confirmButtonColor: "#00c0d1",
      });
      setDiscount(0);
    }
  };

  // FIX: nếu người dùng xoá mã hoặc nhập lại mã khác mà không bấm "Áp dụng"
  // lại, discount cũ vẫn còn hiệu lực trong state -> reset khi input rỗng.
  useEffect(() => {
    if (!promoInput) {
      setDiscount(0);
    }
  }, [promoInput]);

  // Hàm submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FIX: chặn bấm nhiều lần liên tiếp gây tạo nhiều booking trùng
    if (isSubmitting) return;

    if (!agreed) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Vui lòng đồng ý với điều khoản!",
        confirmButtonColor: "#00c0d1",
      });
      return;
    }
    if (!fullName || !email || !phone || !address) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Vui lòng nhập đầy đủ thông tin liên hệ!",
        confirmButtonColor: "#00c0d1",
      });
      return;
    }
    if (!paymentMethod) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn phương thức thanh toán!",
        confirmButtonColor: "#00c0d1",
      });
      return;
    }
    if (total_quality === 0) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn ít nhất một vé người lớn hoặc trẻ em!",
        confirmButtonColor: "#00c0d1",
      });
      return;
    }
    const isValidPhone = /^0\d{9}$/.test(phone) && !/^((\d)\2{9})$/.test(phone);
    if (!isValidPhone) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Số điện thoại không hợp lệ! Phải là 10 chữ số và không trùng lặp.",
        confirmButtonColor: "#00c0d1",
      });
      return;
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Email không hợp lệ!",
        confirmButtonColor: "#00c0d1",
      });
      return;
    }
    if (tour?.available_slots === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Số lượng vượt quá giới hạn!",
        confirmButtonColor: "#00c0d1",
      });
      return;
    }
    // FIX: kiểm tra thêm trường hợp số vé đặt vượt quá số chỗ còn lại
    // (bug cũ chỉ check available_slots === 0, không check tổng vé vs chỗ trống)
    if (
      typeof tour?.available_slots === "number" &&
      total_quality > tour.available_slots
    ) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: `Chỉ còn ${tour.available_slots} chỗ trống, vui lòng giảm số lượng vé!`,
        confirmButtonColor: "#00c0d1",
      });
      return;
    }

    // FIX: user_id phải được kiểm tra và return NGAY nếu chưa đăng nhập.
    // Bug cũ: navigate("/login") không có return, nên code vẫn chạy tiếp
    // xuống bên dưới và gửi booking với user_id = NaN.
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      Swal.fire({
        icon: "warning",
        title: "Cảnh báo",
        text: "Vui lòng đăng nhập để đặt tour!",
        confirmButtonColor: "#00c0d1",
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData = {
        tour_id: tour?.id,
        user_id: parseInt(user_id),
        num_adults: countAdults,
        num_children: countChildren,
        total_price: total,
        booking_status: "PENDING",
        payment_method: paymentMethod,
        full_name: fullName,
        email: email,
        address: address,
        phone_number: phone,
        promotion_code: promoInput || null,
        special_requests: specialRequests,
      };

      const res = await postBooking(bookingData);

      if (res.status === 200) {
        const { paymentUrl, bookingId } = res.data;
        if (bookingId) {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Đặt tour thành công!",
            confirmButtonColor: "#00c0d1",
          });
          if (paymentMethod === "VNPAY" && paymentUrl) {
            window.location.href = paymentUrl;
            return;
          }

          setTimeout(() => {
            navigate("/tourBooked");
            window.scrollTo(0, 0);
          }, 1000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Đặt tour thất bại!",
            confirmButtonColor: "#00c0d1",
          });
        }
      } else {
        throw new Error(res.data.message || "Đặt tour thất bại!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message || "Có lỗi xảy ra khi đặt tour!",
        confirmButtonColor: "#00c0d1",
      });
      console.error("Booking error:", error);
    } finally {
      // FIX: luôn mở khoá nút submit dù thành công hay lỗi
      // (trừ trường hợp redirect VNPAY, khi trang sẽ điều hướng đi luôn)
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" ">
      <h2 className="text-2xl font-bold mb-4 text-[#00c0d1]">
        Thông tin đơn đặt
      </h2>
      <div className="w-full p-6">
        <div className="space-y-4">
          <p className="text-lg font-semibold">
            {tour?.title || "Chưa chọn tour"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[#00c0d1]">Điểm xuất phát:</span>
            <span className="font-medium">{tour?.departurePoint || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00c0d1]">Điểm đến:</span>
            <span className="font-medium">{tour?.destination || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00c0d1]">Ngày bắt đầu:</span>
            <span className="font-medium">{tour?.startDate || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00c0d1]">Ngày kết thúc:</span>
            <span className="font-medium">{tour?.endDate || "N/A"}</span>
          </div>
          <hr className="border-gray-400" />
          <div className="flex items-center gap-2">
            <span className="text-[#00c0d1]">Giá người lớn:</span>
            <span className="font-medium">
              {priceAdult.toLocaleString()} VNĐ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00c0d1]">Giá trẻ em:</span>
            <span className="font-medium">
              {priceChild.toLocaleString()} VNĐ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00c0d1]">Số lượng:</span>
            <span className="font-medium">
              {countAdults} người lớn, {countChildren} trẻ em
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#00c0d1]">Người lớn:</p>
            <p className="font-semibold">
              {countAdults} x {priceAdult.toLocaleString()} VNĐ
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#00c0d1]">Trẻ em:</p>
            <p className="font-semibold">
              {countChildren} x {priceChild.toLocaleString()} VNĐ
            </p>
          </div>
          <hr className="border-gray-400" />
          <div className="flex items-center gap-5">
            <input
              type="text"
              placeholder="Nhập mã giảm giá (tùy chọn)"
              className="p-2 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              value={promoInput}
            />
            <button
              type="button"
              className="p-2 px-4 text-lg font-normal text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
              onClick={handleApplyPromotion}
            >
              Áp dụng
            </button>
          </div>
          <hr className="border-gray-400" />
          <div className="flex items-center gap-2">
            <p className="text-[#00c0d1]">Số lượng giảm giá:</p>
            <p className="font-semibold text-green-600">
              {discount > 0
                ? `${discountAmount.toLocaleString()} VNĐ (${discount}%)`
                : "0 VNĐ"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-[#00c0d1]">Tổng cộng:</p>
            <p className="font-semibold text-red-500">
              {total.toLocaleString()} VNĐ
            </p>
          </div>
          <div className="relative">
            <button
              type="button"
              className={`w-full p-2 text-lg font-semibold text-white rounded-lg ${
                agreed && !isSubmitting
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-400 cursor-not-allowed"
              } transition-colors`}
              disabled={!agreed || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Đang xử lý..." : "Đặt Ngay"}
            </button>
            {!agreed && (
              <div className="absolute inset-0 bg-white rounded-lg opacity-50 cursor-not-allowed"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSidebar;

import React, { useState } from "react";
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
  const [discountAmount, setDiscountAmount] = useState(0); // Số tiền giảm giá
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
  const total = subtotal - discountAmount;
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
        setDiscount(promotion.discount);
        const calculatedDiscountAmount = (subtotal * promotion.discount) / 100;
        setDiscountAmount(calculatedDiscountAmount);
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
      setDiscountAmount(0);
    }
  };

  // Hàm submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    try {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        navigate("/login");
      }

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

          const bookedTours = JSON.parse(
            localStorage.getItem("booked_tours") || "[]"
          );
          if (!bookedTours.includes(tour?.id.toString())) {
            bookedTours.push(tour?.id.toString());
            localStorage.setItem("booked_tours", JSON.stringify(bookedTours));
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
              className={`w-full p-2 text-lg font-semibold text-white rounded-lg ${
                agreed
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-400 cursor-not-allowed"
              } transition-colors`}
              disabled={!agreed}
              onClick={handleSubmit}
            >
              Đặt Ngay
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

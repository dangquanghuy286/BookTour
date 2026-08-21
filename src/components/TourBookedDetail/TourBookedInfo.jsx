import React, { useMemo } from "react";
import { company } from "../../contexts/TourContext";
import CancelBooked from "./CancelBooked";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const d = new Date(dateString);
  return isNaN(d.getTime())
    ? "N/A"
    : d.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

const formatCurrency = (value) =>
  `${(Number(value) || 0).toLocaleString("vi-VN")} VND`;

const parsePrice = (value) => {
  const num = parseInt(String(value ?? "").replace(/[^0-9]/g, ""), 10);
  return Number.isNaN(num) ? 0 : num;
};

const BOOKING_STATUS_MAP = {
  COMPLETED: { label: "Hoàn thành", className: "text-green-600" },
  CONFIRMED: { label: "Đã xác nhận", className: "text-yellow-600" },
  PENDING: { label: "Đang chờ", className: "text-gray-600" },
  CANCELLED: { label: "Đã hủy", className: "text-red-600" },
};

const PAYMENT_STATUS_MAP = {
  COMPLETED: "Đã thanh toán",
  PENDING: "Chưa thanh toán",
};

const PAYMENT_METHOD_MAP = {
  OFFICE: "Thanh toán tại văn phòng",
  VNPAY: "VNPAY",
};

// Component con để tránh lặp lại đoạn <p><strong>...</strong>...</p>
const InfoRow = ({ label, children }) => (
  <p className="text-sm">
    <strong className="text-[#00c0d1]">{label}:</strong> {children}
  </p>
);

const TourBookedInfo = ({ data }) => {
  // Hooks luôn phải được gọi vô điều kiện (rules-of-hooks) -> useMemo đặt
  // TRƯỚC early return bên dưới. Dùng optional chaining/`?? {}` để an toàn
  // khi data chưa có.
  const computed = useMemo(() => {
    if (!data) return null;

    const priceAdult = parsePrice(data.price_adult);
    const priceChild = parsePrice(data.price_child);

    const numAdults = Number(data.num_adults) || 0;
    const numChildren = Number(data.num_children) || 0;

    const totalAdult = numAdults * priceAdult;
    const totalChild = numChildren * priceChild;
    const originalPrice = totalAdult + totalChild;

    const discountPercent = Number(data.promotion_discount) || 0;
    const discountAmount = discountPercent
      ? (originalPrice * discountPercent) / 100
      : 0;

    const finalPrice = Number(data.total_price) || 0;
    const tax = 0;
    // Tránh chia cho 0 khi originalPrice = 0
    const taxPercent =
      tax > 0 && originalPrice > 0
        ? ((tax / originalPrice) * 100).toFixed(2)
        : null;

    const bookingStatus =
      BOOKING_STATUS_MAP[data.booking_status]?.label ??
      data.booking_status ??
      "N/A";
    const bookingStatusClass =
      BOOKING_STATUS_MAP[data.booking_status]?.className ?? "text-gray-600";

    const paymentStatus =
      PAYMENT_STATUS_MAP[data.payment_status] ?? data.payment_status ?? "N/A";

    const paymentMethodName =
      PAYMENT_METHOD_MAP[data.payment_method] ??
      data.payment_method ??
      "Không có";

    return {
      priceAdult,
      priceChild,
      numAdults,
      numChildren,
      totalAdult,
      totalChild,
      originalPrice,
      discountPercent,
      discountAmount,
      finalPrice,
      tax,
      taxPercent,
      bookingStatus,
      bookingStatusClass,
      paymentStatus,
      paymentMethodName,
    };
  }, [data]);

  if (!data || !computed) {
    return (
      <div className="pt-4 text-center text-gray-500 dark:text-gray-400">
        Không có dữ liệu đặt tour.
      </div>
    );
  }

  const bookingDate = formatDate(data.created_at);
  const paymentDate = formatDate(data.payment_date);

  return (
    <div className="pt-4">
      <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
        {/* Invoice Content */}
        <div
          id="invoice-content"
          className="mx-auto mt-5 rounded-2xl bg-gray-50 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.16)] border border-gray-300 dark:bg-slate-950"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={data.img}
                className="h-20 w-20 transform rounded-full bg-gray-50 object-cover dark:bg-slate-950"
                alt={data.title || "Tour"}
              />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {data.title}
              </h2>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-base font-medium text-[#00c0d1]">
                Người đặt:{" "}
                <span className="font-normal text-gray-700 dark:text-gray-300">
                  {data.full_name}
                </span>
              </p>
              <ul className="mt-2 list-none text-sm text-gray-600 dark:text-gray-400">
                <li>Địa chỉ: {data.address || "N/A"}</li>
                <li>SĐT: {data.phone_number || "N/A"}</li>
                <li>Email: {data.email || "N/A"}</li>
              </ul>
            </div>
            <div>
              <p className="text-base font-medium text-[#00c0d1]">
                Đơn vị cung cấp:{" "}
                <span className="font-normal text-gray-700 dark:text-gray-300">
                  {company.companyName}
                </span>
              </p>
              <ul className="mt-2 list-none text-sm text-gray-600 dark:text-gray-400">
                <li>Địa chỉ: {company.address}</li>
                <li>SĐT: {company.phone}</li>
                <li>Email: {company.email}</li>
              </ul>
            </div>
          </div>

          <div className="mb-6 flex justify-between rounded-md bg-blue-50 p-4 dark:bg-slate-700">
            <div>
              <InfoRow label="Mã đơn đặt">{data.booking_id}</InfoRow>
              <InfoRow label="Ngày đặt">{bookingDate}</InfoRow>
              <p className="text-sm">
                <strong className="text-[#00c0d1]">Trạng thái:</strong>
                <span
                  className={`ml-2 font-semibold ${computed.bookingStatusClass}`}
                >
                  {computed.bookingStatus}
                </span>
              </p>
            </div>
            <div>
              <InfoRow label="Mã giao dịch">
                {data.transaction_code || "Không có"}
              </InfoRow>
              <InfoRow label="Ngày thanh toán">{paymentDate}</InfoRow>
              <InfoRow label="Tài khoản thanh toán">N/A</InfoRow>
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div className="mb-6 rounded-md bg-blue-50 p-4 dark:bg-slate-700">
            <InfoRow label="Yêu cầu đặc biệt">
              {data.special_requests || "Không có yêu cầu đặc biệt"}
            </InfoRow>
            <InfoRow label="Mã tour">{data.formatted_tour_id}</InfoRow>
            <InfoRow label="Mã người dùng">{data.user_id}</InfoRow>
            <InfoRow label="Mã khuyến mãi">
              {data.promotion_code || "Không có"}
            </InfoRow>
            <InfoRow label="Mô tả khuyến mãi">
              {data.promotion_description || "Không có"}
            </InfoRow>
          </div>

          <hr className="mb-6 border-gray-300 dark:border-gray-600" />

          <div className="overflow-x-auto">
            <table className="mb-6 w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="bg-[#00c0d1] text-white dark:bg-[#00c0d1]">
                  <th className="rounded-tl-md p-3 text-left text-sm font-semibold whitespace-nowrap">
                    Hạng mục
                  </th>
                  <th className="p-3 text-center text-sm font-semibold whitespace-nowrap">
                    Số lượng
                  </th>
                  <th className="p-3 text-center text-sm font-semibold whitespace-nowrap">
                    Điểm xuất phát
                  </th>
                  <th className="p-3 text-center text-sm font-semibold whitespace-nowrap">
                    Điểm đến
                  </th>
                  <th className="p-3 text-center text-sm font-semibold whitespace-nowrap">
                    Đơn giá
                  </th>
                  <th className="rounded-tr-md p-3 text-right text-sm font-semibold whitespace-nowrap">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-blue-50 dark:border-gray-700 dark:bg-slate-900">
                  <td className="p-3 whitespace-nowrap text-gray-700 dark:text-stone-50">
                    Người lớn
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {computed.numAdults}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.departure_point}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.title}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {formatCurrency(computed.priceAdult)}
                  </td>
                  <td className="p-3 text-right text-gray-700 dark:text-stone-50">
                    {formatCurrency(computed.totalAdult)}
                  </td>
                </tr>
                <tr className="border-b border-gray-200 bg-blue-50 dark:border-gray-700 dark:bg-slate-900">
                  <td className="p-3 whitespace-nowrap text-gray-700 dark:text-stone-50">
                    Trẻ em
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {computed.numChildren}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.departure_point}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.title}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {formatCurrency(computed.priceChild)}
                  </td>
                  <td className="p-3 text-right text-gray-700 dark:text-stone-50">
                    {formatCurrency(computed.totalChild)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6 space-y-1 text-right">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Giá gốc:</span>{" "}
              {formatCurrency(computed.originalPrice)}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Thuế:</span>{" "}
              {formatCurrency(computed.tax)}{" "}
              {computed.taxPercent && (
                <span className="text-xs text-gray-500">
                  ({computed.taxPercent}%)
                </span>
              )}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Giảm giá:</span>{" "}
              {formatCurrency(computed.discountAmount)}{" "}
              {computed.discountAmount > 0 && (
                <span className="text-xs text-gray-500">
                  ({computed.discountPercent}%)
                </span>
              )}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              Tổng cộng: {formatCurrency(computed.finalPrice)}
            </p>
          </div>

          <div className="mb-6 rounded-md bg-blue-50 p-4 dark:bg-slate-700">
            <InfoRow label="Phương thức thanh toán">
              {computed.paymentMethodName}
            </InfoRow>
            <p className="text-sm">
              <strong className="text-[#00c0d1]">Trạng thái thanh toán:</strong>
              <span
                className={`ml-2 font-semibold ${
                  computed.paymentStatus === "Đã thanh toán"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {computed.paymentStatus}
              </span>
            </p>
          </div>

          <hr className="mb-6 border-gray-300 dark:border-gray-600" />

          <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-[#00c0d1]">Ghi chú:</strong> Vui lòng kiểm
            tra thông tin kỹ lưỡng. Nếu có sai sót, hãy liên hệ bộ phận hỗ trợ
            qua email{" "}
            <a
              href={`mailto:${company.email}`}
              className="hover:underline text-[#00c0d1]"
            >
              {company.email}
            </a>{" "}
            hoặc số điện thoại{" "}
            <a
              href={`tel:${company.phone}`}
              className="hover:underline text-[#00c0d1]"
            >
              {company.phone}
            </a>
            .
          </p>
          <hr className="mb-6 border-gray-300 dark:border-gray-600" />
          <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <CancelBooked data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourBookedInfo;

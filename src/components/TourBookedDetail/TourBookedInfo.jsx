import React from "react";
import { company } from "../../contexts/TourContext";
import CancelBooked from "./CancelBooked";

const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

const TourBookedInfo = (props) => {
  const { data } = props;
  console.log(data);

  // Định dạng ngày
  const bookingDate = formatDate(data.created_at);
  const paymentDate = formatDate(data.payment_date);

  // Chuyển đổi giá từ chuỗi sang số
  const priceAdult = parseInt(data.price_adult?.replace(/[^0-9]/g, "") || 0);
  const priceChild = parseInt(data.price_child?.replace(/[^0-9]/g, "") || 0);

  // Tính toán
  const totalAdult = data.num_adults * priceAdult;
  const totalChild = data.num_children * priceChild;
  const originalPrice = totalAdult + totalChild;
  const discountAmount = data.promotion_discount
    ? (originalPrice * data.promotion_discount) / 100
    : 0;
  const finalPrice = data.total_price || 0;
  const tax = 0;

  // Định dạng trạng thái
  const bookingStatus =
    data.booking_status === "COMPLETED"
      ? "Hoàn thành"
      : data.booking_status === "CONFIRMED"
      ? "Đã xác nhận"
      : data.booking_status === "PENDING"
      ? "Đang chờ"
      : data.booking_status === "CANCELLED"
      ? "Đã hủy"
      : data.booking_status;

  const paymentStatus =
    data.payment_status === "COMPLETED"
      ? "Đã thanh toán"
      : data.payment_status === "PENDING"
      ? "Chưa thanh toán"
      : data.payment_status;

  const paymentMethodName =
    data.payment_method === "OFFICE"
      ? "Thanh toán tại văn phòng"
      : data.payment_method === "VNPAY"
      ? "VNPAY"
      : data.payment_method || "Không có";

  return (
    <div className="pt-4">
      <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
        {/* Invoice Content */}
        <div
          id="invoice-content"
          className="mx-auto mt-5 rounded-2xl bg-gray-50 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.16)] border  border-gray-300 dark:bg-slate-950"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={data.img}
                className="h-20 w-20 transform rounded-full bg-gray-50 object-cover dark:bg-slate-950"
                alt="Logo"
              />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {data.title}
              </h2>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-base font-medium text-[#00c0d1] ">
                Người đặt:{" "}
                <span className="font-normal text-gray-700 dark:text-gray-300">
                  {data.full_name}
                </span>
              </p>
              <ul className="mt-2 list-none text-sm text-gray-600 dark:text-gray-400">
                <li>Địa chỉ: {data.address}</li>
                <li>SĐT: {data.phone_number}</li>
                <li>Email: {data.email}</li>
              </ul>
            </div>
            <div>
              <p className="text-base font-medium text-[#00c0d1] ">
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
              <p className="text-sm">
                <strong className="text-[#00c0d1] ">Mã đơn đặt:</strong>{" "}
                {data.booking_id}
              </p>
              <p className="text-sm">
                <strong className="text-[#00c0d1] ">Ngày đặt:</strong>{" "}
                {bookingDate}
              </p>
              <p className="text-sm">
                <strong className="text-[#00c0d1] ">Trạng thái:</strong>
                <span
                  className={`ml-2 font-semibold ${
                    data.booking_status === "COMPLETED"
                      ? "text-green-600"
                      : data.booking_status === "CONFIRMED"
                      ? "text-yellow-600"
                      : data.booking_status === "CANCELLED"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {bookingStatus}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm">
                <strong className="text-[#00c0d1] ">Mã giao dịch:</strong>{" "}
                {data.transaction_code || "Không có"}
              </p>
              <p className="text-sm">
                <strong className="text-[#00c0d1] ">Ngày thanh toán:</strong>{" "}
                {paymentDate}
              </p>
              <p className="text-sm">
                <strong className="text-[#00c0d1] ">
                  Tài khoản thanh toán:
                </strong>{" "}
                {"N/A"} {/* Cần xác định trường account nếu có */}
              </p>
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div className="mb-6 rounded-md bg-blue-50 p-4 dark:bg-slate-700">
            <p className="text-sm">
              <strong className="text-[#00c0d1] ">Yêu cầu đặc biệt:</strong>{" "}
              {data.special_requests || "Không có yêu cầu đặc biệt"}
            </p>
            <p className="text-sm">
              <strong className="text-[#00c0d1] ">Mã tour:</strong>{" "}
              {data.formatted_tour_id}
            </p>
            <p className="text-sm">
              <strong className="text-[#00c0d1] ">Mã người dùng:</strong>{" "}
              {data.user_id}
            </p>
            <p className="text-sm">
              <strong className="text-[#00c0d1] ">Mã khuyến mãi:</strong>{" "}
              {data.promotion_code || "Không có"}
            </p>

            <p className="text-sm">
              <strong className="text-[#00c0d1] ">Mô tả khuyến mãi:</strong>{" "}
              {data.promotion_description || "Không có"}
            </p>
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
                    {data.num_adults || 0}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.departure_point}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.title}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {priceAdult.toLocaleString("vi-VN")} VND
                  </td>
                  <td className="p-3 text-right text-gray-700 dark:text-stone-50">
                    {totalAdult.toLocaleString("vi-VN")} VND
                  </td>
                </tr>
                <tr className="border-b border-gray-200 bg-blue-50 dark:border-gray-700 dark:bg-slate-900">
                  <td className="p-3 whitespace-nowrap text-gray-700 dark:text-stone-50">
                    Trẻ em
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.num_children || 0}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.departure_point}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {data.title}
                  </td>
                  <td className="p-3 text-center text-gray-700 dark:text-stone-50">
                    {priceChild.toLocaleString("vi-VN")} VND
                  </td>
                  <td className="p-3 text-right text-gray-700 dark:text-stone-50">
                    {totalChild.toLocaleString("vi-VN")} VND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6 space-y-1 text-right">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Giá gốc:</span>{" "}
              {originalPrice.toLocaleString("vi-VN")} VND
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Thuế:</span>{" "}
              {tax.toLocaleString("vi-VN")} VND{" "}
              {tax > 0 && (
                <span className="text-xs text-gray-500">
                  ({((tax / originalPrice) * 100).toFixed(2)}%)
                </span>
              )}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Giảm giá:</span>{" "}
              {discountAmount.toLocaleString("vi-VN")} VND{" "}
              {discountAmount > 0 && (
                <span className="text-xs text-gray-500">
                  ({data.promotion_discount}%)
                </span>
              )}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              Tổng cộng: {finalPrice.toLocaleString("vi-VN")} VND
            </p>
          </div>

          <div className="mb-6 rounded-md bg-blue-50 p-4 dark:bg-slate-700">
            <p className="text-sm">
              <strong className="text-[#00c0d1] ">
                Phương thức thanh toán:
              </strong>{" "}
              {paymentMethodName}
            </p>
            <p className="text-sm">
              <strong className="text-[#00c0d1] ">
                Trạng thái thanh toán:
              </strong>
              <span
                className={`ml-2 font-semibold ${
                  paymentStatus === "Đã thanh toán"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {paymentStatus}
              </span>
            </p>
          </div>

          <hr className="mb-6 border-gray-300 dark:border-gray-600" />

          <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-[#00c0d1] ">Ghi chú:</strong> Vui lòng kiểm
            tra thông tin kỹ lưỡng. Nếu có sai sót, hãy liên hệ bộ phận hỗ trợ
            qua email{" "}
            <a
              href={`mailto:${company.email}`}
              className=" hover:underline text-[#00c0d1]"
            >
              {company.email}
            </a>{" "}
            hoặc số điện thoại{" "}
            <a
              href={`tel:${company.phone}`}
              className=" hover:underline text-[#00c0d1]"
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

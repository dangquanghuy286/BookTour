import React from "react";
import icons from "../../utils/icons";
const { FaExclamationTriangle } = icons;
const ConfirmPolicy = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center"
        data-aos="fade-up"
        data-aos-delay="1200"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-2xl" />
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
            Xác Nhận Đồng Ý
          </h2>
        </div>
        <p className="text-yellow-700 dark:text-yellow-300 mb-4">
          Bằng việc đặt tour và thanh toán, bạn đã đồng ý với tất cả các điều
          khoản và điều kiện được nêu trên. Vui lòng đọc kỹ trước khi quyết định
          đặt tour.
        </p>
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          Điều khoản này có hiệu lực từ ngày 01/06/2025 và có thể được cập nhật
          mà không cần báo trước.
        </p>
      </section>
    </div>
  );
};

export default ConfirmPolicy;

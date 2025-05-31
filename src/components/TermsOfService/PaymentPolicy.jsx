import React from "react";
import icons from "../../utils/icons";

const { FaCreditCard, FaExclamationTriangle } = icons;
const PaymentPolicy = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <FaCreditCard className="text-blue-500" />
          Chính Sách Thanh Toán
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3">
              Thanh Toán Đầy Đủ
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Thanh toán toàn bộ chi phí tour khi nhận dịch vụ (COD) hoặc trước
              ngày khởi hành
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">
              Phương Thức Thanh Toán
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Chuyển khoản, thẻ tín dụng, tiền mặt, hoặc COD
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">
              Xác Nhận Thanh Toán
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Nhận hóa đơn và xác nhận thanh toán ngay sau khi hoàn tất
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400" />
            <span className="font-semibold text-yellow-800 dark:text-yellow-300">
              Lưu Ý Quan Trọng:
            </span>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            Booking sẽ bị hủy tự động nếu không thanh toán đầy đủ trước ngày
            khởi hành hoặc tại thời điểm nhận dịch vụ (COD). Vui lòng kiểm tra
            thông tin thanh toán để đảm bảo trải nghiệm suôn sẻ.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PaymentPolicy;

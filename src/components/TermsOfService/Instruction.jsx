import React from "react";
import icons from "../../utils/icons";
const { FaRegCheckCircle } = icons;
const Instruction = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <FaRegCheckCircle className="text-green-500" />
          Hướng Dẫn Đặt Tour
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#00c0d1]">
              Các Bước Đặt Tour:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-[#00c0d1] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Chọn tour phù hợp với nhu cầu và ngân sách của bạn
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-[#00c0d1] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Điền đầy đủ thông tin cá nhân và liên hệ
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-[#00c0d1] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Xác nhận thông tin và chọn phương thức thanh toán
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-[#00c0d1] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Nhận xác nhận booking và thông tin chi tiết tour
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-[#00c0d1] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  5
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  Thanh toán đầy đủ khi nhận dịch vụ (COD) hoặc trước khởi hành
                  3 ngày
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#00c0d1]">
              Thông Tin Cần Chuẩn Bị:
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaRegCheckCircle className="text-green-500 w-4 h-4" />
                <span className="text-gray-700 dark:text-gray-300">
                  Họ tên đầy đủ (theo CMND/CCCD)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCheckCircle className="text-green-500 w-4 h-4" />
                <span className="text-gray-700 dark:text-gray-300">
                  Số điện thoại liên hệ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCheckCircle className="text-green-500 w-4 h-4" />
                <span className="text-gray-700 dark:text-gray-300">
                  Email xác nhận
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCheckCircle className="text-green-500 w-4 h-4" />
                <span className="text-gray-700 dark:text-gray-300">
                  Ngày sinh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCheckCircle className="text-green-500 w-4 h-4" />
                <span className="text-gray-700 dark:text-gray-300">
                  Yêu cầu đặc biệt (nếu có)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Instruction;

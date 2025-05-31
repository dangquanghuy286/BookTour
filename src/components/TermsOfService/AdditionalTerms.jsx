import React from "react";
import icons from "../../utils/icons";
const { FaExclamationTriangle } = icons;
const AdditionalTerms = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="900"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <FaExclamationTriangle className="text-orange-500" />
          Điều Khoản Bổ Sung
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-[#00c0d1] mb-3">
              Quy Định Về Thanh Toán COD:
            </h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4 list-disc list-inside">
              <li>
                Thanh toán COD chỉ áp dụng cho một số tour nhất định, vui lòng
                kiểm tra trước khi đặt.
              </li>
              <li>
                Khách hàng cần xác nhận đầy đủ thông tin để đảm bảo giao dịch
                COD diễn ra suôn sẻ.
              </li>
              <li>
                Trong trường hợp từ chối nhận dịch vụ khi thanh toán COD, khách
                hàng có thể chịu phí phạt theo chính sách hủy tour.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#00c0d1] mb-3">
              Quyền Lợi Khách Hàng:
            </h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4 list-disc list-inside">
              <li>
                Nhận thông báo chi tiết về lịch trình và dịch vụ trước khi khởi
                hành.
              </li>
              <li>
                Yêu cầu hỗ trợ đặc biệt (ăn chay, hỗ trợ khuyết tật...) cần
                thông báo trước ít nhất 7 ngày.
              </li>
              <li>Được quyền khiếu nại và nhận phản hồi trong vòng 48 giờ.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdditionalTerms;

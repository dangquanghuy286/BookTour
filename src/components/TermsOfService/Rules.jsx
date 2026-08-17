import React from "react";
import icons from "../../utils/icons";

const { FaUserShield, FaRegCheckCircle } = icons;

const customerResponsibilities = [
  "Cung cấp thông tin chính xác và đầy đủ khi đặt tour",
  "Thanh toán đúng hạn theo phương thức đã chọn",
  "Tuân thủ lịch trình và quy định của tour",
  "Mang theo giấy tờ tùy thân hợp lệ",
  "Chịu trách nhiệm về tài sản cá nhân",
  "Tôn trọng văn hóa và phong tục địa phương",
];

const ourCommitments = [
  "Cung cấp dịch vụ chất lượng cao theo cam kết",
  "Hướng dẫn viên chuyên nghiệp, nhiệt tình",
  "Hỗ trợ khách hàng 24/7 trong suốt hành trình",
  "Đảm bảo an toàn cho du khách",
  "Xử lý khiếu nại một cách nhanh chóng",
  "Bảo mật thông tin cá nhân của khách hàng",
];

const Rules = () => {
  const renderRules = (items, iconColor) =>
    items.map((item, index) => (
      <div key={index} className="flex items-start gap-3">
        <FaRegCheckCircle className={`${iconColor} w-5 h-5 mt-0.5 shrink-0`} />
        <p className="text-gray-700 dark:text-gray-300">{item}</p>
      </div>
    ));

  return (
    <div className="container px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <FaUserShield className="text-purple-500" />
          Quy Tắc & Trách Nhiệm
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Trách nhiệm khách hàng */}
          <div>
            <h3 className="text-lg font-semibold text-[#00c0d1] mb-4">
              Trách Nhiệm Của Khách Hàng:
            </h3>

            <div className="space-y-3">
              {renderRules(customerResponsibilities, "text-green-500")}
            </div>
          </div>

          {/* Cam kết */}
          <div>
            <h3 className="text-lg font-semibold text-[#00c0d1] mb-4">
              Cam Kết Của Chúng Tôi:
            </h3>

            <div className="space-y-3">
              {renderRules(ourCommitments, "text-blue-500")}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rules;

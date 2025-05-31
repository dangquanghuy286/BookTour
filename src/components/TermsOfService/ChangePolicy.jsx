import React from "react";
import icons from "../../utils/icons";
const { FaSyncAlt } = icons;
const ChangePolicy = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="1000"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 gap-3 flex items-center">
          <FaSyncAlt className="text-orange-500" />
          Chính Sách Thay Đổi & Bất Khả Kháng
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-[#00c0d1] mb-3">
              Thay Đổi Lịch Trình:
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Chúng tôi có quyền thay đổi lịch trình tour trong các trường hợp
              sau:
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 ml-4 list-disc list-inside">
              <li>Thời tiết bất lợi, thiên tai</li>
              <li>Vấn đề an ninh, chính trị</li>
              <li>Sự cố kỹ thuật phương tiện</li>
              <li>Yêu cầu của cơ quan chức năng</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#00c0d1] mb-3">
              Bất Khả Kháng:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Trong trường hợp bất khả kháng (thiên tai, dịch bệnh, chiến
              tranh...), cả hai bên không chịu trách nhiệm pháp lý. Chúng tôi sẽ
              cố gắng hỗ trợ khách hàng tối đa có thể và thỏa thuận phương án xử
              lý phù hợp.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePolicy;

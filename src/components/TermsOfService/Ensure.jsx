import React from "react";
import icons from "../../utils/icons";
const { FaUserShield } = icons;
const Ensure = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <FaUserShield className="text-blue-500" />
          Đảm Bảo An Toàn
        </h2>

        <div className="space-y-4">
          <h3 className="font-semibold text-[#00c0d1]">Biện Pháp An Toàn:</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
            <li> Phương tiện đạt chuẩn an toàn</li>
            <li> Hướng dẫn viên được đào tạo sơ cấp cứu</li>
            <li> Liên hệ khẩn cấp với cơ quan y tế địa phương</li>
            <li> Theo dõi sức khỏe khách hàng thường xuyên</li>
            <li> Cung cấp thiết bị bảo hộ cần thiết (nếu có)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Ensure;

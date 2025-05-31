import React from "react";

import icons from "../../utils/icons";
const { FaRegCheckCircle } = icons;

const PrivacyPolicy = () => {
  return (
    <div className="bg-white dark:bg-slate-900">
      <section
        className="container mx-auto px-4 py-2"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00c0d1] mt-4 mb-4 border-l-8 border-b-blue-300 pl-3"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Chính Sách Bảo Mật Thông Tin Khách Hàng
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          {/* Card 1: Thu thập thông tin */}
          <div
            className="bg-gray-50 dark:bg-slate-950 rounded-lg p-6 shadow-md"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <FaRegCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Thu thập thông tin
              </h3>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Chúng tôi chỉ thu thập các thông tin cần thiết như họ tên, email,
              số điện thoại để phục vụ quá trình đặt tour và cung cấp dịch vụ.
            </p>
          </div>

          {/* Card 2: Sử dụng thông tin */}
          <div
            className="bg-gray-50 dark:bg-slate-950 rounded-lg p-6 shadow-md"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <FaRegCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Sử dụng thông tin
              </h3>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Thông tin của khách hàng được sử dụng để xác nhận đặt tour, gửi
              thông báo và cung cấp hỗ trợ khách hàng.
            </p>
          </div>

          {/* Card 3: Bảo mật thông tin */}
          <div
            className="bg-gray-50 dark:bg-slate-950 rounded-lg p-6 shadow-md"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <FaRegCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Bảo mật thông tin
              </h3>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Mọi dữ liệu cá nhân được mã hóa và lưu trữ an toàn, không chia sẻ
              với bên thứ ba trừ khi có sự đồng ý của khách hàng hoặc theo yêu
              cầu pháp luật.
            </p>
          </div>

          {/* Card 4: Quyền của khách hàng */}
          <div
            className="bg-gray-50 dark:bg-slate-950 rounded-lg p-6 shadow-md"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <FaRegCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Quyền của khách hàng
              </h3>
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Khách hàng có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá
              nhân của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

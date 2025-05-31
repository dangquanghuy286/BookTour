import React from "react";

const CancellationPolicy = () => {
  return (
    <div className="bg-white dark:bg-slate-900">
      <section
        className="container mx-auto px-4 py-2 bg-white dark:bg-slate-900 rounded-md "
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00c0d1] mt-4 mb-4 border-l-8 border-b-blue-300 pl-3"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Chính Sách Hủy Tour & Hoàn Tiền
        </h2>
        <p
          className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          Chúng tôi hiểu rằng đôi khi kế hoạch có thể thay đổi. Chính sách hủy
          tour và hoàn tiền của chúng tôi được thiết kế để mang lại sự linh hoạt
          tối đa cho khách hàng:
        </p>
        <ul
          className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-8 space-y-4"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <li>
            <strong>Hủy tour trước 7 ngày:</strong> Hoàn tiền 100% giá trị tour.
          </li>
          <li>
            <strong>Hủy tour trong vòng 3-7 ngày:</strong> Hoàn tiền 50% giá trị
            tour.
          </li>
          <li>
            <strong>Hủy tour dưới 3 ngày:</strong> Không hoàn tiền.
          </li>
          <li>
            <strong>Hoàn tiền do điều kiện bất khả kháng:</strong> Liên hệ trực
            tiếp để được hỗ trợ.
          </li>
        </ul>
        <p
          className="mt-8 text-sm sm:text-base text-gray-600 dark:text-gray-300 italic"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          Vui lòng đọc kỹ các điều khoản trước khi đặt tour để tránh những phiền
          toái không mong muốn.
        </p>
      </section>
    </div>
  );
};

export default CancellationPolicy;

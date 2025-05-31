import React from "react";
import icons from "../../utils/icons";
const { FaExclamationTriangle } = icons;
const CancellationPolicy = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <FaExclamationTriangle className="text-orange-500" />
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

        <div
          className="overflow-x-auto"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-700">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-800 dark:text-white">
                  Thời Gian Hủy
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-800 dark:text-white">
                  Phí Hủy
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-800 dark:text-white">
                  Hoàn Tiền
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-slate-800">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                  Trước 15 ngày
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                  10% giá trị tour
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-green-600 font-semibold">
                  90%
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-slate-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                  7-14 ngày
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                  25% giá trị tour
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-green-600 font-semibold">
                  75%
                </td>
              </tr>
              <tr className="bg-white dark:bg-slate-800">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                  3-6 ngày
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                  50% giá trị tour
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-yellow-600 font-semibold">
                  50%
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-slate-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                  Dưới 3 ngày
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                  100% giá trị tour
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-red-600 font-semibold">
                  0%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-8 space-y-4 mb-4">
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

import React from "react";
import icons from "../../utils/icons";

const { FaExclamationTriangle } = icons;

const AdditionalTerms = () => {
  return (
    <div className="container mx-auto px-4 py-2">
      <section
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.16)] dark:border-gray-600 dark:bg-slate-950"
        data-aos="fade-up"
        data-aos-delay="900"
      >
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white">
          <FaExclamationTriangle className="text-orange-500" />
          Điều Khoản Bổ Sung
        </h2>

        <div className="space-y-6">
          {/* Quy định về thanh toán */}
          <div>
            <h3 className="mb-3 font-semibold text-[#00c0d1]">
              Quy Định Về Thanh Toán:
            </h3>

            <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Khách hàng có thể lựa chọn các phương thức thanh toán được cung
                cấp trên hệ thống tại thời điểm đặt tour.
              </li>

              <li>
                Khách hàng cần cung cấp đầy đủ và chính xác thông tin thanh toán
                để đảm bảo quá trình đặt tour được xử lý chính xác.
              </li>

              <li>
                Đối với các phương thức thanh toán sau hoặc thanh toán tại văn
                phòng, khách hàng cần hoàn tất thanh toán theo thời hạn được
                thông báo.
              </li>

              <li>
                Trường hợp khách hàng không hoàn tất thanh toán đúng thời hạn,
                đơn đặt tour có thể bị hủy theo chính sách của hệ thống.
              </li>
            </ul>
          </div>

          {/* Quyền lợi khách hàng */}
          <div>
            <h3 className="mb-3 font-semibold text-[#00c0d1]">
              Quyền Lợi Khách Hàng:
            </h3>

            <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Được cung cấp đầy đủ thông tin về lịch trình, dịch vụ, thời gian
                và các điều kiện liên quan đến tour trước khi khởi hành.
              </li>

              <li>
                Có quyền yêu cầu hỗ trợ đối với các nhu cầu đặc biệt như ăn
                chay, hỗ trợ người khuyết tật hoặc các yêu cầu khác. Các yêu cầu
                này cần được thông báo trước ít nhất 7 ngày để được xem xét và
                sắp xếp.
              </li>

              <li>
                Có quyền yêu cầu hỗ trợ và gửi khiếu nại liên quan đến dịch vụ
                trong quá trình sử dụng tour.
              </li>

              <li>
                Các yêu cầu hỗ trợ và khiếu nại sẽ được tiếp nhận và phản hồi
                trong vòng 48 giờ kể từ thời điểm hệ thống hoặc bộ phận hỗ trợ
                tiếp nhận thông tin.
              </li>
            </ul>
          </div>

          {/* Trách nhiệm khách hàng */}
          <div>
            <h3 className="mb-3 font-semibold text-[#00c0d1]">
              Trách Nhiệm Của Khách Hàng:
            </h3>

            <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Cung cấp đầy đủ, chính xác thông tin cá nhân và thông tin liên
                hệ khi đặt tour.
              </li>

              <li>
                Kiểm tra kỹ thông tin đặt tour, lịch trình, thời gian khởi hành
                và các dịch vụ trước khi xác nhận.
              </li>

              <li>
                Tuân thủ các quy định, hướng dẫn của đơn vị tổ chức tour và các
                quy định tại điểm đến.
              </li>

              <li>
                Chủ động thông báo cho đơn vị tổ chức nếu có thay đổi về thông
                tin hoặc yêu cầu hỗ trợ trước ngày khởi hành.
              </li>
            </ul>
          </div>

          {/* Điều khoản khác */}
          <div>
            <h3 className="mb-3 font-semibold text-[#00c0d1]">
              Các Điều Khoản Khác:
            </h3>

            <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Các điều khoản về hủy tour, hoàn tiền và thay đổi lịch trình
                được áp dụng theo chính sách tương ứng của từng tour.
              </li>

              <li>
                Trong trường hợp phát sinh sự cố ngoài khả năng kiểm soát, lịch
                trình hoặc dịch vụ có thể được điều chỉnh để đảm bảo an toàn và
                quyền lợi của khách hàng.
              </li>

              <li>
                Khách hàng có trách nhiệm đọc và hiểu các điều khoản, chính sách
                liên quan trước khi xác nhận đặt tour.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdditionalTerms;

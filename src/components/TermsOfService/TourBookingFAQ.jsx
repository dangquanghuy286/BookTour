import React, { useState } from "react";
import icons from "../../utils/icons";
const {
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCreditCard,
  FaUsers,
  FaPhone,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
} = icons;
import { company } from "../../contexts/TourContext";

const TourBookingFAQ = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData = [
    {
      id: "booking",
      icon: FaCalendarAlt,
      title: "Đặt Tour & Thanh Toán",
      questions: [
        {
          q: "Làm thế nào để đặt tour?",
          a: "Bạn có thể đặt tour qua website, hotline 0901234567, hoặc đến trực tiếp văn phòng tại Quảng Lăng A, Điện Nam Trung, Điện Bàn, Quảng Nam. Chúng tôi sẽ xác nhận lại thông tin và gửi voucher xác nhận.",
        },
        {
          q: "Các hình thức thanh toán nào được chấp nhận?",
          a: "Chúng tôi chấp nhận thanh toán bằng tiền mặt, chuyển khoản ngân hàng, thẻ tín dụng (Visa/MasterCard), ví điện tử (MoMo, ZaloPay).",
        },
        {
          q: "Khi nào cần thanh toán đầy đủ?",
          a: "Đăng ký online: Thanh toán đầy đủ 100% ngay khi đặt tour. Đăng ký tại văn phòng: Có thể đặt cọc 30-50%, thanh toán đầy đủ trước ngày khởi hành 3-7 ngày.",
        },
      ],
    },
    {
      id: "cancellation",
      icon: FaShieldAlt,
      title: "Hủy Tour & Hoàn Tiền",
      questions: [
        {
          q: "Chính sách hủy tour như thế nào?",
          a: "Hủy trước 15 ngày: phí 10%, hoàn 90% | Hủy 7-14 ngày: phí 25%, hoàn 75% | Hủy 3-6 ngày: phí 50%, hoàn 50% | Hủy dưới 3 ngày: phí 100%, không hoàn tiền.",
        },
        {
          q: "Bao lâu sẽ nhận được tiền hoàn?",
          a: "Tiền hoàn sẽ được chuyển trong vòng 7-15 ngày làm việc kể từ ngày xác nhận hủy tour.",
        },
        {
          q: "Có được hoàn tiền 100% trong trường hợp nào?",
          a: "Hoàn 100% khi công ty hủy tour do lý do khách quan (thời tiết, an ninh) hoặc không đủ số lượng khách tối thiểu.",
        },
      ],
    },
    {
      id: "services",
      icon: FaMapMarkerAlt,
      title: "Dịch Vụ Tour",
      questions: [
        {
          q: "Tour bao gồm những dịch vụ gì?",
          a: "Thường bao gồm: xe di chuyển, khách sạn, các bữa ăn theo chương trình, vé tham quan, hướng dẫn viên, bảo hiểm du lịch.",
        },
        {
          q: "Có thể yêu cầu thay đổi khách sạn không?",
          a: "Có thể upgrade khách sạn cao cấp hơn với phụ thu. Việc thay đổi cần được thông báo trước ít nhất 7 ngày.",
        },
        {
          q: "Nếu có yêu cầu ăn chay/kiêng có được hỗ trợ?",
          a: "Có, vui lòng thông báo yêu cầu đặc biệt khi đăng ký tour. Chúng tôi sẽ sắp xếp suất ăn phù hợp.",
        },
      ],
    },
    {
      id: "requirements",
      icon: FaUsers,
      title: "Yêu Cầu & Giấy Tờ",
      questions: [
        {
          q: "Cần chuẩn bị giấy tờ gì khi đi tour?",
          a: "Tour trong nước: CMND/CCCD. Tour nước ngoài: Hộ chiếu còn hạn >6 tháng, visa (nếu cần), giấy phép lao động (một số nước).",
        },
        {
          q: "Trẻ em đi tour có ưu đãi gì?",
          a: "Trẻ dưới 2 tuổi: miễn phí (không ghế riêng) | 2-5 tuổi: 75% giá người lớn | 6-11 tuổi: 90% giá người lớn.",
        },
        {
          q: "Có hỗ trợ người cao tuổi/khuyết tật không?",
          a: "Có, vui lòng thông báo trước để chúng tôi chuẩn bị dịch vụ hỗ trợ phù hợp và đảm bảo an toàn.",
        },
      ],
    },
    {
      id: "support",
      icon: FaPhone,
      title: "Hỗ Trợ & Liên Hệ",
      questions: [
        {
          q: "Liên hệ hỗ trợ 24/7 như thế nào?",
          a: "Hotline: 0901234567 | Email: support@goviet.com | Địa chỉ: Quảng Lăng A, Điện Nam Trung, Điện Bàn, Quảng Nam | Zalo/Viber: 0901234567",
        },
        {
          q: "Nếu gặp sự cố trong chuyến đi thì sao?",
          a: "Liên hệ ngay hướng dẫn viên hoặc hotline khẩn cấp. Chúng tôi có đội ngũ xử lý sự cố 24/7.",
        },
        {
          q: "Có dịch vụ tư vấn thiết kế tour riêng không?",
          a: "Có, chúng tôi nhận thiết kế tour theo yêu cầu cho nhóm từ 10 người trở lên. Liên hệ để được tư vấn chi tiết.",
        },
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="container px-4 py-2 mx-auto space-y-8">
        <section
          className="bg-white dark:bg-slate-950 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 gap-3 flex items-center">
            <FaQuestionCircle className="text-orange-500" />
            Câu Hỏi Thường Gặp - GoViet Du Lịch
          </h2>

          <div className="space-y-6">
            {faqData.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-[#00c0d1] to-[#0099aa] p-4">
                    <h3 className="font-semibold text-white flex items-center gap-3">
                      <IconComponent size={20} />
                      {category.title}
                    </h3>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {category.questions.map((item, index) => {
                      const itemId = `${category.id}-${index}`;
                      const isExpanded = expandedItems[itemId];

                      return (
                        <div
                          key={itemId}
                          className="bg-white dark:bg-slate-900"
                        >
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200 flex justify-between items-center"
                          >
                            <span className="font-medium text-gray-800 dark:text-gray-200 pr-4">
                              {item.q}
                            </span>
                            {isExpanded ? (
                              <FaChevronUp
                                className="text-[#00c0d1] flex-shrink-0"
                                size={20}
                              />
                            ) : (
                              <FaChevronDown
                                className="text-[#00c0d1] flex-shrink-0"
                                size={20}
                              />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4">
                              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border-l-4 border-[#00c0d1]">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {item.a}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 border border-cyan-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                <FaPhone
                  className="text-orange-600 dark:text-orange-400"
                  size={24}
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Cần hỗ trợ thêm?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Đội ngũ tư vấn viên GoViet luôn sẵn sàng hỗ trợ bạn 24/7
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-white dark:bg-slate-800 dark:text-white px-3 py-1 rounded-full border">
                    📞 Hotline: {company.phone}
                  </span>
                  <span className="bg-white dark:bg-slate-800 dark:text-white px-3 py-1 rounded-full border">
                    📧 Email: {company.email}
                  </span>
                  <span className="bg-white dark:bg-slate-800 dark:text-white px-3 py-1 rounded-full border">
                    📍 {company.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TourBookingFAQ;

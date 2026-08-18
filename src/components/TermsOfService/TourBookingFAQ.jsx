import React, { useState } from "react";
import icons from "../../utils/icons";
import { company } from "../../contexts/TourContext";

const {
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCreditCard,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
} = icons;

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
          a: `Bạn có thể đặt tour trực tiếp trên website, liên hệ hotline ${company.phone}, hoặc đến văn phòng của chúng tôi. Sau khi tiếp nhận thông tin, nhân viên sẽ xác nhận lại lịch trình, số lượng khách và gửi thông tin xác nhận đặt tour.`,
        },
        {
          q: "Các hình thức thanh toán nào được chấp nhận?",
          a: "Chúng tôi hỗ trợ nhiều hình thức thanh toán như tiền mặt, chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ và các phương thức thanh toán trực tuyến được hỗ trợ trên website.",
        },
        {
          q: "Khi nào cần thanh toán đầy đủ?",
          a: "Tùy theo từng tour và thời điểm đăng ký. Khách hàng có thể cần thanh toán đầy đủ khi đặt tour hoặc đặt cọc trước và hoàn tất phần còn lại theo thời hạn được thông báo trong quá trình xác nhận.",
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
          a: "Chi phí hủy tour được áp dụng tùy theo thời điểm khách hàng thông báo hủy và điều kiện của từng tour. Vui lòng kiểm tra chính sách hủy tour cụ thể trước khi xác nhận đặt tour.",
        },
        {
          q: "Bao lâu sẽ nhận được tiền hoàn?",
          a: "Thời gian hoàn tiền phụ thuộc vào phương thức thanh toán và quy trình xử lý của công ty. Sau khi yêu cầu hủy được xác nhận, nhân viên sẽ thông báo thời gian hoàn tiền dự kiến cho khách hàng.",
        },
        {
          q: "Có được hoàn tiền 100% trong trường hợp nào?",
          a: "Trong một số trường hợp đặc biệt như công ty chủ động hủy tour do nguyên nhân khách quan hoặc không thể tổ chức tour theo cam kết, khách hàng có thể được hoàn tiền theo chính sách áp dụng của tour.",
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
          a: "Tùy từng chương trình, tour có thể bao gồm phương tiện di chuyển, khách sạn, các bữa ăn theo lịch trình, vé tham quan, hướng dẫn viên và bảo hiểm du lịch. Các dịch vụ cụ thể sẽ được thể hiện rõ trong thông tin của từng tour.",
        },
        {
          q: "Có thể yêu cầu thay đổi khách sạn không?",
          a: "Có thể yêu cầu nâng cấp hoặc thay đổi khách sạn tùy theo tình trạng phòng và điều kiện của tour. Trường hợp phát sinh chi phí, khách hàng sẽ được thông báo trước khi xác nhận.",
        },
        {
          q: "Nếu có yêu cầu ăn chay/ăn kiêng có được hỗ trợ không?",
          a: "Có. Khách hàng vui lòng thông báo yêu cầu ăn chay, ăn kiêng hoặc dị ứng thực phẩm ngay khi đăng ký tour để chúng tôi có thể chủ động sắp xếp phù hợp.",
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
          a: "Đối với tour trong nước, khách hàng nên mang theo CCCD/giấy tờ tùy thân hợp lệ. Đối với tour quốc tế, cần chuẩn bị hộ chiếu còn thời hạn và visa hoặc các giấy tờ nhập cảnh cần thiết theo quy định của quốc gia đến.",
        },
        {
          q: "Trẻ em đi tour có ưu đãi gì?",
          a: "Chính sách giá dành cho trẻ em phụ thuộc vào từng chương trình tour, độ tuổi và dịch vụ sử dụng. Vui lòng cung cấp độ tuổi của trẻ khi đăng ký để nhân viên tư vấn chính xác.",
        },
        {
          q: "Có hỗ trợ người cao tuổi hoặc người khuyết tật không?",
          a: "Có. Khách hàng vui lòng thông báo trước về nhu cầu hỗ trợ để chúng tôi có thể chủ động sắp xếp phương tiện, chỗ ở và các dịch vụ phù hợp nhằm đảm bảo chuyến đi thuận tiện và an toàn.",
        },
      ],
    },

    {
      id: "support",
      icon: FaPhone,
      title: "Hỗ Trợ & Liên Hệ",
      questions: [
        {
          q: "Liên hệ hỗ trợ như thế nào?",
          a: `Bạn có thể liên hệ với chúng tôi thông qua hotline ${company.phone}, email ${company.email} hoặc trực tiếp tại địa chỉ ${company.address}.`,
        },
        {
          q: "Nếu gặp sự cố trong chuyến đi thì sao?",
          a: "Nếu phát sinh sự cố trong chuyến đi, khách hàng nên liên hệ ngay với hướng dẫn viên hoặc bộ phận hỗ trợ của công ty để được tiếp nhận và xử lý trong thời gian sớm nhất.",
        },
        {
          q: "Có dịch vụ tư vấn thiết kế tour riêng không?",
          a: "Có. Chúng tôi hỗ trợ tư vấn và thiết kế chương trình tour riêng theo nhu cầu của cá nhân, gia đình, nhóm bạn hoặc doanh nghiệp. Vui lòng liên hệ để được tư vấn lịch trình và chi phí phù hợp.",
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
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <FaQuestionCircle className="text-orange-500 flex-shrink-0" />

              <span>Câu Hỏi Thường Gặp - GoViet Du Lịch</span>
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Những câu hỏi thường gặp về việc đặt tour, thanh toán, hủy tour và
              các dịch vụ du lịch của GoViet.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {faqData.map((category) => {
              const IconComponent = category.icon;

              return (
                <div
                  key={category.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-[#00c0d1] to-[#0099aa] px-4 py-4">
                    <h3 className="font-semibold text-white flex items-center gap-3">
                      <IconComponent size={20} className="flex-shrink-0" />

                      <span>{category.title}</span>
                    </h3>
                  </div>

                  {/* Questions */}
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {category.questions.map((item, index) => {
                      const itemId = `${category.id}-${index}`;
                      const isExpanded = !!expandedItems[itemId];

                      return (
                        <div
                          key={itemId}
                          className="bg-white dark:bg-slate-900"
                        >
                          {/* Question */}
                          <button
                            type="button"
                            onClick={() => toggleItem(itemId)}
                            aria-expanded={isExpanded}
                            aria-controls={`answer-${itemId}`}
                            className="w-full px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200 flex justify-between items-center gap-4"
                          >
                            <span className="font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                              {item.q}
                            </span>

                            <span className="flex-shrink-0">
                              {isExpanded ? (
                                <FaChevronUp
                                  className="text-[#00c0d1]"
                                  size={20}
                                />
                              ) : (
                                <FaChevronDown
                                  className="text-[#00c0d1]"
                                  size={20}
                                />
                              )}
                            </span>
                          </button>

                          {/* Answer */}
                          {isExpanded && (
                            <div id={`answer-${itemId}`} className="px-4 pb-4">
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

          {/* Support */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 border border-cyan-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              {/* Support Icon */}
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full flex-shrink-0">
                <FaPhone
                  className="text-orange-600 dark:text-orange-400"
                  size={24}
                />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Cần hỗ trợ thêm?
                </h4>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Đội ngũ tư vấn viên GoViet luôn sẵn sàng hỗ trợ và giải đáp
                  các thắc mắc của bạn.
                </p>

                {/* Contact Information */}
                <div className="flex flex-wrap gap-3 text-sm">
                  {/* Phone */}
                  <span className="bg-white dark:bg-slate-800 dark:text-white px-3 py-2 rounded-full border border-gray-200 dark:border-gray-600 flex items-center gap-2">
                    <FaPhone className="text-[#00c0d1] flex-shrink-0" />

                    <span>Hotline: {company.phone}</span>
                  </span>

                  {/* Email */}
                  <span className="bg-white dark:bg-slate-800 dark:text-white px-3 py-2 rounded-full border border-gray-200 dark:border-gray-600 flex items-center gap-2">
                    <FaEnvelope className="text-[#00c0d1] flex-shrink-0" />

                    <span>Email: {company.email}</span>
                  </span>

                  {/* Address */}
                  <span className="bg-white dark:bg-slate-800 dark:text-white px-3 py-2 rounded-full border border-gray-200 dark:border-gray-600 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#00c0d1] flex-shrink-0" />

                    <span>{company.address}</span>
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

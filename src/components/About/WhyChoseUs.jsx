import React from "react";

import icons from "../../utils/icons";
const { FaAward, FaUsers, FaTags, FaHeart } = icons;

const items = [
  {
    number: "5+",
    label: "Năm kinh nghiệm",
    title: "Kinh Nghiệm Lâu Năm",
    desc: "Với hơn 5 năm kinh nghiệm trong ngành du lịch, chúng tôi hiểu rõ nhu cầu và mong muốn của khách hàng để tạo ra những chuyến đi hoàn hảo.",
    icon: FaAward,
    color: "blue",
    aos: "slide-right",
    delay: 500,
  },
  {
    number: "24/7",
    label: "Hỗ trợ khách hàng",
    title: "Đội Ngũ Chuyên Nghiệp",
    desc: "Đội ngũ hướng dẫn viên được đào tạo bài bản, am hiểu văn hóa địa phương và luôn sẵn sàng hỗ trợ khách hàng 24/7.",
    icon: FaUsers,
    color: "green",
    aos: "slide-left",
    delay: 600,
  },
  {
    number: "#1",
    label: "Giá tốt nhất",
    title: "Giá Cả Cạnh Tranh",
    desc: "Cam kết mang đến những tour du lịch chất lượng cao với mức giá hợp lý nhất, cùng nhiều ưu đãi hấp dẫn cho khách hàng thân thiết.",
    icon: FaTags,
    color: "purple",
    aos: "slide-right",
    delay: 700,
  },
  {
    number: "∞",
    label: "Sự hài lòng",
    title: "Dịch Vụ Tận Tâm",
    desc: 'Từ khâu tư vấn, đặt tour đến hậu mãi, chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu với phương châm "Khách hàng là ưu tiên số 1".',
    icon: FaHeart,
    color: "orange",
    aos: "slide-left",
    delay: 800,
  },
];

const colorClasses = {
  blue: {
    gradient: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
    text: "text-blue-50 dark:text-blue-100",
    number: "text-blue-500 dark:text-blue-400",
  },
  green: {
    gradient:
      "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
    text: "text-green-50 dark:text-green-100",
    number: "text-green-500 dark:text-green-400",
  },
  purple: {
    gradient:
      "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700",
    text: "text-purple-50 dark:text-purple-100",
    number: "text-purple-500 dark:text-purple-400",
  },
  orange: {
    gradient:
      "from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700",
    text: "text-orange-50 dark:text-orange-100",
    number: "text-orange-500 dark:text-orange-400",
  },
};

const WhyChooseUs = () => {
  return (
    <div className="bg-white dark:bg-slate-900">
      <section
        className="container mx-auto px-4 py-2"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00c0d1] mt-4 mb-4 border-l-8 border-b-4 border-b-blue-300 pl-3"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Tại Sao Nên Chọn Công Ty Chúng Tôi
        </h2>

        {/* Intro text */}
        <div
          className="text-center mb-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Chúng tôi tự hào là đối tác đáng tin cậy trong hành trình khám phá
            thế giới của bạn
          </p>
        </div>

        {/* Main content - Timeline style layout */}
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="400">
          {items.map((item, index) => {
            const Icon = item.icon;
            const colors = colorClasses[item.color];
            const isReversed = index % 2 === 1; // item 2, 4 => right aligned

            return (
              <div
                key={item.title}
                className="flex flex-col lg:flex-row items-center gap-6"
                data-aos={item.aos}
                data-aos-delay={item.delay}
              >
                {/* Card */}
                <div
                  className={`lg:w-1/2 order-2 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div
                    className={`bg-gradient-to-r ${colors.gradient} text-white p-6 rounded-xl shadow-lg`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center">
                        {Icon && (
                          <Icon className="w-6 h-6" aria-hidden="true" />
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold">
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className={`${colors.text} text-sm sm:text-base leading-relaxed`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Number */}
                <div
                  className={`lg:w-1/2 order-1 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div
                    className={`text-5xl sm:text-6xl font-bold ${colors.number} text-center`}
                  >
                    {item.number}
                  </div>
                  <p className="text-center text-gray-500 dark:text-gray-400 mt-2 font-semibold text-sm">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-12"
          data-aos="fade-up"
          data-aos-delay="900"
        >
          <div className="bg-gradient-to-r from-[#00c0d1] to-blue-500 dark:from-[#00a0b1] dark:to-blue-600 text-white px-6 py-3 rounded-full inline-block shadow-lg">
            <p className="text-base font-semibold">
              Hãy để chúng tôi đồng hành cùng bạn trong mọi hành trình!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;

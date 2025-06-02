import React from "react";

import icons from "../../utils/icons";
const { FaRegCheckCircle } = icons;

const WhyChooseUs = () => {
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
          {/* Item 1 - Left aligned */}
          <div
            className="flex flex-col lg:flex-row items-center gap-6"
            data-aos="slide-right"
            data-aos-delay="500"
          >
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center">
                    <FaRegCheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Kinh Nghiệm Lâu Năm
                  </h3>
                </div>
                <p className="text-blue-50 dark:text-blue-100 text-sm sm:text-base leading-relaxed">
                  Với hơn 5 năm kinh nghiệm trong ngành du lịch, chúng tôi hiểu
                  rõ nhu cầu và mong muốn của khách hàng để tạo ra những chuyến
                  đi hoàn hảo.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="text-5xl sm:text-6xl font-bold text-blue-100 dark:text-blue-800 text-center">
                5+
              </div>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2 font-semibold text-sm">
                Năm kinh nghiệm
              </p>
            </div>
          </div>

          {/* Item 2 - Right aligned */}
          <div
            className="flex flex-col lg:flex-row items-center gap-6"
            data-aos="slide-left"
            data-aos-delay="600"
          >
            <div className="lg:w-1/2 order-1">
              <div className="text-5xl sm:text-6xl font-bold text-green-100 dark:text-green-800 text-center">
                24/7
              </div>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2 font-semibold text-sm">
                Hỗ trợ khách hàng
              </p>
            </div>
            <div className="lg:w-1/2 order-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center">
                    <FaRegCheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Đội Ngũ Chuyên Nghiệp
                  </h3>
                </div>
                <p className="text-green-50 dark:text-green-100 text-sm sm:text-base leading-relaxed">
                  Đội ngũ hướng dẫn viên được đào tạo bài bản, am hiểu văn hóa
                  địa phương và luôn sẵn sàng hỗ trợ khách hàng 24/7.
                </p>
              </div>
            </div>
          </div>

          {/* Item 3 - Left aligned */}
          <div
            className="flex flex-col lg:flex-row items-center gap-6"
            data-aos="slide-right"
            data-aos-delay="700"
          >
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center">
                    <FaRegCheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Giá Cả Cạnh Tranh
                  </h3>
                </div>
                <p className="text-purple-50 dark:text-purple-100 text-sm sm:text-base leading-relaxed">
                  Cam kết mang đến những tour du lịch chất lượng cao với mức giá
                  hợp lý nhất, cùng nhiều ưu đãi hấp dẫn cho khách hàng thân
                  thiết.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="text-5xl sm:text-6xl font-bold text-purple-100 dark:text-purple-800 text-center">
                #1
              </div>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2 font-semibold text-sm">
                Giá tốt nhất
              </p>
            </div>
          </div>

          {/* Item 4 - Right aligned */}
          <div
            className="flex flex-col lg:flex-row items-center gap-6"
            data-aos="slide-left"
            data-aos-delay="800"
          >
            <div className="lg:w-1/2 order-1">
              <div className="text-5xl sm:text-6xl font-bold text-orange-100 dark:text-orange-800 text-center">
                ∞
              </div>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2 font-semibold text-sm">
                Sự hài lòng
              </p>
            </div>
            <div className="lg:w-1/2 order-2">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center">
                    <FaRegCheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Dịch Vụ Tận Tâm
                  </h3>
                </div>
                <p className="text-orange-50 dark:text-orange-100 text-sm sm:text-base leading-relaxed">
                  Từ khâu tư vấn, đặt tour đến hậu mãi, chúng tôi luôn đặt sự
                  hài lòng của khách hàng lên hàng đầu với phương châm "Khách
                  hàng là ưu tiên số 1".
                </p>
              </div>
            </div>
          </div>
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

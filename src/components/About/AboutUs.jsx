import React from "react";
import { Link } from "react-router-dom";
import icons from "../../utils/icons";
const { FaRegCheckCircle } = icons;

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-2">
        {/* Tiêu đề */}
        <h1
          className="py-2 pl-3 my-4 sm:my-6 md:my-8 text-xl sm:text-2xl md:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Về Chúng Tôi !
        </h1>

        <div
          className="flex flex-col items-center text-center px-2"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white max-w-4xl">
            Kinh Nghiệm Và Công Ty Du Lịch Chuyên Nghiệp Ở Việt Nam!
          </p>
        </div>

        {/* Nội dung chính */}
        <div
          className="flex flex-col md:flex-row justify-center items-center mt-12 gap-10 px-2 md:px-0"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {/* Bên trái */}
          <div
            className="relative flex items-center justify-center w-40 h-40 sm:w-44 sm:h-44 bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-600 rounded-full shadow-lg"
            data-aos="flip-left"
            data-aos-delay="500"
          >
            <div className="text-center text-gray-800 dark:text-white">
              <p className="text-base sm:text-lg font-medium">Chúng tôi có</p>
              <p className="text-5xl sm:text-6xl font-bold">5+</p>
            </div>
            <div className="absolute transform rotate-12 -translate-y-1/4 top-1 right-2 translate-x-1/4">
              <div className="px-2 py-1 text-xs sm:text-sm font-medium text-white bg-orange-500 rounded-full">
                Năm kinh nghiệm
              </div>
            </div>
          </div>

          {/* Bên phải */}
          <div
            className="w-full max-w-2xl text-center md:text-left px-2"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Chúng tôi chuyên tạo ra những trải nghiệm thành phố khó quên cho
              du khách muốn khám phá cảnh quan đô thị. Các tour du lịch có hướng
              dẫn viên chuyên nghiệp của chúng tôi sẽ đưa du khách qua những con
              phố sôi động, các địa danh lịch sử và những viên ngọc ẩn giấu của
              mỗi thành phố.
            </p>

            <div
              className="flex flex-col sm:flex-row justify-between pt-10 gap-6 sm:gap-10"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaRegCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  <p className="text-sm sm:text-base">Cơ quan trải nghiệm</p>
                </div>
                <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaRegCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  <p className="text-sm sm:text-base">Du lịch chi phí thấp</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaRegCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  <p className="text-sm sm:text-base">Đội ngũ chuyên nghiệp</p>
                </div>
                <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                  <FaRegCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  <p className="text-sm sm:text-base">Hỗ trợ trực tuyến 24/7</p>
                </div>
              </div>
            </div>

            <div
              className="relative flex items-center justify-center md:justify-start gap-2 mt-8 group"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <div
                className="p-2 border text-center border-gray-300 w-full sm:w-[200px] rounded-full 
                transition-all duration-300 
                bg-[#00c0d1] hover:bg-[#0090a0] 
                text-white hover:text-white 
                shadow-sm hover:shadow-lg"
              >
                <Link
                  to="/tour"
                  onClick={() => window.scrollTo(0, 0)}
                  className="font-semibold block"
                >
                  Khám phá Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

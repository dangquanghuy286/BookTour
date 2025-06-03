import React from "react";
import imgSection from "../../assets/Img/Banner.png";
import icons from "../../utils/icons";
const { MdFastfood, MdOutlineHotel, MdFlight, FaWifi } = icons;

const Banner = () => {
  return (
    <div className="min-h-[550px] dark:bg-slate-900 dark:text-white bg-white">
      <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-8 sm:py-0 px-4 lg:px-16">
        <div className="container mx-auto">
          <div className="grid items-center grid-cols-1 gap-10 sm:grid-cols-2">
            {/* img section */}
            <div data-aos="flip-up" className="flex justify-center">
              <img
                className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] h-auto object-cover drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)]"
                src={imgSection}
                alt="Banner"
              />
            </div>
            {/* text section */}
            <div>
              <h1
                data-aos="fade-up"
                className="text-lg sm:text-xl md:text-2xl font-bold max-w-[500px] text-left"
              >
                Khám phá vẻ đẹp tuyệt vời của Việt Nam qua những chuyến đi đầy
                ấn tượng
              </h1>
              <p
                data-aos="fade-up"
                className="mt-3 text-sm md:text-base leading-7 tracking-wide text-left text-gray-400 max-w-[500px]"
              >
                Hành trình khám phá mở ra những trải nghiệm mới lạ, đưa bạn đến
                với cảnh đẹp tuyệt vời và văn hóa độc đáo.
              </p>

              <div
                data-aos="zoom-in"
                className="grid grid-cols-2 gap-4 mt-6 sm:gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <MdFlight className="w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-4 text-3xl sm:text-4xl rounded-full dark:text-bg-slate-900 shadow-sm bg-violet-200" />
                    <p className="text-sm sm:text-base">Chuyến bay</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <MdOutlineHotel className="w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-4 text-3xl sm:text-4xl dark:text-bg-slate-900 bg-pink-200 rounded-full shadow-sm" />
                    <p className="text-sm sm:text-base">Khách sạn</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <FaWifi className="w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-4 text-3xl sm:text-4xl bg-blue-200 dark:text-bg-slate-900 rounded-full shadow-sm" />
                    <p className="text-sm sm:text-base">Wi-Fi</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <MdFastfood className="w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-4 text-3xl sm:text-4xl bg-orange-200 dark:text-bg-slate-900 rounded-full shadow-sm" />
                    <p className="text-sm sm:text-base">Thực phẩm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

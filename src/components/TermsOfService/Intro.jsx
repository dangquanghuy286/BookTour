import React from "react";
import icons from "../../utils/icons";
const { FaInfoCircle } = icons;
const Intro = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-gradient-to-r bg-white  dark:bg-slate-950 rounded-lg p-6 border-l-4 border-[#00c0d1] shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaInfoCircle className="text-[#00c0d1] text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Chào Mừng Bạn Đến Với Dịch Vụ Du Lịch Của Chúng Tôi
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ du lịch của chúng tôi. Với
          hơn 5 năm kinh nghiệm trong ngành du lịch, chúng tôi cam kết mang đến
          cho bạn những trải nghiệm tuyệt vời nhất. Vui lòng đọc kỹ các điều
          khoản và quy định dưới đây để hiểu rõ về quyền lợi và trách nhiệm của
          cả hai bên.
        </p>
      </section>
    </div>
  );
};

export default Intro;

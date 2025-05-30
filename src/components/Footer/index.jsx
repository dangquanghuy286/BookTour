import { NavLink } from "react-router-dom";
import BCT from "../../assets/Img/xac-nhan-bct.png";
import icons from "../../utils/icons";
import { company } from "../../contexts/TourContext";
const { FaUser, FaLocationDot, FaPhone, MdEmail } = icons;

function Footer() {
  return (
    <footer
      className="bg-white dark:bg-slate-900 py-3 sm:py-4 md:py-6 dark:text-white px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
      data-aos="fade-up"
    >
      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Main Footer Content */}
      <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 py-6 sm:py-8 md:py-10 lg:py-12 max-w-8xl mx-auto">
        {/* Giới thiệu */}
        <div className="flex-1 min-w-0 mb-6 sm:mb-0">
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 dark:text-white">
            GIỚI THIỆU
          </h3>
          <p className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
            GoViet là nền tảng chuyên cung cấp các tour du lịch đa dạng và chất
            lượng, với trụ sở đặt tại tỉnh Quảng Nam. Đến với GoViet, khách hàng
            thỏa sức khám phá, GoViet tận tâm tư vấn và đồng hành cùng bạn trên
            mọi hành trình.
          </p>
          <div className="flex justify-start">
            <img
              src={BCT}
              alt="Xác nhận bộ công thương"
              className="w-20 xs:w-24 sm:w-28 md:w-32 lg:w-36 h-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Chính sách */}
        <div className="flex-1 min-w-0 mb-6 sm:mb-0">
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 dark:text-white">
            CHÍNH SÁCH
          </h3>
          <nav role="navigation" aria-label="Footer policies">
            <ul className="space-y-1 sm:space-y-2 md:space-y-3">
              <li>
                <NavLink
                  to="/contact"
                  className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-colors duration-300 block py-1 hover:translate-x-1 transform "
                >
                  Liên hệ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-colors duration-300 block py-1 hover:translate-x-1 transform "
                >
                  Hình thức thanh toán
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/intro"
                  className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-colors duration-300 block py-1 hover:translate-x-1 transform "
                >
                  Điều khoản dịch vụ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-colors duration-300 block py-1 hover:translate-x-1 transform "
                >
                  Chính sách vận chuyển
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-colors duration-300 block py-1 hover:translate-x-1 transform "
                >
                  Chính sách đổi trả
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-colors duration-300 block py-1 hover:translate-x-1 transform "
                >
                  Chính sách bảo mật thông tin
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Thông tin liên hệ */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 dark:text-white">
            THÔNG TIN LIÊN HỆ
          </h3>
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {/* Company Name */}
            <div className="flex items-start gap-2 sm:gap-3 group">
              <FaUser className="text-gray-600 dark:text-gray-400 group-hover:text-[#00c0d1] w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 sm:mt-1 transition-colors duration-300" />
              <p className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {company.companyName}
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 sm:gap-3 group">
              <FaLocationDot className="text-gray-600 dark:text-gray-400 group-hover:text-[#00c0d1] w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 sm:mt-1 transition-colors duration-300" />
              <p className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {company.address}
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-2 sm:gap-3 group">
              <FaPhone className="text-gray-600 dark:text-gray-400 group-hover:text-[#00c0d1] w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 sm:mt-1 transition-colors duration-300" />
              <p className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base">
                <a
                  href={`tel:${company.phone}`}
                  className="text-[#00c0d1] font-medium sm:font-semibold hover:text-[#008a99] hover:underline transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00c0d1] focus:ring-opacity-50 rounded-sm px-1 py-0.5"
                  aria-label={`Gọi điện thoại ${company.phone}`}
                >
                  {company.phone}
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="flex items-start gap-2 sm:gap-3 group">
              <MdEmail className="text-gray-600 dark:text-gray-400 group-hover:text-[#00c0d1] w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 sm:mt-1 transition-colors duration-300" />
              <p className="text-xs xs:text-sm sm:text-base md:text-sm lg:text-base">
                <a
                  href={`mailto:${company.email}`}
                  className="text-[#00c0d1] font-medium sm:font-semibold hover:text-[#008a99] hover:underline transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00c0d1] focus:ring-opacity-50 rounded-sm px-1 py-0.5 break-all"
                  aria-label={`Gửi email đến ${company.email}`}
                >
                  {company.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className="border-gray-300 dark:border-gray-700" />
      <div className="text-center pt-2 sm:pt-3 md:pt-4 pb-1 sm:pb-2">
        <p className="text-xs xs:text-sm sm:text-base md:text-sm text-gray-600 dark:text-gray-400">
          Copyright © 2025 by{" "}
          <span className="font-medium text-gray-800 dark:text-gray-300">
            Quang Huy
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

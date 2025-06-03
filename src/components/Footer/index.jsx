import { NavLink } from "react-router-dom";
import BCT from "../../assets/Img/xac-nhan-bct.png";
import icons from "../../utils/icons";
import { company } from "../../contexts/TourContext";
const { FaUser, FaLocationDot, FaPhone, MdEmail } = icons;

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 py-4 sm:py-6 lg:py-8 dark:text-white px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <hr className="border-gray-300 dark:border-gray-700 mb-6 sm:mb-8 lg:mb-10" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {/* Giới thiệu */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 dark:text-white">
              GIỚI THIỆU
            </h3>
            <p className="text-xs sm:text-sm md:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              GoViet là nền tảng chuyên cung cấp các tour du lịch đa dạng và
              chất lượng, với trụ sở đặt tại tỉnh Quảng Nam. Đến với GoViet,
              khách hàng thỏa sức khám phá, GoViet tận tâm tư vấn và đồng hành
              cùng bạn trên mọi hành trình.
            </p>
            <div className="pt-1 sm:pt-2">
              <img
                src={BCT}
                alt="Xác nhận bộ công thương"
                className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Chính sách Tour Du Lịch */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 dark:text-white">
              CHÍNH SÁCH
            </h3>
            <nav role="navigation" aria-label="Footer policies">
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <NavLink
                    to="/contact"
                    className="text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-all duration-300 block py-0.5 hover:translate-x-1 transform hover:pl-1"
                  >
                    Liên hệ & Hỗ trợ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/aboutus"
                    className="text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-all duration-300 block py-0.5 hover:translate-x-1 transform hover:pl-1"
                  >
                    Về Chúng Tôi
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cancellation"
                    className="text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-all duration-300 block py-0.5 hover:translate-x-1 transform hover:pl-1"
                  >
                    Chính sách hủy tour
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/privacy"
                    className="text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-all duration-300 block py-0.5 hover:translate-x-1 transform hover:pl-1"
                  >
                    Bảo mật thông tin
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/termsofservice"
                    className="text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-all duration-300 block py-0.5 hover:translate-x-1 transform hover:pl-1"
                  >
                    Điều khoản dịch vụ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/faq"
                    className="text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300 hover:text-[#00c0d1] dark:hover:text-[#00c0d1] transition-all duration-300 block py-0.5 hover:translate-x-1 transform hover:pl-1"
                  >
                    Câu Hỏi Thường Gặp
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Thông tin liên hệ */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 dark:text-white">
              LIÊN HỆ
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {/* Company Name */}
              <div className="flex items-start gap-2 group">
                <FaUser className="text-gray-600 dark:text-gray-400 group-hover:text-[#00c0d1] w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 transition-colors duration-300" />
                <p className="text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {company.companyName}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 group">
                <FaLocationDot className="text-gray-600 dark:text-gray-400 group-hover:text-[#00c0d1] w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 transition-colors duration-300" />
                <p className="text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {company.address}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2 group">
                <FaPhone className="text-gray-600 dark:text-gray-400 group-hover:text-[#00c0d1] w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 transition-colors duration-300" />
                <div className="text-xs sm:text-sm md:text-sm">
                  <a
                    href={`tel:${company.phone}`}
                    className="text-[#00c0d1] font-semibold hover:text-[#008a99] hover:underline transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00c0d1] focus:ring-opacity-50 rounded px-1 py-0.5"
                    aria-label={`Gọi điện thoại ${company.phone}`}
                  >
                    {company.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2 group">
                <MdEmail className="text-gray-600 dark:text-gray-400 group-hover:text-[#00c0d1] w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 transition-colors duration-300" />
                <div className="text-xs sm:text-sm md:text-sm min-w-0">
                  <a
                    href={`mailto:${company.email}`}
                    className="text-[#00c0d1] font-semibold hover:text-[#008a99] hover:underline transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00c0d1] focus:ring-opacity-50 rounded px-1 py-0.5 break-words"
                    aria-label={`Gửi email đến ${company.email}`}
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className="border-gray-300 dark:border-gray-700 mt-8 sm:mt-10 lg:mt-12" />
      <div className="text-center pt-4 sm:pt-6">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Copyright © 2025 by{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-300">
            Quang Huy
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

import { NavLink } from "react-router-dom";
import BCT from "../../assets/Img/xac-nhan-bct.png";
import icons from "../../utils/icons";
import { company } from "../../contexts/TourContext";
const { FaUser, FaLocationDot, FaPhone, MdEmail } = icons;

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 py-3 dark:text-white px-4">
      <hr className="border-gray-300 dark:border-gray-700" />

      <div className="flex flex-row justify-between gap-4 py-8 max-w-8xl mx-auto px-2">
        {/* Giới thiệu */}
        <div className="flex-1 min-w-[120px]">
          <h3 className="text-base font-bold mb-2">GIỚI THIỆU</h3>
          <p className="text-xs">
            GoViet là nền tảng chuyên cung cấp các tour du lịch đa dạng và chất
            lượng, với trụ sở đặt tại tỉnh Quảng Nam. Đến với GoViet, khách hàng
            thỏa sức khám phá, GoViet tận tâm tư vấn và đồng hành cùng bạn trên
            mọi hành trình.
          </p>
          <img src={BCT} alt="Xác nhận bộ công thương" className="mt-3 w-24" />
        </div>

        {/* Chính sách */}
        <div className="flex-1 min-w-[120px]">
          <h3 className="text-base font-bold mb-2">CHÍNH SÁCH</h3>
          <ul className="space-y-1 text-xs">
            <li>
              <NavLink to="/contact" className="hover:text-[#00c0d1]">
                Liên hệ
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:text-[#00c0d1]">
                Hình thức thanh toán
              </NavLink>
            </li>
            <li>
              <NavLink to="/intro" className="hover:text-[#00c0d1]">
                Điều khoản dịch vụ
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:text-[#00c0d1]">
                Chính sách vận chuyển
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:text-[#00c0d1]">
                Chính sách đổi trả
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:text-[#00c0d1]">
                Chính sách bảo mật thông tin
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div className="flex-1 min-w-[120px]">
          <h3 className="text-base font-bold mb-2">THÔNG TIN LIÊN HỆ</h3>
          <div className="flex items-start gap-2 mb-2">
            <FaUser className="dark:text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
            <p className="text-xs">{company.companyName}</p>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <FaLocationDot className="dark:text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
            <p className="text-xs">{company.address}</p>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <FaPhone className="dark:text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
            <p className="text-xs">
              <a
                href={`tel:${company.phone}`}
                className="text-[#00c0d1] font-semibold hover:underline"
              >
                {company.phone}
              </a>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <MdEmail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 dark:text-white flex-shrink-0 mt-0.5" />
            <p className="text-xs">
              <a
                href={`mailto:${company.email}`}
                className="text-[#00c0d1] font-semibold hover:underline"
              >
                {company.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700" />
      <div className="text-center pt-2 text-xs text-gray-600 dark:text-gray-400">
        Copyright © 2025 by Quang Huy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

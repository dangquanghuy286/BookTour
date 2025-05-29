import { NavLink } from "react-router-dom";
import BCT from "../../assets/Img/xac-nhan-bct.png";
import icons from "../../utils/icons";

import { company } from "../../contexts/TourContext";
const { FaUser, FaLocationDot, FaPhone, MdEmail } = icons;
function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 py-3 dark:text-white  px-4 sm:px-6 lg:px-8">
      <hr className="border-gray-300 dark:border-gray-700" />

      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-10 py-8 max-w-8xl mx-auto px-2">
        {/* Giới thiệu */}
        <div className="flex-1 min-w-[200px] sm:min-w-[250px]">
          <h3 className="text-lg sm:text-xl font-bold mb-3">GIỚI THIỆU</h3>
          <p className="text-sm sm:text-base">
            GoViet là nền tảng chuyên cung cấp các tour du lịch đa dạng và chất
            lượng, với trụ sở đặt tại tỉnh Quảng Nam. Đến với GoViet, khách hàng
            thỏa sức khám phá, GoViet tận tâm tư vấn và đồng hành cùng bạn trên
            mọi hành trình.
          </p>
          <img
            src={BCT}
            alt="Xác nhận bộ công thương"
            className="mt-4 w-32 sm:w-44"
          />
        </div>

        {/* Chính sách */}
        <div className="flex-1 min-w-[200px] sm:min-w-[250px]">
          <h3 className="text-lg sm:text-xl font-bold mb-3">CHÍNH SÁCH</h3>
          <ul className="space-y-2 text-sm sm:text-base">
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
        <div className="flex-1 min-w-[200px] sm:min-w-[250px]">
          <h3 className="text-lg sm:text-xl font-bold mb-3">
            THÔNG TIN LIÊN HỆ
          </h3>
          <div className="flex items-start gap-3 mb-3">
            <FaUser className="dark:text-white size-6" />
            <p className="text-sm sm:text-base">{company.companyName}</p>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <FaLocationDot className="dark:text-white size-6" />
            <p className="text-sm sm:text-base">{company.address}</p>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <FaPhone className="dark:text-white size-6" />
            <p className="text-sm sm:text-base">
              <a
                href={`tel:${company.phone}`}
                className="text-[#00c0d1] font-semibold hover:underline"
              >
                {company.phone}
              </a>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <MdEmail className="size-6 dark:text-white" />
            <p className="text-sm sm:text-base">
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
      <div className="text-center pt-2 text-lg sm:text-sm text-gray-600 dark:text-gray-400">
        Copyright © 2025 by Quang Huy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

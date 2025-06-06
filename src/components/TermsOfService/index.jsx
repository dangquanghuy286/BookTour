import {
  FaCreditCard,
  FaExclamationTriangle,
  FaInfoCircle,
  FaPhoneAlt,
  FaRegCheckCircle,
  FaUserShield,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Intro from "./Intro";
import Instruction from "./Instruction";
import PaymentPolicy from "./PaymentPolicy";
import CancellationPolicy from "./CancellationPolicy";
import Rules from "./Rules";
import Ensure from "./Ensure";

import AdditionalTerms from "./AdditionalTerms";
import ChangePolicy from "./ChangePolicy";
import Contact from "./Contact";
import ConfirmPolicy from "./ConfirmPolicy";
import GoBack from "../GoBack/Goback";

const TermsOfService = () => {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300 min-h-screen">
      <div className="container mx-auto px-4 py-2">
        {/* Tiêu đề chính */}
        <h1
          className="py-2 pl-3 my-4 sm:my-6 md:my-8 text-xl sm:text-2xl md:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Điều Khoản & Dịch Vụ
        </h1>
        {/*Giới thiệu */}
        <Intro />
        {/* Hướng dẫn đặt tour */}
        <Instruction />

        {/* Chính sách thanh toán */}
        <PaymentPolicy />

        {/* Chính sách hủy tour */}
        <CancellationPolicy />
        {/* Quy tắc và trách nhiệm */}
        <Rules />
        {/* Đảm bảo an toàn */}
        <Ensure />
        {/* Điều khoản bổ sung */}
        <AdditionalTerms />
        {/* Điều khoản thay đổi */}
        <ChangePolicy />
        {/* Thông tin liên hệ */}
        <Contact />
        {/* Chấp nhận điều khoản */}
        <ConfirmPolicy />
        <GoBack />
      </div>
    </div>
  );
};

export default TermsOfService;

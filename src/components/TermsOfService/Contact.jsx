import React from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import { company } from "../../contexts/TourContext";
const { FaPhoneAlt } = icons;

const Contact = () => {
  return (
    <div className="container  px-4 py-2 mx-auto space-y-8">
      <section
        className="bg-gradient-to-r from-[#00c0d1] to-[#0090a0] rounded-lg p-6 text-white shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        data-aos="fade-up"
        data-aos-delay="1100"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaPhoneAlt />
          Liên Hệ Hỗ Trợ
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Hotline 24/7</h3>
            <p className="text-lg">{company.phone}</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Email Hỗ Trợ</h3>
            <p className="text-lg">{company.email}</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Địa Chỉ Văn Phòng</h3>
            <p>{company.address}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block bg-white text-[#00c0d1] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Liên Hệ Ngay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;

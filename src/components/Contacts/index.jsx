// components/Contact/ContactInfo.jsx
import React from "react";
import { company } from "../../contexts/TourContext";

const ContactInfo = () => {
  return (
    <div className="bg-white dark:bg-slate-950 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#00c0d1]  mb-4">
        {company.companyName} Liên Hệ
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
        📍 Địa chỉ: {company.address}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
        📱 Số điện thoại: {company.phone}
      </p>
      <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
        ✉️ Email: {company.email}
      </p>
    </div>
  );
};

export default ContactInfo;

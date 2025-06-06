import React, { useState } from "react";
import VNPayImg from "../../assets/Img/vnpay.png";
import OFFICEImg from "../../assets/Img/payoffice.png";
import { FaBuilding } from "react-icons/fa";

const paymentOptions = [
  {
    id: "OFFICE",
    label: "Thanh toán tại văn phòng",

    img: OFFICEImg,
  },
  {
    id: "VNPAY",
    label: "Thanh toán bằng VNPay",
    img: VNPayImg,
  },
  // Bạn có thể thêm các phương thức khác như Momo ở đây
];

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  const [selected, setSelected] = useState(paymentMethod || "");

  const handleSelect = (method) => {
    setSelected(method);
    setPaymentMethod(method);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#00c0d1]">
        Phương thức thanh toán
      </h2>
      <div className="flex flex-col mt-3 space-y-4 cursor-pointer">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`border border-gray-200 h-[60px] rounded-lg flex items-center px-4 ${
              selected === option.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelect(option.id)}
          >
            <input
              type="radio"
              name="payment"
              checked={selected === option.id}
              onChange={() => handleSelect(option.id)}
              className="w-4 h-4 mr-3"
            />
            {option.icon ? (
              option.icon
            ) : (
              <img
                src={option.img}
                alt={option.label}
                className="object-cover w-8 h-8 rounded-lg"
              />
            )}
            <span className="ml-3 text-xl font-medium">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;

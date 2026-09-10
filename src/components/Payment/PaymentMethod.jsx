import React from "react";
import VNPayImg from "../../assets/Img/vnpay.png";
import OFFICEImg from "../../assets/Img/payoffice.png";

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
];

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  const handleSelect = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#00c0d1]">
        Phương thức thanh toán
      </h2>
      <div
        role="radiogroup"
        aria-label="Phương thức thanh toán"
        className="flex flex-col mt-3 space-y-4"
      >
        {paymentOptions.map((option) => {
          const isSelected = paymentMethod === option.id;
          return (
            <label
              key={option.id}
              htmlFor={`payment-${option.id}`}
              className={`border h-[60px] rounded-lg flex items-center px-4 cursor-pointer transition-colors bg-white dark:bg-slate-900 hover:border-[#00c0d1]/60 ${
                isSelected
                  ? "border-[#00c0d1] ring-2 ring-[#00c0d1]"
                  : "border-gray-200 dark:border-slate-700"
              }`}
            >
              <input
                id={`payment-${option.id}`}
                type="radio"
                name="payment"
                value={option.id}
                checked={isSelected}
                onChange={() => handleSelect(option.id)}
                className="w-4 h-4 mr-3 accent-[#00c0d1]"
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
              <span className="ml-3 text-xl font-medium text-slate-900 dark:text-slate-100">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;

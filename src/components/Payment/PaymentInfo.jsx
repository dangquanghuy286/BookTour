import React, { useState } from "react";

const PaymentInfo = (props) => {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    specialRequests,
    setSpecialRequests,
  } = props;

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validators = {
    fullName: (v) => (!v?.trim() ? "Vui lòng nhập họ và tên" : ""),
    email: (v) => {
      if (!v?.trim()) return "Vui lòng nhập email";
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(v) ? "" : "Email không hợp lệ";
    },
    phone: (v) => {
      if (!v?.trim()) return "Vui lòng nhập số điện thoại";
      const re = /^(0|\+84)[0-9]{9,10}$/;
      return re.test(v.replace(/\s/g, "")) ? "" : "Số điện thoại không hợp lệ";
    },
    address: (v) => (!v?.trim() ? "Vui lòng nhập địa chỉ" : ""),
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validate = validators[field];
    if (validate) {
      setErrors((prev) => ({ ...prev, [field]: validate(value) }));
    }
  };

  const fields = [
    {
      name: "fullName",
      label: "Họ và tên",
      required: true,
      type: "text",
      value: fullName,
      onChange: setFullName,
      placeholder: "Nhập họ và tên",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      type: "email",
      value: email,
      onChange: setEmail,
      placeholder: "Nhập email",
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Số điện thoại",
      required: true,
      type: "tel",
      value: phone,
      onChange: setPhone,
      placeholder: "Nhập số điện thoại",
      autoComplete: "tel",
      inputMode: "tel",
    },
    {
      name: "address",
      label: "Địa chỉ",
      required: true,
      type: "text",
      value: address,
      onChange: setAddress,
      placeholder: "Nhập địa chỉ",
      autoComplete: "street-address",
    },
  ];

  const inputBase =
    "rounded-md p-2 w-full border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00c0d1] transition-colors";

  const getBorderClass = (name) =>
    touched[name] && errors[name]
      ? "border-red-500"
      : "border-gray-300 dark:border-slate-700";

  return (
    <div className="pt-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#00c0d1]">
          Thông tin thanh toán
        </h2>
        <div className="w-full bg-white dark:bg-slate-950 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <div className="flex items-center mb-1">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-slate-900 dark:text-slate-100"
                  >
                    {field.label}
                  </label>
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  inputMode={field.inputMode}
                  autoComplete={field.autoComplete}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={(e) => handleBlur(field.name, e.target.value)}
                  aria-invalid={Boolean(touched[field.name] && errors[field.name])}
                  aria-describedby={
                    errors[field.name] ? `${field.name}-error` : undefined
                  }
                  className={`${inputBase} ${getBorderClass(field.name)}`}
                  placeholder={field.placeholder}
                />
                {touched[field.name] && errors[field.name] && (
                  <p
                    id={`${field.name}-error`}
                    className="mt-1 text-xs text-red-500"
                  >
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-1">
                <label
                  htmlFor="specialRequests"
                  className="block text-sm font-medium text-slate-900 dark:text-slate-100"
                >
                  Yêu cầu đặc biệt
                </label>
                <span className="ml-1 text-xs text-slate-400">(không bắt buộc)</span>
              </div>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className={`${inputBase} border-gray-300 dark:border-slate-700`}
                placeholder="Nhập yêu cầu đặc biệt (nếu có)"
                rows="4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
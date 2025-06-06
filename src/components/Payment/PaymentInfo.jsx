import React from "react";

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
  return (
    <div className="pt-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#00c0d1]">
          Thông tin thanh toán
        </h2>
        <div className="w-full bg-white dark:bg-slate-950 p-6 ">
          <form action="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-1">
                  <label className="block text-sm font-medium">Họ và tên</label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <label className="block text-sm font-medium">Email</label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <label className="block text-sm font-medium">
                    Số điện thoại
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <label className="block text-sm font-medium">Địa chỉ</label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Nhập địa chỉ"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-1">
                  <label className="block text-sm font-medium">
                    Yêu cầu đặc biệt
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Nhập yêu cầu đặc biệt (nếu có)"
                  rows="4"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;

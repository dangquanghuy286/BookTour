import React from "react";
import { Link } from "react-router-dom";
const PaymentCheckbox = (props) => {
  const { agreed, setAgreed } = props;
  return (
    <div className="pt-4 ">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#00c0d1]">
          Điều khoản và điều kiện
        </h2>
        <div className=" p-4 w-full  ">
          <p className="text-lg text-gray-700  dark:text-white tmb-4">
            Bằng cách nhấp chuột vào nút <b>ĐỒNG Ý</b> dưới đây, Khách hàng đồng
            ý rằng các Điều kiện điều khoản này sẽ được áp dụng. Vui lòng đọc kỹ
            Điều kiện điều khoản trước khi lựa chọn sử dụng dịch vụ của GoViet
            Tours.
          </p>
          <div className="flex items-center  gap-2 mt-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mr-2"
            />
            <p>
              Tôi đã đọc và đồng ý với{" "}
              <Link to="/termsofservice">
                <span className="text-[#00c0d1] hover:underline">
                  Điều khoản và điều kiện
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckbox;

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
          <p className="text-lg text-gray-700 dark:text-white mb-4">
            Bằng cách nhấp <b>ĐỒNG Ý</b>, Khách hàng xác nhận đã đọc và đồng ý
            với các Điều khoản của GoViet Tour. Nếu không đồng ý, vui lòng không
            sử dụng dịch vụ.
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

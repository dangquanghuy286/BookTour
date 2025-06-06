import React from "react";
import icons from "../../utils/icons";
const { FaPlus, FaMinus } = icons;
const PaymentQuality = (props) => {
  const { countAdults, setCountAdults, countChildren, setCountChildren } =
    props;

  return (
    <div className="pt-4 ">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#00c0d1]">
          Số lượng khách hàng
        </h2>
        <div className="w-full bg-white dark:bg-slate-950 p-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Người lớn */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Số lượng người lớn
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full max-w-[200px]">
                <button
                  onClick={() =>
                    setCountAdults(countAdults > 0 ? countAdults - 1 : 0)
                  }
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  value={countAdults}
                  onChange={(e) => setCountAdults(Number(e.target.value))}
                  className="w-full h-10 text-center focus:outline-none border-x border-gray-300"
                  disabled
                />
                <button
                  onClick={() => setCountAdults(countAdults + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Trẻ em */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Số lượng trẻ em
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full max-w-[200px]">
                <button
                  onClick={() =>
                    setCountChildren(countChildren > 0 ? countChildren - 1 : 0)
                  }
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  value={countChildren}
                  onChange={(e) => setCountChildren(Number(e.target.value))}
                  className="w-full h-10 text-center focus:outline-none border-x border-gray-300"
                  disabled
                />
                <button
                  onClick={() => setCountChildren(countChildren + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentQuality;

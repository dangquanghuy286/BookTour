import React from "react";
import icons from "../../utils/icons";
const { FaPlus, FaMinus } = icons;

const Counter = ({ label, value, onChange, min = 0, max = 20 }) => {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-md overflow-hidden w-full max-w-[200px]">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= min}
          aria-label={`Giảm ${label.toLowerCase()}`}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 dark:text-white"
        >
          <FaMinus />
        </button>
        <input
          type="number"
          value={value}
          readOnly
          aria-label={label}
          className="w-full h-10 text-center focus:outline-none border-x border-gray-300 dark:border-slate-700 bg-transparent text-gray-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={increase}
          disabled={value >= max}
          aria-label={`Tăng ${label.toLowerCase()}`}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 dark:text-white"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

const PaymentQuality = (props) => {
  const { countAdults, setCountAdults, countChildren, setCountChildren } =
    props;

  return (
    <div className="pt-4">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#00c0d1]">
          Số lượng khách hàng
        </h2>
        <div className="w-full bg-white dark:bg-slate-950 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Counter
              label="Số lượng người lớn"
              value={countAdults}
              onChange={setCountAdults}
              min={1}
              max={20}
            />
            <Counter
              label="Số lượng trẻ em"
              value={countChildren}
              onChange={setCountChildren}
              min={0}
              max={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentQuality;

import { useState } from "react";
import icons from "../../utils/icons";
const { FaEye, FaEyeSlash, RiLockPasswordFill } = icons;

function InputPassword({
  name,
  value,
  onChange,
  placeholder = "Mật khẩu",
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute left-3 top-0 h-12 flex items-center">
        <RiLockPasswordFill className="text-xl text-[#019fb5]" />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-12 w-full rounded-2xl border-2 bg-transparent px-12 text-lg dark:text-white text-black border-[#00c0d1] placeholder-[#00c0d1] focus:outline-none ${
          error ? "border-red-500" : ""
        }`}
      />
      <div className="absolute right-4 top-0 h-12 flex items-center">
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-xl text-[#019fb5] focus:outline-none"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

export default InputPassword;

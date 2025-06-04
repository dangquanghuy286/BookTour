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
      <RiLockPasswordFill className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-[#019fb5]" />
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
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#019fb5] focus:outline-none"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

export default InputPassword;

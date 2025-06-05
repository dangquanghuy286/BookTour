import { useContext, useRef, useState } from "react";
import Menu from "./Menu";
import { StoreContext } from "../../contexts/storeUser";

function Avatar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { userInfo } = useContext(StoreContext);

  const defaultavt =
    "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png";
  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-amber-400 bg-slate-50 dark:bg-slate-950"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={userInfo?.data.avatar_path || defaultavt}
            alt="Ảnh đại diện người dùng"
            className="h-full w-full object-cover"
          />
        </button>
        <Menu dropdownOpen={dropdownOpen} />
      </div>
    </>
  );
}
export default Avatar;

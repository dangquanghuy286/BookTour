import { NavLink } from "react-router-dom";
import Logo from "../../assets/Img/Logo1.png";
import DarkMode from "../DarkMode";

function Header() {
  const getNavLinkClass = ({ isActive }) =>
    `text-black dark:text-white no-underline relative block px-2 py-1 whitespace-nowrap ${
      isActive ? "text-[#00c0d1] dark:text-[#00c0d1]" : ""
    } before:absolute before:left-0 before:top-full before:w-0 before:h-[2px] before:bg-[#00c0d1] before:transition-all before:duration-500 hover:before:w-full`;

  return (
    <header className="w-full flex justify-between items-center px-[140px] py-[15px] mb-[10px] font-medium sticky top-0 z-[999] shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-900">
      <div className="w-[155px]">
        <NavLink to="/">
          <img
            src={Logo}
            alt="LoGo"
            className="w-full h-auto max-h-[60px] object-contain"
          />
        </NavLink>
      </div>
      <div>
        <ul className="flex gap-6 list-none m-0 p-0">
          <li className="relative group">
            <NavLink to="/" className={getNavLinkClass}>
              Trang Chủ
            </NavLink>
          </li>
          <li className="relative group">
            <NavLink to="/intro" className={getNavLinkClass}>
              Giới thiệu
            </NavLink>
          </li>
          <li className="relative group">
            <NavLink to="/tour" className={getNavLinkClass}>
              Tour
            </NavLink>
            <ul className="absolute top-full left-0 bg-white dark:bg-slate-900 shadow-md min-w-[150px] flex-col hidden group-hover:flex z-50">
              <li>
                <NavLink
                  to="/tour/feature_tours"
                  className="block px-4 py-2 text-black dark:text-white text-left hover:text-[#00c0d1] dark:hover:text-[#00c0d1]"
                >
                  Tour Nổi Bật
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tour/lastest_tours"
                  className="block px-4 py-2 text-black dark:text-white text-left hover:text-[#00c0d1] dark:hover:text-[#00c0d1]"
                >
                  Tour Mới Nhất
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <NavLink to="/destination" className={getNavLinkClass}>
              Điểm đến
            </NavLink>
          </li>
          <li className="relative group">
            <NavLink to="/contact" className={getNavLinkClass}>
              Liên Hệ
            </NavLink>
          </li>
          <li className="relative group">
            <NavLink to="/blog" className={getNavLinkClass}>
              Blog
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <DarkMode />
      </div>
    </header>
  );
}

export default Header;

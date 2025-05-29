import { NavLink } from "react-router-dom";
import Logo from "../../assets/Img/Logo1.png";
import DarkMode from "../DarkMode";
import { useState } from "react";
import icons from "../../utils/icons";
import Search from "../Search";
import Avatar from "../Avatar";
const { FiMenu, FiX } = icons;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `text-black dark:text-white no-underline relative block px-3 py-1 whitespace-nowrap ${
      isActive ? "text-[#00c0d1] dark:text-[#00c0d1]" : ""
    } before:absolute before:left-0 before:top-full before:w-0 before:h-[2px] before:bg-[#00c0d1] before:transition-all before:duration-500 hover:before:w-full`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full flex flex-wrap items-center justify-between px-4 sm:px-8 md:px-16 lg:px-[140px] py-[15px]  font-medium sticky top-0 z-[999] shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-900">
      {/* Logo */}
      <div className="w-[140px] sm:w-[180px] md:w-[200px]">
        <NavLink to="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-full h-auto max-h-[70px] sm:max-h-[80px] object-contain"
          />
        </NavLink>
      </div>

      {/* Hamburger Button */}
      <button
        className="lg:hidden text-2xl text-black dark:text-white"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row absolute lg:static top-full left-0 w-full lg:w-auto bg-white dark:bg-slate-900 lg:bg-transparent lg:dark:bg-transparent shadow-md lg:shadow-none z-50`}
      >
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-0">
          <li>
            <NavLink to="/" className={getNavLinkClass} onClick={toggleMenu}>
              Trang Chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/intro"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Giới thiệu
            </NavLink>
          </li>
          <li className="relative group">
            <NavLink
              to="/tour"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Tour
            </NavLink>
            <ul className="lg:absolute lg:top-full lg:left-0 bg-white dark:bg-slate-900 shadow-md min-w-[180px] flex-col hidden group-hover:flex z-50">
              <li>
                <NavLink
                  to="/tour/feature_tours"
                  className="block px-4 py-2 text-black dark:text-white hover:text-[#00c0d1] dark:hover:text-[#00c0d1]"
                  onClick={toggleMenu}
                >
                  Tour Nổi Bật
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tour/latest_tours"
                  className="block px-4 py-2 text-black dark:text-white hover:text-[#00c0d1] dark:hover:text-[#00c0d1]"
                  onClick={toggleMenu}
                >
                  Tour Mới Nhất
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/destination"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Điểm đến
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Liên Hệ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Blog
            </NavLink>
          </li>

          {/* Mobile: DarkMode */}
          <li className="lg:hidden flex justify-between">
            <DarkMode />
            <Search />
          </li>
          <li className="lg:hidden  flex justify-end">
            <Avatar />
          </li>
        </ul>
      </div>

      {/* Desktop: Search + DarkMode */}
      <div className="hidden lg:flex items-center gap-4">
        <Search />
        <DarkMode />
        <Avatar />
      </div>
    </header>
  );
}

export default Header;

import { NavLink } from "react-router-dom";
import Logo from "../../assets/Img/Logo1.png";
import DarkMode from "../DarkMode";
import { useState } from "react";
import icons from "../../utils/icons";
import Search from "../Search";
import Avatar from "../Avatar";
const { FiMenu, FiX, FiChevronDown } = icons;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `text-black dark:text-white no-underline relative block px-2 xs:px-3 py-1 whitespace-nowrap text-sm sm:text-base ${
      isActive ? "text-[#00c0d1] dark:text-[#00c0d1]" : ""
    } before:absolute before:left-0 before:top-full before:w-0 before:h-[2px] before:bg-[#00c0d1] before:transition-all before:duration-500 hover:before:w-full transition-colors duration-300`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full flex flex-wrap items-center justify-between px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[140px] py-2 xs:py-3 sm:py-4 md:py-[15px] font-medium sticky top-0 z-[999] shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-900 transition-all duration-300">
      {/* Logo */}
      <div className="w-[100px] xs:w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px] flex-shrink-0">
        <NavLink to="/" className="block">
          <img
            src={Logo}
            alt="Logo"
            className="w-full h-auto max-h-[40px] xs:max-h-[50px] sm:max-h-[60px] md:max-h-[70px] lg:max-h-[80px] object-contain transition-all duration-300"
          />
        </NavLink>
      </div>

      {/* Hamburger Button */}
      <button
        className="xl:hidden text-xl xs:text-2xl text-black dark:text-white p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00c0d1] focus:ring-opacity-50"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Menu Overlay for Mobile */}
      {isMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
          aria-hidden="false"
        ></div>
      )}

      {/* Menu */}
      <nav
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } xl:flex flex-col xl:flex-row fixed xl:static top-0 xl:top-auto right-0 xl:right-auto h-full xl:h-auto w-[280px] xs:w-[320px] sm:w-[350px] md:w-[380px] lg:w-[400px] xl:w-auto bg-white dark:bg-slate-900 xl:bg-transparent xl:dark:bg-transparent shadow-2xl xl:shadow-none z-50 overflow-y-auto xl:overflow-visible transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full xl:translate-x-0"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Mobile Menu Header */}
        <div className="xl:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <span className="text-lg font-semibold text-black dark:text-white">
            Menu
          </span>
          <button
            onClick={toggleMenu}
            className="text-2xl text-black dark:text-white p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-all duration-300"
            aria-label="Đóng menu"
          >
            <FiX />
          </button>
        </div>

        <ul className="flex flex-col xl:flex-row gap-2 xs:gap-3 sm:gap-4 lg:gap-6 xl:gap-8 p-4 xl:p-0">
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

          {/* Tour Dropdown */}
          <li className="relative group">
            <NavLink className={getNavLinkClass} onClick={toggleMenu}>
              <span className="flex items-center gap-1">
                Tour
                <FiChevronDown className="text-sm sm:text-lg transition-transform duration-300 group-hover:rotate-180" />
              </span>
            </NavLink>

            {/* Dropdown Menu */}
            <ul className="xl:absolute xl:top-full xl:left-0 bg-white dark:bg-slate-900 xl:shadow-lg xl:rounded-md xl:border xl:border-gray-200 xl:dark:border-slate-700 min-w-[180px] sm:min-w-[200px] flex-col hidden group-hover:flex z-50 xl:mt-[2px] ml-4 xl:ml-0 mt-2 ">
              <li>
                <NavLink
                  to="/tour/getalltour"
                  className="block px-3 sm:px-4 py-2 text-sm sm:text-base text-black dark:text-white hover:text-[#00c0d1] dark:hover:text-[#00c0d1] hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 xl:first:rounded-t-md xl:last:rounded-b-md"
                  onClick={toggleMenu}
                >
                  Tất Cả Tour
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tour/feature_tours"
                  className="block px-3 sm:px-4 py-2 text-sm sm:text-base text-black dark:text-white hover:text-[#00c0d1] dark:hover:text-[#00c0d1] hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 xl:first:rounded-t-md xl:last:rounded-b-md"
                  onClick={toggleMenu}
                >
                  Tour Nổi Bật
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tour/latest_tours"
                  className="block px-3 sm:px-4 py-2 text-sm sm:text-base text-black dark:text-white hover:text-[#00c0d1] dark:hover:text-[#00c0d1] hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 xl:first:rounded-t-md xl:last:rounded-b-md"
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

          {/* Mobile: Utilities */}
          <li className="xl:hidden pt-4 border-t border-gray-200 dark:border-slate-700 mt-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Chế độ
                </span>
                <div className="flex items-center gap-3">
                  <DarkMode />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Tài khoản
                </span>
                <Avatar />
              </div>
            </div>
          </li>
        </ul>
      </nav>

      {/* Desktop: Utilities */}
      <div className="hidden xl:flex items-center gap-3 2xl:gap-4 flex-shrink-0">
        <Search />
        <DarkMode />
        <Avatar />
      </div>
    </header>
  );
}

export default Header;

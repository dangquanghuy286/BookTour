import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
const { CiSearch } = icons;

// Component Search với chức năng debounce
function Search() {
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm hiện tại
  const [debouncedTerm, setDebouncedTerm] = useState(""); // Từ khóa sau khi debounce

  const navigate = useNavigate();

  // Debounce effect - cập nhật debouncedTerm sau khi delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); // Delay 300ms

    // Hàm cleanup để xóa timer khi searchTerm thay đổi
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Effect để xử lý tìm kiếm khi debouncedTerm thay đổi
  useEffect(() => {
    if (debouncedTerm.trim() && debouncedTerm !== "") {
      // Chỉ điều hướng khi thực sự có từ khóa tìm kiếm
      navigate(`/tourSearch?title=${encodeURIComponent(debouncedTerm)}`);
    }
  }, [debouncedTerm, navigate]);

  // Hàm xử lý khi người dùng submit form tìm kiếm (for manual search)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tourSearch?title=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  // // Phương án khác: Sử dụng useCallback để tối ưu hiệu suất
  // const debouncedSearch = useCallback(
  //   (term) => {
  //     const timer = setTimeout(() => {
  //       if (term.trim()) {
  //         navigate(`/tourSearch?title=${encodeURIComponent(term)}`);
  //       }
  //     }, 300);

  //     return () => clearTimeout(timer);
  //   },
  //   [navigate]
  // );

  // Giao diện form tìm kiếm
  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center justify-center rounded-[5px] px-[10px] cursor-pointer hover:bg-black/5 group transition-all duration-500"
    >
      <input
        type="text"
        placeholder="Tìm kiếm theo tên tour"
        className="h-[48px] w-[48px] max-w-full rounded-full dark:bg-slate-900 border border-amber-400 dark:text-amber-50 text-black pl-[15px] text-center outline-none transition-all duration-500 ease-in-out group-hover:w-[222px] group-hover:text-left focus:w-[222px] focus:text-left placeholder:text-[#aaa9a9] placeholder:opacity-0 group-hover:placeholder:opacity-80 focus:placeholder:opacity-80"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        type="submit"
        className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] dark:text-amber-50 text-gray-500"
      >
        <CiSearch />
      </button>
    </form>
  );
}

export default Search;

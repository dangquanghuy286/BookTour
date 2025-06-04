import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
const { CiSearch } = icons;

// Component Search
function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Hàm xử lý khi người dùng submit form tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload trang
    if (searchTerm.trim()) {
      // Nếu ô tìm kiếm không rỗng, điều hướng đến trang kết quả với từ khóa truyền vào URL
      // Hàm JavaScript giúp mã hóa an toàn giá trị searchTerm khi đưa vào URL.
      navigate(`/tourSearch?title=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Giao diện form tìm kiếm
  return (
    <form
      onSubmit={handleSearch} // Gắn hàm xử lý khi submit form
      className="relative flex items-center justify-center rounded-[5px] px-[10px] cursor-pointer hover:bg-black/5 group transition-all duration-500"
    >
      <input
        type="text"
        placeholder="Tìm kiếm theo tên tour"
        className="h-[48px] w-[48px] max-w-full rounded-full dark:bg-slate-900 border border-amber-400 dark:text-amber-50 text-black pl-[15px] text-center outline-none transition-all duration-500 ease-in-out group-hover:w-[222px] group-hover:text-left focus:w-[222px] focus:text-left placeholder:text-[#aaa9a9] placeholder:opacity-0 group-hover:placeholder:opacity-80 focus:placeholder:opacity-80"
        value={searchTerm} // Gán giá trị từ state vào input
        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật state khi người dùng nhập
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

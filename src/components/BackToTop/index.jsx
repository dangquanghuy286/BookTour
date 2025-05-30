import React, { useState, useEffect } from "react";

const BackToTop = () => {
  // State để kiểm soát hiển thị nút "Back to top"
  const [isVisible, setIsVisible] = useState(false);

  // Hàm kiểm tra vị trí cuộn trang, nếu > 300px thì hiển thị nút
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true); // Hiển thị nút
    } else {
      setIsVisible(false); // Ẩn nút
    }
  };

  // Hàm cuộn trang lên đầu trang một cách mượt mà
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Vị trí scroll về trên cùng trang
      behavior: "smooth", // Cuộn mượt mà, không nhảy đột ngột
    });
  };

  // Thêm sự kiện lắng nghe scroll khi component được mount
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility); // Lắng nghe sự kiện scroll

    // Cleanup: khi component unmount, remove listener tránh rò rỉ bộ nhớ
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []); // Chỉ chạy 1 lần khi component mount

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Nếu isVisible = true thì hiển thị nút */}
      {isVisible && (
        <button
          onClick={scrollToTop} // Bấm nút sẽ gọi hàm scrollToTop
          className="p-3 bg-[#00c0d1] text-white rounded-full shadow-lg hover:bg-[#0090a0] transition duration-300 focus:outline-none"
          aria-label="Back to top" // Hỗ trợ truy cập cho screen readers
        >
          {/* Icon mũi tên lên */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round" // Bo góc nét vẽ
              strokeLinejoin="round" // Góc nét nối mềm mại
              strokeWidth={2} // Độ dày nét vẽ
              d="M5 10l7-7m0 0l7 7m-7-7v18" // Đường đi nét vẽ icon mũi tên lên
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BackToTop;

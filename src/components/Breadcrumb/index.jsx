import { useLocation, Link } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  // Không hiển thị breadcrumb ở trang chủ
  if (location.pathname === "/") return null;

  // Chuyển path thành mảng các phần tử
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Hàm chuyển đổi tên hiển thị từ slug
  const formatDisplayName = (name) => {
    const nameMap = {
      tour: "Danh mục",
      feature_tours: "Tour Nổi Bật",
      latest_tours: "Tour Mới Nhất",
      destination: "Điểm đến",
      contact: "Liên Hệ",
      blog: "Blog",
      intro: "Giới Thiệu",
      aboutus: "Về Chúng Tôi",
      privacy: "Chính Sách Bảo Mật Thông Tin Khách Hàng",
      cancellation: "Chính Sách Hủy Tour Và Hoàn Tiền",
      termsofservice: "Điều Khoản & Dịch Vụ",
      getalltour: "Tất Cả Tour",
      tourSearch: "Tìm Kiếm",
      login: "Đăng Nhập",
      register: "Đăng Ký",
      user: "Thông Tin Cá Nhân",
      changepassword: "Thay Đổi Mật Khẩu",
      sendEmail: "Tìm Email",
      changePasswordCode: "Đặt Lại Mật Khẩu Mới",
      tourBooked: "Tour Đã Đặt",
    };

    if (nameMap[name]) return nameMap[name];

    return name
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Tạo danh sách breadcrumb
  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    return {
      routeTo,
      displayName: formatDisplayName(name),
      isLast,
    };
  });

  return (
    <nav
      className="py-3 px-4 sm:px-8 md:px-16 lg:px-[140px] bg-gray-100 dark:bg-slate-800 text-sm"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap gap-2" role="list">
        <li>
          <Link
            to="/"
            className="text-black dark:text-white hover:text-[#00c0d1] dark:hover:text-[#00c0d1] font-medium"
          >
            Trang chủ
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2" role="listitem">
            <span className="text-gray-500 dark:text-gray-400">›</span>
            {item.isLast ? (
              <span className="text-gray-500 dark:text-gray-400">
                {item.displayName}
              </span>
            ) : (
              <Link
                to={item.routeTo}
                className="text-black dark:text-white hover:text-[#00c0d1] dark:hover:text-[#00c0d1] font-medium"
              >
                {item.displayName}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;

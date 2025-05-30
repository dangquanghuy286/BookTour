import { useEffect, useState } from "react";
import BlogCard from "../../components/Blogs";
import LoadingSpinner from "../../components/LoadingSniper";
import ErrorMessage from "../../components/ErrorMessage";
import EntriesFilter from "../../components/Pagination"; // Thêm EntriesFilter
import { getBlog } from "../../services/BlogService";

function Blog({ blogs = null, showPagination = true }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const limit = 8; // Số blog mỗi trang

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        setError(null);

        if (blogs) {
          // Nếu có prop blogs (dữ liệu tĩnh)
          const mappedBlogs = blogs.map((blog) => ({
            ...blog,
            id: blog.blogId || blog.id, // Ánh xạ blogId thành id
          }));
          setData(mappedBlogs);
          setTotalPages(1); // Không cần phân trang cho dữ liệu tĩnh
        } else {
          // Gọi API để lấy dữ liệu
          const res = await getBlog(currentPage, limit);

          if (res.status !== 200) {
            throw new Error(res.data?.error || "Lỗi không xác định");
          }

          if (res.data && Array.isArray(res.data.blogs)) {
            const mappedBlogs = res.data.blogs.map((blog) => ({
              ...blog,
              id: blog.blogId || blog.id, // Ánh xạ blogId thành id
            }));
            setData(mappedBlogs);
            setTotalPages(res.data.totalPages || 0);
          } else {
            setError("Không có dữ liệu blog.");
            setData([]);
            setTotalPages(0);
          }
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách blog:", err);
        setError(err.message || "Có lỗi xảy ra khi tải bài viết.");
        setData([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [blogs, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-12 px-5 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {" "}
        {/* Tăng từ max-w-6xl lên max-w-7xl */}
        <h1 className="tour_tittle py-2 pl-3 my-6 sm:my-8 text-2xl sm:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]">
          Bài viết mới nhất
        </h1>
        {loading ? (
          <LoadingSpinner message="Đang tải danh sách bài viết..." />
        ) : error ? (
          <ErrorMessage isWarning={false} message={error} />
        ) : data.length === 0 ? (
          <ErrorMessage
            isWarning={true}
            message="Chưa có bài viết nào được đăng."
          />
        ) : (
          // Điều chỉnh grid để có ít cột hơn, card sẽ rộng hơn
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {" "}
            {data.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
        {showPagination && !blogs && totalPages > 1 && (
          <EntriesFilter
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default Blog;

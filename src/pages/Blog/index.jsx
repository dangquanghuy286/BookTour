// components/Blog/Blog.jsx
import { useEffect, useState } from "react";
import { getBlog } from "../../services/BlogService";
import BlogCard from "../../components/Blogs";
import LoadingSpinner from "../../components/LoadingSniper";
import ErrorMessage from "../../components/ErrorMessage";

function Blog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getBlog();

        if (res && res.data) {
          setData(res.data);
        } else {
          setError("Không có dữ liệu blog");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Không thể tải dữ liệu blog. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="py-12 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Bài viết mới nhất
          </h2>
          <LoadingSpinner message="Đang tải bài viết..." />
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="py-12 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Bài viết mới nhất
          </h2>
          <ErrorMessage error={error} />
        </div>
      </div>
    );
  }

  // Render empty state
  if (!data || data.length === 0) {
    return (
      <div className="py-12 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Bài viết mới nhất
          </h2>
          <div className="text-gray-500 dark:text-gray-400">
            Chưa có bài viết nào được đăng.
          </div>
        </div>
      </div>
    );
  }

  // Render success state with data
  return (
    <div className="py-12 px-5 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
          Bài viết mới nhất
        </h2>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((blog) => (
            <BlogCard key={blog.blogId} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;

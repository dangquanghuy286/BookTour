import { useEffect, useState } from "react";
import { getBlog } from "../../services/BlogService";
import BlogCard from "../../components/Blogs";
import LoadingSpinner from "../../components/LoadingSniper";
import ErrorMessage from "../../components/ErrorMessage";

function Blog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getBlog();

      if (res && res.data && Array.isArray(res.data.blogs)) {
        setData(res.data.blogs);
      } else {
        setError("Không có dữ liệu blog");
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Có lỗi xảy ra");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="py-12 px-5 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8 text-center">
          Bài viết mới nhất
        </h2>

        {loading ? (
          <LoadingSpinner message="Đang tải danh sách bài viết..." />
        ) : error ? (
          <div className="text-left p-0 m-0">
            <ErrorMessage isWarning={false} />
          </div>
        ) : data.length === 0 ? (
          <div className="text-left p-0 m-0">
            <ErrorMessage isWarning={true} />
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((blog) => (
              <BlogCard key={blog.blogId} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;

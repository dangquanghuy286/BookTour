import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../services/BlogService";
import LoadingSpinner from "../LoadingSniper";
import ErrorMessage from "../ErrorMessage";
import GoBack from "../GoBack/Goback";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const res = await getBlogById(id);
      if (res.status === 200) {
        setBlog(res.data);
      } else {
        setError(res.data?.error || "Không tìm thấy bài viết.");
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) return <LoadingSpinner message="Đang tải bài viết..." />;
  if (error) return <ErrorMessage isWarning={false} message={error} />;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-6 sm:py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content card */}
        <article className="bg-white dark:bg-slate-950 rounded-xl border border-gray-200  shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,_rgba(0,0,0,0.08)_0px_0px_0px_1px] overflow-hidden">
          {/* Header section */}
          <div className="p-6 sm:p-8 lg:p-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#00c0d1] leading-tight">
              {blog.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <span className="text-lg">✍</span>
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="hidden sm:block text-gray-300 dark:text-gray-600">
                |
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>

            {/* Featured image */}
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <img
                src={
                  blog.image ||
                  "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
                }
                alt={blog.title}
                className="rounded-lg w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover shadow-[rgba(0,0,0,0.16)_0px_1px_4px] transition-transform duration-300 "
              />
            </div>
          </div>

          {/* Content section */}
          <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
            <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {blog.content?.split("\n").map(
                  (paragraph, index) =>
                    paragraph.trim() && (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    )
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Back button */}
        <div className="mt-8 text-center">
          <GoBack />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

// components/Blog/Blog.jsx
import { useEffect, useState } from "react";

import { getBlog } from "../../services/BlogService";
import BlogCard from "../../components/Blogs";

function Blog() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getBlog();

      setData(res.data);
    };
    fetchApi();
  }, []);

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

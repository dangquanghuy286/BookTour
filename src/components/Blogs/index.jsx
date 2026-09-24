import React from "react";
import { Link } from "react-router-dom";
import icons from "../../utils/icons";
const { MdFavorite, FaCalendarAlt } = icons;

const BlogCard = ({ blog, size = "default", left = false }) => {
  // Format the createdAt date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Size classes - Loại bỏ max-width để card có thể rộng theo grid
  const sizeClasses =
    size === "small"
      ? "w-full max-w-sm"
      : size === "large"
        ? "w-full"
        : "w-full";

  return (
    <div
      className={`p-6 dark:bg-slate-950 transition-all duration-500 shadow-[rgba(0,0,0,0.16)_0px_1px_4px]
        cursor-pointer rounded-3xl border border-gray-300  flex flex-col h-full 
       ${sizeClasses} ${left ? "sm:ml-4" : ""}`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <Link to={`/blogs/${blog.id}`}>
          <img
            src={
              blog.image ||
              "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
            }
            alt={blog.title}
            className="mx-auto h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex-grow p-4 mt-4 space-y-4">
        <Link
          to={`/blogs/${blog.id}`}
          onClick={() => window.scrollTo(0, 0)}
          className="text-xl font-bold text-left hover:underline line-clamp-2 text-[#00c0d1] 
                   hover:text-[#00a8b8] transition-colors duration-300"
        >
          {blog.title}
        </Link>
        <div className="flex items-center justify-between gap-2 text-sm text-gray-500 opacity-70 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <MdFavorite className="shrink-0 text-base" />
            <span>{blog.author}</span>
          </span>

          <span aria-hidden="true">|</span>

          <span className="flex items-center gap-1.5">
            <FaCalendarAlt className="shrink-0 text-sm" />
            <span>{formattedDate}</span>
          </span>
        </div>
        <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;

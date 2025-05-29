function BlogCard({ blog }) {
  return (
    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="p-4 text-left">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-white mb-2">
          📅 <span>{blog.createdAt?.slice(0, 10)}</span>
        </p>
        <p className="text-base text-gray-700 dark:text-white mb-3">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
export default BlogCard;

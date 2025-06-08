import React from "react";
import icons from "../../utils/icons";
const { FaEllipsisV, FaUserAlt } = icons;
const ReviewMenu = ({
  index,
  openMenuIndex,
  toggleMenu,
  handleEdit,
  handleDelete,
  isLoading,
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => toggleMenu(index)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none"
        disabled={isLoading}
      >
        <FaEllipsisV className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
      </button>
      {openMenuIndex === index && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-lg z-10">
          <button
            onClick={handleEdit}
            className="block w-full text-left px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700"
            disabled={isLoading}
          >
            Chỉnh sửa
          </button>
          <button
            onClick={handleDelete}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
            disabled={isLoading}
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewMenu;

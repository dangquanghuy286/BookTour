import React from "react";

const ReviewModal = ({
  isModalOpen,
  closeModal,
  formData,
  setFormData,
  handleSubmit,
  isLoading,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Chỉnh sửa đánh giá
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nội dung đánh giá
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:text-gray-100 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows="4"
                  maxLength="500"
                  placeholder="Nhập nội dung đánh giá..."
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.comment.length}/500 ký tự
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Đánh giá (số sao)
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 dark:bg-slate-700 dark:text-gray-100 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} sao
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00c0d1] text-white rounded-md hover:bg-[#009bb5] disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;

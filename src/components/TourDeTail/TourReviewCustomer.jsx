import React, { useState } from "react";
import Img from "../../assets/Img/dauphay.webp";
import Swal from "sweetalert2";
import { deleteReview, putDataReview } from "../../services/ReviewService";
import LoadingSpinner from "../LoadingSniper";
import ReviewModal from "../Models/ReviewModal";
import ReviewItem from "../Reviews/ReviewItem";

const TourReviewCustomer = ({ tour }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [formData, setFormData] = useState({
    tour_id: tour?.id || "",
    user_id: parseInt(localStorage.getItem("user_id"), 10) || "",
    comment: "",
    rating: 5,
  });
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = parseInt(localStorage.getItem("user_id"), 10) || null;

  /**
   * Đóng / mở menu thao tác của review
   */
  const toggleMenu = (index) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  /**
   * Mở modal chỉnh sửa review
   */
  const handleEdit = (review) => {
    if (!review?.review_id) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không tìm thấy ID đánh giá!",
        confirmButtonText: "OK",
      });
      return;
    }

    setCurrentReview(review);

    setFormData({
      tour_id: tour?.id || "",
      user_id: userInfo || "",
      comment: review?.comment || "",
      rating: review?.rating || 5,
    });

    setIsModalOpen(true);
    setOpenMenuIndex(null);
  };

  /**
   * Đóng modal và reset form
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReview(null);

    setFormData({
      tour_id: tour?.id || "",
      user_id: userInfo || "",
      comment: "",
      rating: 5,
    });
  };

  /**
   * Lấy message lỗi từ API
   */
  const getErrorMessage = (error, defaultMessage) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      defaultMessage
    );
  };

  /**
   * Cập nhật review
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (!currentReview?.review_id) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không tìm thấy ID đánh giá!",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!formData.comment?.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu nội dung",
        text: "Vui lòng nhập nội dung đánh giá!",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await putDataReview(currentReview.review_id, {
        ...formData,
        comment: formData.comment.trim(),
      });

      if (response?.status === 200 || response?.status === 204) {
        closeModal();

        await Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Cập nhật đánh giá thành công!",
          confirmButtonText: "OK",
        });

        window.location.reload();
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text:
          response?.data?.message ||
          response?.data ||
          "Lỗi khi cập nhật dữ liệu!",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: getErrorMessage(error, "Lỗi khi cập nhật dữ liệu!"),
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Xóa review
   */
  const handleDelete = async (reviewId) => {
    if (isLoading) return;

    if (!reviewId) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không tìm thấy ID đánh giá!",
        confirmButtonText: "OK",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Xác nhận xóa",
      text: "Bạn có chắc muốn xóa đánh giá này?",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    setOpenMenuIndex(null);
    setIsLoading(true);

    try {
      const response = await deleteReview(reviewId);

      if (response?.status === 200 || response?.status === 204) {
        await Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Xóa đánh giá thành công!",
          confirmButtonText: "OK",
        });

        window.location.reload();
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text:
          response?.data?.message || response?.data || "Lỗi khi xóa dữ liệu!",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: getErrorMessage(error, "Lỗi khi xóa dữ liệu!"),
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reviews = Array.isArray(tour?.reviews) ? tour.reviews : [];

  return (
    <div className="pt-6 bg-white dark:bg-slate-900">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#00c0d1] mb-4 sm:mb-6">
            Đánh giá của các khách hàng
          </h1>

          <img
            src={Img}
            alt="Tour Policy"
            className="w-full max-w-[80px] sm:max-w-[100px] h-auto rounded-lg mb-4 sm:mb-6 object-contain"
          />
        </div>

        {/* Reviews */}
        <div className="mt-2 sm:mt-4 md:mt-6 space-y-4 sm:space-y-6">
          {reviews.length > 0 ? (
            reviews.map((fb, index) => (
              <ReviewItem
                key={fb?.review_id ?? `review-${index}`}
                review={fb}
                index={index}
                tour={tour}
                userInfo={userInfo}
                openMenuIndex={openMenuIndex}
                toggleMenu={toggleMenu}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isLoading={isLoading}
              />
            ))
          ) : (
            <div className="py-8 sm:py-10 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                Chưa có đánh giá nào.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Review Modal */}
      <ReviewModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Loading */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default TourReviewCustomer;

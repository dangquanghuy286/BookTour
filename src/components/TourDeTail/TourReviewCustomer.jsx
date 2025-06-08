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
  const [formData, setFormData] = useState({ comment: "", rating: 5 });
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = parseInt(localStorage.getItem("user_id"), 10);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleEdit = (review) => {
    setCurrentReview(review);
    setFormData({
      tour_id: tour.id,
      user_id: userInfo,
      comment: review.comment || "",
      rating: review.rating || 5,
    });
    setIsModalOpen(true);
    setOpenMenuIndex(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReview(null);
    setFormData({ comment: "", rating: 5 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentReview?.review_id) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không tìm thấy ID đánh giá!",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await putDataReview(currentReview.review_id, formData);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Cập nhật đánh giá thành công!",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text:
            response.data?.message ||
            response.data ||
            "Lỗi khi cập nhật dữ liệu!",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message || "Lỗi khi cập nhật dữ liệu!",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleDelete = async (reviewId) => {
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
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const response = await deleteReview(reviewId);

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Xóa đánh giá thành công!",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text:
              response.data?.message || response.data || "Lỗi khi xóa dữ liệu!",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: error.message || "Lỗi khi xóa dữ liệu!",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
      setOpenMenuIndex(null);
    }
  };

  return (
    <div className="pt-6 bg-white dark:bg-slate-900">
      <div className="container mx-auto">
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
        <div className="mt-2 sm:mt-4 md:mt-6 space-y-4 sm:space-y-6">
          {tour.reviews && tour.reviews.length > 0 ? (
            tour.reviews.map((fb, index) => (
              <ReviewItem
                key={fb.review_id || index}
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
            <p className="text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              Chưa có đánh giá nào.
            </p>
          )}
        </div>
      </div>

      <ReviewModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default TourReviewCustomer;

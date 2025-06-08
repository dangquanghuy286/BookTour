import { useState } from "react";

import Swal from "sweetalert2";
import Img from "../../assets/Img/dauphay.webp";
import icons from "../../utils/icons";
import StarRating from "../Star/StarRating";
import { postReview } from "../../services/ReviewService";
const { FiArrowUpRight } = icons;
const AddComment = ({ tour }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const user_id = localStorage.getItem("user_id");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment || !rating) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập đầy đủ thông tin đánh giá.",
        confirmButtonText: "OK",
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white",
          confirmButton: "bg-primary text-white px-4 py-2 rounded-lg",
        },
      });
      return;
    }
    try {
      // Tạo dữ liệu đánh giá
      const data = {
        tour_id: tour.id,
        user_id: user_id,
        booking_id: localStorage.getItem("booking_id"),
        comment: comment,
        rating: rating,
      };

      const res = await postReview(data);

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Đánh giá của bạn đã được gửi!",
          confirmButtonText: "OK",
          customClass: {
            popup: "dark:bg-slate-800 dark:text-white",
            confirmButton: "bg-primary text-white px-4 py-2 rounded-lg",
          },
        });
        setComment("");
        setRating(0);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Lỗi",
          text: "Có lỗi xảy ra khi gửi đánh giá.",
          confirmButtonText: "OK",
          customClass: {
            popup: "dark:bg-slate-800 dark:text-white",
            confirmButton: "bg-primary text-white px-4 py-2 rounded-lg",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Bạn đã đánh giá tour này rồi hoặc chưa đặt tour. Vui lòng đặt tour để đánh giá.",
        confirmButtonText: "OK",
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white",
          confirmButton: "bg-primary text-white px-4 py-2 rounded-lg",
        },
      });
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="pt-6 ">
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-xl md:text-2xl font-bold text-[#00c0d1] mb-6">
          Thêm Đánh Giá
        </h1>
        <img
          src={Img}
          alt="Tour Policy"
          className="w-full max-w-[100px] h-auto rounded-lg mb-6 object-contain"
        />
      </div>
      <div className="mt-6 sm:mt-8 md:mt-10">
        <div
          className="w-full max-w-[90%] sm:max-w-[700px] md:max-w-[820px] h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[450px] 
    bg-white dark:bg-slate-900 
    p-4 sm:p-6 md:p-10 
    border border-gray-300
    shadow-[0_1px_4px_rgba(0,0,0,0.16)] 
     
    rounded-2xl 
    text-gray-900 dark:text-white"
        >
          <div className="flex items-center gap-3 sm:gap-5">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Đánh giá
            </h1>
            <StarRating onRatingChange={(rating) => setRating(rating)} />
          </div>

          <hr className="mt-6 sm:mt-8 md:mt-10 border-gray-400 dark:border-gray-600" />

          <div className="mt-4 sm:mt-6 space-y-3 font-semibold">
            <h1 className="text-base sm:text-lg md:text-xl">Để lại phản hồi</h1>
            <p className="text-sm sm:text-base">Nội dung</p>
            <textarea
              className="w-full h-[120px] sm:h-[140px] md:h-[150px] 
          dark:bg-slate-900 
          dark:placeholder-gray-400 
          dark:text-white 
          px-4 sm:px-6 py-2 
          rounded-lg 
          text-sm sm:text-base 
          border border-gray-300 dark:border-slate-400 
          focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nhập đánh giá của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            onClick={handleCommentSubmit}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 mt-4 
        font-semibold text-white transition duration-300 
        rounded-lg bg-[#00c0d1] 
        text-sm sm:text-base"
          >
            Gửi Đánh Giá <FiArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;

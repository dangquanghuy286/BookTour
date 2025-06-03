import React from "react";
import Img from "../../assets/Img/dauphay.webp";
import icons from "../../utils/icons";
const { FaStar } = icons;
const TourReview = ({ tour }) => {
  const average = tour?.average_rating || 0;
  const total = tour?.total_reviews || 0;
  const countStar = tour?.count_star || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const ratings = [1, 2, 3, 4, 5].map((star) => ({
    star,
    count: countStar[star] || 0,
  }));

  return (
    <div className="pt-6 bg-white dark:bg-slate-900">
      <div className="container ">
        <div className="flex flex-col  mb-10">
          <h1 className="text-2xl font-bold text-[#00c0d1] mb-4">Đánh Giá</h1>
          <img
            src={Img}
            alt="Tour Policy"
            className="w-full max-w-[100px] h-auto rounded-lg object-contain"
          />
        </div>

        <div className="flex ">
          <div className="flex flex-col sm:flex-row sm:items-start border border-gray-300 rounded-2xl p-6 w-full max-w-5xl bg-white dark:bg-slate-900 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
            {/* Average rating */}
            <div className="flex items-center space-x-2 sm:pr-6 sm:border-r border-gray-200 mb-4 sm:mb-0 h-full sm:h-16">
              <span className="text-3xl font-bold text-[#00c0d1]">
                {average.toFixed(1)}
              </span>
              <FaStar className="text-yellow-400 text-xl" />
              <span className="text-sm text-gray-500">{total} đánh giá</span>
            </div>

            {/* Rating breakdown */}
            <div className="flex flex-col flex-1 sm:pl-6 space-y-1 w-full">
              {ratings
                .slice()
                .reverse()
                .map((r) => (
                  <div key={r.star} className="flex items-center">
                    <span className="w-10 text-sm text-[#00c0d1]">
                      {r.star} sao
                    </span>
                    <div className="flex-1 mx-2 h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-[#00c0d1] rounded"
                        style={{
                          width:
                            total > 0 ? `${(r.count / total) * 100}%` : "0%",
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#00c0d1] min-w-[60px] text-right">
                      {r.count} đánh giá
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourReview;

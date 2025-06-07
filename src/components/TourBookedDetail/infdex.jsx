import React, { useEffect, useState } from "react";
import { getBookingDetailById } from "../../services/BookingService";
import LoadingSpinner from "../LoadingSniper";
import TourBookedInfo from "./TourBookedInfo";

const TourBookedDetail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const bookingId = localStorage.getItem("booking_id");
      if (!bookingId) {
        console.error("Booking ID not found in localStorage");
        return;
      }
      setIsLoading(true);
      const res = await getBookingDetailById(bookingId);
      if (res.status === 200) {
        const booking = res.data;

        setData(booking);
      } else {
        console.error("Failed to fetch booking details:", res.data);
      }
      setIsLoading(false);
    };

    fetchApi();
  }, []);

  return (
    <div className="py-8  bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {" "}
        <h1
          className="  py-2 pl-3 my-6 sm:my-8 text-2xl sm:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Chi tiết đặt tour
        </h1>
        {isLoading ? (
          <LoadingSpinner message="Đang tải chi tiết đặt tour..." />
        ) : (
          <div className="pt-4">
            <TourBookedInfo data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourBookedDetail;

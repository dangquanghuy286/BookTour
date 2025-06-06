/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSniper";
import PaymentInfo from "../../components/Payment/PaymentInfo";
import PaymentQuality from "../../components/Payment/PaymentQuality";
import PaymentCheckbox from "../../components/Payment/PaymentCheckbox";
import PaymentMethod from "../../components/Payment/PaymentMethod";
import PaymentSidebar from "../../components/Payment/PaymentSidebar";

const Booking = () => {
  const location = useLocation();
  const tour = location.state?.tour || {};

  const [agreed, setAgreed] = useState(false);
  const [countAdults, setCountAdults] = useState(0);
  const [countChildren, setCountChildren] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [promotion_code, setPromotionCode] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="py-8 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h1
          className="py-2 pl-3 my-6 sm:my-8 text-2xl sm:text-3xl font-bold text-left border-l-8 border-b-blue-300 text-[#00c0d1]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Đặt Tour: {tour.title || "Tour"}
        </h1>
        {loading ? (
          <LoadingSpinner message="Đang tải..." />
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left content: Payment Info + Method */}
            <div className="w-full lg:w-2/3 bg-white dark:bg-slate-950 rounded-2xl p-6 border border-gray-300 dark:text-white">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <PaymentInfo
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                specialRequests={specialRequests}
                setSpecialRequests={setSpecialRequests}
              />
              <PaymentQuality
                countAdults={countAdults}
                setCountAdults={setCountAdults}
                countChildren={countChildren}
                setCountChildren={setCountChildren}
                disableChildren={!tour.price_children}
              />
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
              <PaymentCheckbox agreed={agreed} setAgreed={setAgreed} />
            </div>

            {/* Right content: Sidebar */}
            <div className="w-full lg:w-1/3 rounded-2xl dark:bg-slate-950 p-6 border border-gray-300 dark:text-white">
              <PaymentSidebar
                agreed={agreed}
                fullName={fullName}
                email={email}
                phone={phone}
                address={address}
                specialRequests={specialRequests}
                paymentMethod={paymentMethod}
                countAdults={countAdults}
                countChildren={countChildren}
                promotion_code={promotion_code}
                setPromotionCode={setPromotionCode}
                tour={tour}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;

import React, { useState } from "react";
import { destinations, prices, durations } from "../../contexts/TourContext";
const HeroFilter = () => {
  const [destination, setDestinaton] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="h-full">
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="container ">
          <div className="">
            <span>Chào mừng bạn đến với GOVIET!</span>
            <h1 className="">Tìm kiếm thú vui của bạn!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFilter;

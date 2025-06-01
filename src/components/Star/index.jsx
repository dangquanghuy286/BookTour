import React from "react";
import icons from "../../utils/icons";
const { FaStar } = icons;
const StarDisplay = ({ rating }) => {
  return (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? "text-lg" : "text-gray-300 text-lg"}
        />
      ))}
    </div>
  );
};

export default StarDisplay;

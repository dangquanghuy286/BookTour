import React, { useState } from "react";
import icons from "../../utils/icons";
const { AiOutlineRight, AiOutlineLeft } = icons;

const TourImg = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(images[0]);

  const handlePrev = () => {
    setSelectedIndex((prev) => {
      const newIndex = prev === 0 ? images.length - 1 : prev - 1;
      setSelectedImg(images[newIndex]);
      return newIndex;
    });
  };

  const handleNext = () => {
    setSelectedIndex((prev) => {
      const newIndex = prev === images.length - 1 ? 0 : prev + 1;
      setSelectedImg(images[newIndex]);
      return newIndex;
    });
  };

  return (
    <div>
      <div className="relative w-full max-w-7xl mx-auto aspect-video overflow-hidden rounded-2xl group bg-white dark:bg-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.16)] border border-gray-300">
        <img
          className="w-full h-full object-cover transition duration-500 ease-in-out"
          src={selectedImg}
          alt="Anh Tour"
          loading="lazy"
        />
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#00c0d1] text-white rounded-full shadow-lg p-1 sm:p-2"
        >
          <AiOutlineLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#00c0d1] text-white rounded-full shadow-lg p-1 sm:p-2"
        >
          <AiOutlineRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-3 mt-6 flex-wrap">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative rounded-md overflow-hidden border-2 ${
              index === selectedIndex
                ? "border-[#00c0d1] shadow-md"
                : "border-gray-300"
            } transition duration-300 ease-in-out hover:scale-105 bg-white dark:bg-slate-900`}
          >
            <img
              src={img}
              alt=""
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain cursor-pointer"
              onClick={() => {
                setSelectedImg(img);
                setSelectedIndex(index);
              }}
              loading="lazy"
            />
            {index === selectedIndex && (
              <div className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-md pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourImg;

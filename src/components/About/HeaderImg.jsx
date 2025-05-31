import React from "react";
import Header from "../../assets/Img/BannerAbout.jpg";

const HeaderImg = () => {
  return (
    <div className="relative w-full">
      <img
        src={Header}
        alt="Banner"
        className="object-cover w-full max-h-[600px] md:max-h-[500px] sm:max-h-[400px]"
      />

      <p
        className="absolute top-[50%] left-5 sm:left-10 text-white text-xl sm:text-2xl md:text-4xl font-bold drop-shadow-lg max-w-[80%]"
        data-aos="fade-right"
      >
        Khám phá thế giới qua từng hành trình
        <br />
        mỗi chuyến đi là một câu chuyện đáng nhớ.
      </p>
    </div>
  );
};

export default HeaderImg;

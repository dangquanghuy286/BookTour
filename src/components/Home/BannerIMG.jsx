import React from "react";
import Banner from "@/assets/Img/banner-img.png";

const BannerIMG = () => {
  return (
    <div className="w-full" data-aos="zoom-out-up" data-aos-duration="2000">
      <img
        src={Banner}
        alt="Banner"
        className="w-full object-cover 
                   h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] border border-gray-300"
      />
    </div>
  );
};

export default BannerIMG;

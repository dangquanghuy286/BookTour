import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { data } from "../../contexts/TourContext";

// Nếu ảnh lỗi thì tự ẩn, không để lại icon vỡ
const LogoItem = ({ item }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className="mx-4 sm:mx-6 flex h-12 w-24 sm:w-28 items-center justify-center">
      <img
        src={item.logoLink}
        alt={`logo-${item.id}`}
        className="max-h-12 w-auto max-w-full object-contain transition-transform duration-300 hover:scale-110"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

const Tape = () => {
  return (
    <div className="overflow-hidden">
      <div className="bg-gradient-to-r from-teal-300 to-[#03a0c5]">
        <div className="relative py-3">
          <Marquee
            speed={40}
            autoFill
            pauseOnHover
            gradient={false}
            direction="left"
          >
            {data.map((item) => (
              <LogoItem key={item.id} item={item} />
            ))}
          </Marquee>

          {/* Làm mờ 2 mép */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-teal-300 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#03a0c5] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
};

export default Tape;

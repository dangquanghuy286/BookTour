import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Calculate scroll percentage
      const progress =
        docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Convert percentage to degrees
  const progressAngle = (scrollProgress / 100) * 360;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-5 right-5 sm:bottom-7 sm:right-7
        z-50
        w-10 h-10 sm:w-11 sm:h-11
        rounded-full
        flex items-center justify-center
        bg-white/90 dark:bg-slate-900/90
        backdrop-blur-sm
        text-[#00c0d1]
        shadow-md shadow-black/10
        border border-gray-200 dark:border-slate-700
        transition-opacity duration-300
        focus:outline-none
        ${
          isVisible
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }
      `}
      aria-label="Back to top"
      title="Back to top"
    >
      {/* Progress ring */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `conic-gradient(
            #00c0d1 ${progressAngle}deg,
            rgba(0, 192, 209, 0.15) ${progressAngle}deg
          )`,
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
        }}
      />

      {/* Inner circle */}
      <span
        className="
          absolute inset-[3px]
          rounded-full
          bg-white dark:bg-slate-900
        "
      />

      <FaArrowUp
        className="relative z-10 text-sm sm:text-base"
        aria-hidden="true"
      />
    </button>
  );
};

export default BackToTop;

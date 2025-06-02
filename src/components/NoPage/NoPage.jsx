import React from "react";
import Logo2 from "../../assets/Img/Logo2.png";

const NoPage = () => {
  return (
    <div className="flex  w-full h-screen bg-white dark:bg-slate-950  dark:text-white">
      <div className="w-[1200px]   rounded-2xl shadow-xl bg-white dark:bg-slate-900  p-4 text-center">
        <img src={Logo2} alt="Logo" className=" mx-auto" />
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">
          Rất tiếc, GoViet không tìm thấy kết quả cho bạn
        </p>
      </div>
    </div>
  );
};

export default NoPage;

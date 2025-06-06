import React from "react";

import RegisterLogic from "./RegisterLogic";

const RegisterPage = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-white dark:bg-slate-950 max-w-md rounded-2xl border border-gray-300 p-8 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <h2 className="text-3xl font-bold text-[#00c0d1] text-center m-4">
          Đăng Ký
        </h2>
        <RegisterLogic />
      </div>
    </div>
  );
};

export default RegisterPage;

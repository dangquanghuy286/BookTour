import React from "react";
import { Outlet } from "react-router-dom";
import Filter from "./Filter";

const Tours = () => {
  return (
    <div>
      <Filter />
      <Outlet />
    </div>
  );
};

export default Tours;

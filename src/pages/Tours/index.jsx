import React from "react";
import { Outlet } from "react-router-dom";

import BannerTour from "../../components/Tour/BannerTour";

const Tours = () => {
  return (
    <div>
      <BannerTour />
      <Outlet />
    </div>
  );
};

export default Tours;

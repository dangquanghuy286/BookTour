import React from "react";
import HeaderImg from "../../components/About/HeaderImg";
import AboutUs from "../../components/About/AboutUs";
import CancellationPolicy from "../../components/About/CancellationPolicy";
import PrivacyPolicy from "../../components/About/PrivacyPolicy";
import AboutTeam from "../../components/About/AboutTeam";

const Intro = () => {
  return (
    <div>
      <HeaderImg />
      <AboutUs />
      <AboutTeam />
      <CancellationPolicy />
      <PrivacyPolicy />
    </div>
  );
};

export default Intro;

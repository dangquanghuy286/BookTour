import React from "react";
import HeaderImg from "../../components/About/HeaderImg";
import AboutUs from "../../components/About/AboutUs";
import CancellationPolicy from "../../components/TermsOfService/CancellationPolicy";
import PrivacyPolicy from "../../components/About/PrivacyPolicy";
import AboutTeam from "../../components/About/AboutTeam";
import WhyChooseUs from "../../components/About/WhyChoseUs";

const Intro = () => {
  return (
    <div>
      <HeaderImg />
      <AboutUs />
      <WhyChooseUs />
      <AboutTeam />

      <CancellationPolicy />

      <PrivacyPolicy />
    </div>
  );
};

export default Intro;

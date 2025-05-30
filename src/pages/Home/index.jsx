import React from "react";
import Banner from "../../components/Home/Banner";
import SectionVideo from "../../components/SectionVideo";
import Places from "../../components/Card/Places";
import BannerIMG from "../../components/Home/BannerIMG";
import TourPopuLar from "../../components/TourPopular/TourPopuLar";

const Home = () => {
  return (
    <div>
      <SectionVideo />
      <Places />
      <BannerIMG />
      <TourPopuLar />
      <Banner />
    </div>
  );
};

export default Home;

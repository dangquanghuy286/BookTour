import React from "react";
import Banner from "../../components/Home/Banner";
import SectionVideo from "../../components/SectionVideo";
import Places from "../../components/Card/Places";
import BannerIMG from "../../components/Home/BannerIMG";
import TourPopuLar from "../../components/Tour/TourPopuLar";
import Tape from "../../components/Home/Tape";
import Review from "../../components/Reviews/Review";

const Home = () => {
  return (
    <div>
      <SectionVideo />
      <Places />
      <BannerIMG />
      <TourPopuLar />
      <Banner />
      <Review />
      <Tape />
    </div>
  );
};

export default Home;

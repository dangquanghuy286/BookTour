import React from "react";
import Banner from "../../components/Home/Banner";
import SectionVideo from "../../components/SectionVideo";
import Places from "../../components/Card/Places";

const Home = () => {
  return (
    <div>
      <SectionVideo />
      <Places />
      <Banner />
    </div>
  );
};

export default Home;

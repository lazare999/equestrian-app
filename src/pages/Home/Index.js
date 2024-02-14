import React from "react";
import Header from "../../components/Header/Index";
import Slider from "../../components/slider/Slider";
import ShowjumpingEvents from "../../components/ShowjumpingEvents/AllEvents/Index";
import Sponsors from "../../components/Sponsors/Index";

const Home = () => {
  return (
    <div>
      <Header />
      <Slider />
      <h1>Showjumping Events:</h1>
      <ShowjumpingEvents />
      <div>
        <h1>სპონსორები</h1>
        <Sponsors />
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../../components/slider/Slider";
import ShowjumpingEvents from "../../components/ShowjumpingEvents/AllEvents/Index";
import Sponsors from "../../components/Sponsors/Index";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import classes from "./Home.module.css";
import StablesCover from "../../components/StablesDetails/StablesCover/Index";
import { useStablesFetchData } from "../../utils/useFetchEvents.js/Index";

const Home = () => {
  const navigate = useNavigate();
  const stables = useStablesFetchData();
  const [fetchedStables, setFetchedStables] = useState([]);

  useEffect(() => {
    setFetchedStables(stables);
  }, [stables]);

  const handleContainerClick = (eventId) => {
    navigate(`stables/details/${eventId}`);
    console.log("Clicked on event with ID:", eventId);
  };

  const carouselSettings = {
    responsive: {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        autoPlay: true,
        autoPlaySpeed: 1000,
      },
    },
    autoPlay: true,
    autoPlaySpeed: 90000,
    arrows: true,
  };
  return (
    <div>
      <Slider />
      {/* <div className={classes.eventsContainer}> */}
      {/* <h1 className={classes.title}>Events</h1> */}
      <h1>Showjumping Events:</h1>
      <ShowjumpingEvents eventType="showjumping" />
      <h1>Horse Race:</h1>
      <ShowjumpingEvents eventType="horse_race" />
      {/* </div> */}
      <h1>Stables:</h1>
      <Carousel {...carouselSettings}>
        {fetchedStables.map((stable, index) => (
          <StablesCover
            key={index}
            event={stable}
            handleContainerClick={handleContainerClick}
          />
        ))}
      </Carousel>
      <div>
        <h1 className={classes.sponsorsTitle}>Sponsors</h1>
        <Sponsors />
      </div>
    </div>
  );
};

export default Home;

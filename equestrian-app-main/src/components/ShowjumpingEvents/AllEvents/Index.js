import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { format } from "date-fns";

import useFetchEvents from "../../../utils/useFetchEvents.js/Index";

import EventsCover from "../EventsCover/Index";

import classes from "./ShowjumpingEvents.module.css";

const ShowjumpingEvents = ({ eventType }) => {
  const navigate = useNavigate();
  const events = useFetchEvents(eventType);

  const formatDateString = (originalDateString) => {
    const dateObject = new Date(originalDateString);
    return {
      day: format(dateObject, "dd"),
      month: format(dateObject, "MMMM"),
      year: format(dateObject, "yyyy"),
    };
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
        // customArrow: {
        //   prev: {
        //     fontSize: "16px", // Adjust arrow size for mobile
        //     color: "#000",
        //     background: "#fff",
        //     borderRadius: "50%",
        //   },
        //   next: {
        //     fontSize: "16px", // Adjust arrow size for mobile
        //     color: "#000",
        //     background: "#fff",
        //     borderRadius: "50%",
        //   },
        // },
      },
    },
    autoPlay: true,
    autoPlaySpeed: 90000,
    arrows: true,
  };

  const handleContainerClick = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };

  return (
    <div className={classes.slider}>
      <Carousel {...carouselSettings}>
        {events.map((event, index) => (
          <EventsCover
            key={index}
            event={event}
            handleContainerClick={handleContainerClick}
            formatDateString={formatDateString}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ShowjumpingEvents;

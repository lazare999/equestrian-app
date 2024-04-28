import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { format } from "date-fns";

import useFetchEvents from "../../../utils/useFetchEvents.js/Index";

import EventsCover from "../../ShowjumpingEvents/EventsCover/Index";

import classes from "./HorseRaceEvents.module.css";

const HorseRaceEvents = () => {
  const navigate = useNavigate();
  // Update the API endpoint for horse racing events
  const events = useFetchEvents("horse-racing");

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
      // ... (your existing settings)
    },
    // ... (your existing settings)
  };

  const handleContainerClick = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };

  return (
    <div className={classes.slider}>
      <h1>Horse Racing Events:</h1>
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

export default HorseRaceEvents;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

import useFetchEvents from "../../utils/useFetchEvents.js/Index";
import EventsCover from "../../components/ShowjumpingEvents/EventsCover/Index";

import classes from "./Showjumping.module.css";

const Showjumping = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("Location state:", state);
  const eventType = state?.eventType || "showjumping";
  let events = useFetchEvents(eventType);

  const sortedEvents = events.sort((a, b) => {
    return b.event_date.localeCompare(a.event_date);
  });
  console.log(sortedEvents);

  let eventCategory = "";

  if (eventType === "showjumping") {
    eventCategory = "Showjumping Events";
  } else {
    eventCategory = "Horse Race Events";
  }

  const formatDateString = (originalDateString) => {
    const dateObject = new Date(originalDateString);
    return {
      day: format(dateObject, "dd"),
      month: format(dateObject, "MMMM"),
      year: format(dateObject, "yyyy"),
    };
  };

  const handleContainerClick = (eventId) => {
    navigate(`/event-detail/${eventId}`);
    console.log("Clicked on event with ID:", eventId);
  };

  return (
    <div>
      <h1>{eventCategory}</h1>
      <div className={classes.showjumpingContainer}>
        {events.map((event, index) => (
          <EventsCover
            key={index}
            event={event}
            handleContainerClick={handleContainerClick}
            formatDateString={formatDateString}
          />
        ))}
      </div>
    </div>
  );
};

export default Showjumping;

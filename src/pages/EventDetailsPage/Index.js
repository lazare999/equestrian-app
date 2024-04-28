import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EventDetails from "../../components/ShowjumpingEvents/EventDetails/Index";
import Sponsors from "../../components/Sponsors/Index";
import { useFetchEventDetails } from "../../utils/useFetchEvents.js/Index";

import classes from "./EventDetailsPage.module.css";
import Weather from "../../components/Weather/Index";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  // Use useFetchEventDetails hook to fetch event details for showjumping events
  const showjumpingEvent = useFetchEventDetails(eventId, "showjumping");

  // Use useFetchEventDetails hook to fetch event details for horse racing events
  const horseRaceEvent = useFetchEventDetails(eventId, "horse_race");

  // Determine which event type to use based on your application logic
  const selectedEvent = showjumpingEvent || horseRaceEvent;

  useEffect(() => {
    setEvent(selectedEvent);
  }, [selectedEvent]);

  return (
    <div className={classes.container}>
      <h1>დეტალები შეჯიბრზე</h1>
      <EventDetails eventData={event} />
      <Weather eventData={event} />
      <div className={classes.sponsorsContainer}>
        <h1>სპონსორები</h1>
        <Sponsors />
      </div>
    </div>
  );
};

export default EventDetailsPage;

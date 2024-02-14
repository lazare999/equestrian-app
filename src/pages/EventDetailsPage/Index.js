import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDetails from "../../components/ShowjumpingEvents/EventDetails/Index";
import Header from "../../components/Header/Index";
import Sponsors from "../../components/Sponsors/Index";

import classes from "./EventDetailsPage.module.css";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `https://equestrian-app-e534c-default-rtdb.firebaseio.com/events/${eventId}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const eventData = await response.json();
        if (eventData) {
          setEvent(eventData);
        }
        console.log(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  return (
    <div className={classes.container}>
      <Header />
      <h1>დეტალები შეჯიბრზე</h1>
      <EventDetails eventData={event} />
      <div className={classes.sponsorsContainer}>
        <h1>სპონსორები</h1>
        <Sponsors />
      </div>
    </div>
  );
};

export default EventDetailsPage;

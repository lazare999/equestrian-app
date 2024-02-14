import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Index";
import EventDetails from "../../components/ShowjumpingEvents/EventDetails/Index";
import { format } from "date-fns";

import classes from "./Showjumping.module.css";

const Showjumping = () => {
  const [events, setEvents] = useState([]);
  const [eventDetailsId, setEventDetailsId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://equestrian-app-e534c-default-rtdb.firebaseio.com/events.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        if (data) {
          const eventIds = Object.keys(data);
          console.log("Event IDs:", eventIds);

          const eventArray = Object.entries(data).map(
            ([eventId, eventData]) => ({
              ...eventData,
              id: eventId,
            })
          );
          eventArray.sort(
            (a, b) => new Date(a.event_date) - new Date(b.event_date)
          );
          setEvents(eventArray);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDateString = (originalDateString) => {
    const dateObject = new Date(originalDateString);
    return {
      day: format(dateObject, "dd"),
      month: format(dateObject, "MMMM"),
      year: format(dateObject, "yyyy"),
    };
  };

  const handleContainerClick = (eventId) => {
    setEventDetailsId(eventId);
    navigate(`/event-detail/${eventId}`);
    console.log("Clicked on event with ID:", eventId);
  };

  return (
    <div>
      <Header />
      <h1>Showjumping Events</h1>
      <div className={classes.showjumpingContainer}>
        {events.map((event, index) => {
          const { day, month, year } = formatDateString(event.event_date);
          return (
            <div
              key={index}
              className={classes.container}
              onClick={() => handleContainerClick(event.id)}
            >
              {/* Format the date using the formatDateString function */}
              <p className={classes.date}>
                <span className={classes.day}>{day}</span>
                <span className={classes.month}>{month}</span>
                <span className={classes.year}>{year}</span>
              </p>
              <hr />
              <h3 className={classes.title}>{event.event_name}</h3>
              <div className={classes.imgAndDetails}>
                <img
                  src={event.event_image}
                  className={classes.img}
                  alt="Event img"
                />
                <p className={classes.details}>{event.event_details}</p>
              </div>
              <hr />
              <div className={classes.containerFooter}>
                <p>START: {event.event_time}</p>
                <h1>/</h1>
                <p>Entry Free!</p>
              </div>
            </div>
          );
        })}
      </div>
      {eventDetailsId && <EventDetails eventId={eventDetailsId} />}
    </div>
  );
};

export default Showjumping;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classes from "./ShowjumpingEvents.module.css";
import { format } from "date-fns";

const ShowjumpingEvents = () => {
  const [events, setEvents] = useState([]);
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
      },
    },
    // autoPlay: true,
    // autoPlaySpeed: 3000,
  };

  const handleContainerClick = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };

  return (
    <div className={classes.slider}>
      <Carousel {...carouselSettings}>
        {events.map((event, index) => (
          <div
            key={index}
            className={classes.container}
            onClick={() => handleContainerClick(event.id)}
          >
            <p className={classes.date}>
              <span className={classes.day}>
                {formatDateString(event.event_date).day}
              </span>
              <span className={classes.month}>
                {formatDateString(event.event_date).month}
              </span>
              <span className={classes.year}>
                {formatDateString(event.event_date).year}
              </span>
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
        ))}
      </Carousel>
    </div>
  );
};

export default ShowjumpingEvents;

import React from "react";

import classes from "../AllEvents/ShowjumpingEvents.module.css";

const EventsCover = ({ event, handleContainerClick, formatDateString }) => {
  return (
    <div
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
        <img src={event.event_image} className={classes.img} alt="Event img" />
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
};

export default EventsCover;

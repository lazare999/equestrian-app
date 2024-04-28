import React from "react";

// import classes from "../../ShowjumpingEvents/AllEvents/ShowjumpingEvents.module.css";
import classes from "./StablesCover.module.css";

const StablesCover = ({ event, handleContainerClick }) => {
  return (
    <div
      className={classes.container}
      onClick={() => handleContainerClick(event.id)}
    >
      <h3 className={`${classes.title} ${classes.truncated}`}>
        {event.stable_name}
      </h3>
      <div className={classes.imgAndDetails}>
        <img src={event.logo_images} className={classes.img} alt="Event img" />
        <p className={classes.details}>{event.description}</p>
      </div>
      <hr />
      <div className={classes.containerFooter}>
        <p className={classes.address}>
          address: <span>{event.address}</span>
        </p>
      </div>
    </div>
  );
};

export default StablesCover;

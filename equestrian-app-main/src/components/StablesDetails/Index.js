import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import classes from "./StableDetails.module.css";

const StableDetails = ({ data }) => {
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.container}>
      <h2 className={`${classes.stableName} ${classes.centered}`}>
        {data.stable_name}
      </h2>
      <div className={classes.descriptionContainer}>
        <div className={classes.imgAddressNumber}>
          <img src={data.logo_images} className={classes.img} alt="stable" />
          <div className={classes.addressAndNumber}>
            <p>
              <span>Address:</span> {data.address}
            </p>
            <p>
              <span>Number:</span> {data.number}
            </p>
          </div>
        </div>
        <div className={classes.description}>
          <h4>
            Description: {data.description}
            <FontAwesomeIcon
              className={classes.fullScreen}
              icon={faExpand}
              onClick={openFullScreen}
            />
          </h4>
          <Modal open={isFullScreenOpen} onClose={closeFullScreen}>
            <div className={classes.fullScreenContent}>
              <h2>Full Screen Event Details</h2>
              <p> Description: {data.description}</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default StableDetails;

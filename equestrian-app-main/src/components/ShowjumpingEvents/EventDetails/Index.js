import React, { useState, useRef, useEffect } from "react";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import classes from "./EventDetails.module.css";

const EventDetails = ({ eventData }) => {
  const titleContainer = useRef();
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  useEffect(() => {
    const animationTimeline = gsap.timeline();
    animationTimeline.fromTo(
      titleContainer.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 2,
        ease: "power4.out",
      }
    );
  }, [eventData, titleContainer]);

  // Extract participant data from eventData
  const participantsData = eventData?.event_participants || [];

  // Define columns for the MaterialReactTable
  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "#",
        size: 50,
      },
      {
        accessorKey: "athlete",
        header: "Rider",
        size: 100,
      },
      {
        accessorKey: "horse",
        header: "Horse",
        size: 100,
      },
      {
        accessorKey: "club",
        header: "Club",
        size: 100,
      },
    ],
    []
  );

  // Create a MaterialReactTable instance
  const table = useMaterialReactTable({
    columns,
    data: participantsData, // Use participantsData as the data source
  });

  if (!eventData) {
    return <div>Loading...</div>;
  }

  let eventFormat = "";
  let eventType = "";
  if (eventData.event_category === "showjumping") {
    eventFormat = "სმ.";
    eventType = "ბარიერების სიმაღლე";
  }
  if (eventData.event_category === "horse_race") {
    eventFormat = "მ.";
    eventType = "გარბენის მანძილი";
  }

  console.log(eventData.event_category);

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };

  // console.log(eventFormat);
  return (
    <div>
      {/* <div className={classes.fontAnimationContainer}></div> */}
      <div className={classes.imgAndDetailContainer}>
        <div className={classes.title}>
          <h1 ref={titleContainer}>{eventData.event_name}</h1>
        </div>
        <div className={classes.nameAndImg}>
          <img
            src={eventData.event_image}
            alt="event cover"
            className={classes.img}
          />
          <p>
            {eventData.event_details}
            <FontAwesomeIcon className={classes.fullScreen} icon={faExpand} onClick={openFullScreen} />
          </p>
        </div>
        <table>
          <tr>
            <td>
              {eventType}: {eventData.event_obstacle} {eventFormat}
            </td>
            <td>დასაწყისი: {eventData.event_time} სთ.</td>
            <td>დასწრება: {eventData.event_entry}</td>
          </tr>
        </table>
      </div>
      <div>
        <h1>მონაწილეები</h1>
        <MaterialReactTable table={table} />
      </div>
      <div className={classes.fontAnimationContainer}>
        <p className={classes.animatedText}>🐎</p>
      </div>
      <Modal open={isFullScreenOpen} onClose={closeFullScreen}>
        <div className={classes.fullScreenContent}>
          <h2>Full Screen Event Details</h2>
          <p>{eventData.event_details}</p>
        </div>
      </Modal>
    </div>
  );
};

export default EventDetails;

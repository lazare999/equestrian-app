import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import classes from "./EventDetails.module.css";

const EventDetails = ({ eventData }) => {
  const { eventId } = useParams();
  console.log(eventId);
  console.log(eventData);

  const container = useRef();
  const titleContainer = useRef();
  const { contextSafe } = useGSAP({
    scope: container,
    titleContainer,
  });
  const onClickGood = contextSafe(() => {
    // Horse animation
    gsap.fromTo(
      titleContainer.current,
      { x: -300, opacity: 0 }, // Set initial position to the left
      {
        x: 0, // Move to the original position
        opacity: 1,
        duration: 0.5,
        ease: "power2.out", // You can change the easing function
      }
    );
  });

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
  console.log(participantsData);

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

  return (
    <div>
      <div className={classes.fontAnimationContainer}></div>
      <div className={classes.imgAndDetailContainer}>
        <div className={classes.title} ref={titleContainer}>
          <h1 ref={titleContainer}>{eventData.event_name}</h1>
        </div>
        <div className={classes.nameAndImg}>
          <img
            src={eventData.event_image}
            alt="event cover"
            className={classes.img}
          />
          <p>{eventData.event_details}</p>
        </div>
        <table>
          <tr>
            <td>ბარიერების სიმაღლე:</td>
            <td>დასაწყისი:</td>
            <td>დასწრება:</td>
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
    </div>
  );
};

export default EventDetails;

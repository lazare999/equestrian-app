import React from "react";
import { useNavigate } from "react-router-dom";

import StablesCover from "../../components/StablesDetails/StablesCover/Index";
import { useStablesFetchData } from "../../utils/useFetchEvents.js/Index";

import classes from "./Stables.module.css";

const Stables = () => {
  const navigate = useNavigate();
  const stables = useStablesFetchData();
  console.log(stables);

  const handleContainerClick = (eventId) => {
    navigate(`details/${eventId}`);
    console.log("Clicked on event with ID:", eventId);
  };

  return (
    <div>
      <h1>Stables</h1>
      <div className={classes.container}>
        {stables.map((stable) => (
          <StablesCover
            key={stable.id}
            event={stable}
            handleContainerClick={handleContainerClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Stables;

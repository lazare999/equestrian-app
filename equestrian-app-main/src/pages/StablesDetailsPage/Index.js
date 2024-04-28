import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import StableDetails from "../../components/StablesDetails/Index";
import StableSlider from "../../components/StablesDetails/StableSlider/Index";

const StablesDetailsPage = () => {
  const { stableId } = useParams();
  const [data, setData] = useState(null);
  console.log(stableId);

  useEffect(() => {
    const fetchStableDetails = async () => {
      try {
        const response = await fetch(
          `https://equestrian-app-e534c-default-rtdb.firebaseio.com/stables/${stableId}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const eventData = await response.json();
        if (eventData) {
          setData(eventData);
        }
        console.log(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchStableDetails();
  }, [stableId]);

  return (
    <div>
      <StableDetails data={data} />
      <h1>სურათები</h1>
      <StableSlider data={data} />
    </div>
  );
};

export default StablesDetailsPage;

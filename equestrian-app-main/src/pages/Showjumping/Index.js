import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

import useFetchEvents from "../../utils/useFetchEvents.js/Index";

// import EventDetails from "../../components/ShowjumpingEvents/EventDetails/Index";
import EventsCover from "../../components/ShowjumpingEvents/EventsCover/Index";

import classes from "./Showjumping.module.css";

const Showjumping = () => {
  // const [events, setEvents] = useState([]);
  // const [eventDetailsId, setEventDetailsId] = useState(null);

  // const navigate = useNavigate();
  // console.log(eventType);

  // // const events = useFetchEvents();
  // const events = useFetchEvents(eventType);
  // console.log(events);

  // const [eventDetailsId, setEventDetailsId] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("Location state:", state);
  const eventType = state?.eventType || "showjumping";
  const events = useFetchEvents(eventType);

  console.log(eventType);

  let eventCategory = "";

  if (eventType === "showjumping") {
    eventCategory = "Showjumping Events";
  } else {
    eventCategory = "Horse Race Events";
  }

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://equestrian-app-e534c-default-rtdb.firebaseio.com/events.json"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch events");
  //       }
  //       const data = await response.json();
  //       if (data) {
  //         const eventIds = Object.keys(data);
  //         console.log("Event IDs:", eventIds);

  //         const eventArray = Object.entries(data).map(
  //           ([eventId, eventData]) => ({
  //             ...eventData,
  //             id: eventId,
  //           })
  //         );
  //         eventArray.sort(
  //           (a, b) => new Date(a.event_date) - new Date(b.event_date)
  //         );
  //         setEvents(eventArray);
  //       }
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  const formatDateString = (originalDateString) => {
    const dateObject = new Date(originalDateString);
    return {
      day: format(dateObject, "dd"),
      month: format(dateObject, "MMMM"),
      year: format(dateObject, "yyyy"),
    };
  };

  const handleContainerClick = (eventId) => {
    // setEventDetailsId(eventId);
    navigate(`/event-detail/${eventId}`);
    console.log("Clicked on event with ID:", eventId);
  };

  return (
    <div>
      <h1>{eventCategory}</h1>
      <div className={classes.showjumpingContainer}>
        {events.map((event, index) => (
          <EventsCover
            key={index}
            event={event}
            handleContainerClick={handleContainerClick}
            formatDateString={formatDateString}
          />
        ))}
      </div>
      {/* {eventDetailsId && <EventDetails eventId={eventDetailsId} />} */}
    </div>
  );
};

export default Showjumping;

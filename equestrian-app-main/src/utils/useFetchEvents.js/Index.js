import { useEffect, useState } from "react";

const useFetchEvents = (eventType) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://equestrian-app-e534c-default-rtdb.firebaseio.com/event/${eventType}.json`
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
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [eventType]);

  return events;
};

export default useFetchEvents;

export const useFetchEventDetails = (eventId, eventType) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `https://equestrian-app-e534c-default-rtdb.firebaseio.com/event/${eventType}/${eventId}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const eventData = await response.json();
        if (eventData) {
          setEvent(eventData);
        }
      } catch (error) {
        console.error(`Error fetching ${eventType} event details:`, error);
      }
    };

    fetchEventDetails();
  }, [eventId, eventType]);

  return event;
};

export const useStablesFetchData = () => {
  const [stables, setStables] = useState([]);

  useEffect(() => {
    const fetchStableData = async () => {
      try {
        const response = await fetch(
          "https://equestrian-app-e534c-default-rtdb.firebaseio.com/stables.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stables");
        }

        const data = await response.json();
        if (data) {
          const stablesArray = Object.entries(data).map(
            ([stableId, stableData]) => ({
              ...stableData,
              id: stableId,
            })
          );
          setStables(stablesArray);
        }
      } catch (error) {
        console.error("Error fetching stables:", error);
      }
    };

    fetchStableData();
  }, []);

  return stables;
};

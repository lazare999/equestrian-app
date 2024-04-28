import React, { useState, useEffect, useCallback } from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// import AddImg from "../../../Images/add-image.png";

import classes from "./AddShowjumpingEvents.module.css";
import EventDetailsForm from "./EventDetailsForm/Index";
import AddParticipants from "./AddParticipants/Index";
import EventsCover from "../../../components/ShowjumpingEvents/EventsCover/Index";

const AddShowjumpingEvents = () => {
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventEntry, setEventEntry] = useState("Free Entry");
  const [eventObstacle, setEventObstacle] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [updatedParticipants, setUpdatedParticipants] = useState([]);
  // const imagesListRef = ref(storage, "images/");
  console.log(imageUrls);
  console.log(imageUpload);

  const addImgLogo = process.env.PUBLIC_URL + "/Images/add-image.png";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    switch (name) {
      case "eventName":
        setEventName(value);
        break;
      case "eventDetails":
        setEventDetails(value);
        break;
      case "eventDate":
        setEventDate(value);
        break;
      case "eventTime":
        setEventTime(value);
        break;
      case "eventEntry":
        setEventEntry(value);
        break;
      case "eventObstacle":
        setEventObstacle(value);
        break;
      case "eventPhotos":
        setImageUpload(event.target.files[0]);
        break;
      default:
        break;
    }
  };

  const uploadFile = useCallback(async () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    try {
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      setImageUrls([url]);
    } catch (error) {
      console.error("Error uploading the file: ", error);
    }
  }, [imageUpload]);

  useEffect(() => {
    uploadFile();
  }, [uploadFile]);
  // useEffect(() => {
  //   const fetchImageUrls = async () => {
  //     try {
  //       const response = await listAll(imagesListRef);
  //       const urls = await Promise.all(
  //         response.items.map(async (item) => {
  //           return getDownloadURL(item);
  //         })
  //       );
  //       setImageUrls(urls);
  //     } catch (error) {
  //       console.error("Error fetching image URLs: ", error);
  //     }
  //   };

  //   fetchImageUrls();
  // }, [imagesListRef]);

  // console.log(imagesListRef);

  // console.log(imageUpload);
  // console.log(imageUrls);

  const onSubmitHandler = async () => {
    await uploadFile();
    // if (!imageUrls.length) {
    //   console.error("Please fill in all the fields.");
    //   return;
    // }

    await new Promise((resolve) => setTimeout(resolve, 9000));

    try {
      const selectedValue = document.getElementById("category").value;
      let folder;
      if (selectedValue === "showjumping") {
        folder = "event/showjumping";
      } else if (selectedValue === "horse_race") {
        folder = "event/horse_race";
      } else {
        folder = "event/unknown";
      }

      const fetchData = {
        event_category: selectedValue,
        event_name: eventName,
        event_details: eventDetails,
        event_date: eventDate,
        event_time: eventTime,
        event_entry: eventEntry,
        event_obstacle: eventObstacle,
        event_image: imageUrls,
        event_participants: updatedParticipants,
      };

      console.log(fetchData);

      const response = await fetch(
        `https://equestrian-app-e534c-default-rtdb.firebaseio.com/${folder}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchData),
        }
      );

      if (!response.ok) {
        console.error("Failed to submit data to the server.");
      } else {
        console.log("Data submitted successfully.");
      }
    } catch (error) {
      console.error("An error occurred while submitting data:", error);
    }
  };

  // console.log(imageUpload);
  console.log(imageUrls);

  return (
    <div className={classes.container}>
      <h1>Showjumping Event</h1>

      <div className={classes.formContainer}>
        <EventDetailsForm
          handleInputChange={handleInputChange}
          // uploadFile={uploadFile}
          setImageUpload={setImageUpload}
        />
        <EventsCover
          event={{
            id: uuidv4(),
            event_name: eventName || "Event Name",
            event_details: eventDetails || "Event Details",
            event_date: eventDate || "Event Date",
            event_time: eventTime || "Event Time",
            event_image: imageUpload
              ? URL.createObjectURL(imageUpload)
              : addImgLogo,
          }}
          handleContainerClick={(id) =>
            console.log(`Container clicked with ID: ${id}`)
          }
          formatDateString={(dateString) => {
            return {
              day: "01",
              month: "Jan",
              year: "2024",
            };
          }}
        />
      </div>

      <AddParticipants onUpdateParticipants={setUpdatedParticipants} />
      <button onClick={onSubmitHandler} className={classes.uploadButton}>
        Upload Event
      </button>
    </div>
  );
};

export default AddShowjumpingEvents;

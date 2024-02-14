import React, { useEffect, useState } from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import AddImg from "../../../Images/add-image.png";

import classes from "./AddShowjumpingEvents.module.css";
import AddParticipants from "./AddParticipants/Index";

const AddShowjumpingEvents = () => {
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventEntry, setEventEntry] = useState("");
  // const [eventPhotos, setEventPhotos] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [showEnteredForm, setShowEnteredForm] = useState(true);
  const imagesListRef = ref(storage, "images/");
  //   console.log(imageUrls);
  const [updatedParticipants, setUpdatedParticipants] = useState([]);

  const updateParticipantsData = (data) => {
    setUpdatedParticipants(data);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

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
      case "eventPhotos":
        setImageUpload(value);
        break;
      default:
        break;
    }
    setShowEnteredForm(true);
  };
  const uploadFile = async () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrls([url]); // Replace the existing image URLs with the new one
    } catch (error) {
      console.error("Error uploading the file: ", error);
    }
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await listAll(imagesListRef);
        const urls = await Promise.all(
          response.items.map(async (item) => {
            return getDownloadURL(item);
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching image URLs: ", error);
      }
    };

    fetchImageUrls();
  }, [imagesListRef]);

  const onSubmitHandler = async () => {
    try {
      const fetchData = {
        event_name: eventName,
        event_details: eventDetails,
        event_date: eventDate,
        event_time: eventTime,
        event_entry: eventEntry,
        event_image: imageUrls,
        event_participants: updatedParticipants,
      };

      // Assuming that you want to make a POST request to your Firebase Realtime Database
      const response = await fetch(
        "https://equestrian-app-e534c-default-rtdb.firebaseio.com/events.json",
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

  return (
    <div className={classes.container}>
      <h1>Showjumping Event</h1>
      <div className={classes.formContainer}>
        <div className={classes.enteringForm}>
          <h1>Enter Event's Details Here:</h1>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={eventName}
            onChange={handleInputChange}
            className={classes.nameInput}
          />
          <label>Event Details:</label>
          <textarea
            id="w3review"
            name="eventDetails"
            value={eventDetails}
            onChange={handleInputChange}
            rows="7"
            cols="20"
            className={classes.detailsInput}
          ></textarea>
          <label>Event Date and Time:</label>
          <input
            type="date"
            name="eventDate"
            value={eventDate}
            onChange={handleInputChange}
            className={classes.DateInput}
          />
          {/* <label for="appt">Select a time:</label> */}
          <input
            type="time"
            name="eventTime"
            value={eventTime}
            onChange={handleInputChange}
            className={classes.DateInput}
          />
          <input type="submit"></input>
          <label>Free Entry:</label>
          <div className={classes.radioInputs}>
            <label for="yes">Yes</label>
            <input
              type="radio"
              id="value1"
              name="eventEntry"
              value="yes"
              onChange={handleInputChange}
            />
            <label for="no" className={classes.radioNo}>
              No
            </label>
            <input
              type="radio"
              id="value2"
              name="eventEntry"
              value="no"
              onChange={handleInputChange}
            />
          </div>
          <label>Event Photos:</label>
          <input
            type="file"
            name="eventPhotos"
            // value={eventPhotos}
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
            className={classes.imgInput}
          />

          <button onClick={uploadFile}>upload image</button>
          <button onClick={onSubmitHandler}>Submit</button>
        </div>
        {showEnteredForm && (
          <div className={classes.enteredForm}>
            <h1>How event Will look's like:</h1>
            <div className={classes.imgAndDetailsContainer}>
              <div>
                {imageUrls[0] ? (
                  <img
                    src={imageUrls[0]}
                    alt="entered images"
                    className={classes.img}
                  />
                ) : (
                  <img
                    src={AddImg}
                    alt="add images icon"
                    className={classes.addImgIcon}
                  />
                )}
              </div>
              <div className={classes.detailsContainer}>
                <h1>{eventName || "Event Name"}</h1>
                <p>{eventDetails || "Event Details"}</p>
              </div>
            </div>
            <p>{eventDate || "Event Date"}</p>
            <p>{eventTime || "Event Time"}</p>
            <p>{eventEntry || "Event Entry"}</p>
          </div>
        )}
      </div>
      <AddParticipants onUpdateParticipants={updateParticipantsData} />
    </div>
  );
};

export default AddShowjumpingEvents;

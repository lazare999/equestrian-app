import React, { useState } from "react";
import classes from "./EventDetailsForm.module.css";

const EventDetailsForm = ({
  handleInputChange,
  uploadFile,
  setImageUpload,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("showjumping");

  // const handleCategoryChange = (e) => {
  //   setSelectedCategory(e.target.value);
  // };

  return (
    <div className={classes.enteringForm}>
      {/* <h1>Enter Event's Details Here:</h1> */}
      <select
        name="category"
        id="category"
        className="customSelect sources"
        placeholder="Source Type"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="showjumping">showjumping</option>
        <option value="horse_race">horse race</option>
      </select>
      <div className={classes.container1}>
        <label>Event Name:</label>
        <input
          type="text"
          name="eventName"
          onChange={handleInputChange}
          className={classes.nameInput}
        />
        <label>Event Details:</label>
        <textarea
          id="w3review"
          name="eventDetails"
          onChange={handleInputChange}
          rows="7"
          cols="20"
          className={classes.detailsInput}
        ></textarea>
      </div>
      <div className={classes.container1}>
        <div className={classes.dateAndTime}>
          <label>Event Date and Time:</label>
          <input
            type="date"
            name="eventDate"
            onChange={handleInputChange}
            className={classes.DateInput}
          />
          <input
            type="time"
            name="eventTime"
            onChange={handleInputChange}
            className={classes.DateInput}
          />
        </div>
        <div className={classes.radioInputs}>
          <div className="center">
            <label htmlFor="eventEntry">Event Entry:</label>
            <select
              name="eventEntry"
              id="entry"
              className="customSelect sources"
              placeholder="Source Type"
              onChange={handleInputChange}
            >
              <option value="free entry">Free Entry</option>
              <option value="need ticket">Need Ticket</option>
            </select>
            {selectedCategory === "showjumping" ? (
              <label>Obstacle Height</label>
            ) : (
              <label>Racetrack Length</label>
            )}
            <input
              type="number"
              name="eventObstacle"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <label>Event Photos:</label>
        <input
          type="file"
          name="eventPhotos"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
          className={classes.imgInput}
        />
        <button onClick={uploadFile}>upload image</button>
      </div>
    </div>
  );
};

export default EventDetailsForm;

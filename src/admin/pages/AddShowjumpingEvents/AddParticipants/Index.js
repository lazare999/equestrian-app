import React, { useState, useRef } from "react";
import SelectComponent from "./Select/Index";
import classes from "./AddParticipants.module.css";
import athleteIcon from "../../../../Images/Icons/jockey.png";
import horseIcon from "../../../../Images/Icons/equestrian.png";
import lisiLake from "../../../../Images/ClubLogos/Lisi-lake.jpg";
import menes from "../../../../Images/ClubLogos/menes.jpg";
import kachreti from "../../../../Images/ClubLogos/kachreti.jpg";

const clubIcons = {
  "Lisi lake": lisiLake,
  Menes: menes,
  "Kachretis ambasadori": kachreti,
};

const AddParticipants = ({ onUpdateParticipants }) => {
  const selectComponentRef = useRef();

  const [state, setState] = useState({
    athlete: "",
    horse: "",
    club: "",
    participants: [],
    editingIndex: null,
  });

  const { athlete, horse, club, participants, editingIndex } = state;

  const addParticipant = () => {
    if (athlete.trim() !== "" && horse.trim() !== "" && club.trim() !== "") {
      const updatedParticipants =
        editingIndex !== null
          ? participants.map((participant, index) =>
              index === editingIndex ? { athlete, horse, club } : participant
            )
          : [...participants, { athlete, horse, club }];

      // Add index + 1 to the data before updating the state and calling onUpdateParticipants
      const updatedParticipantsWithIndex = updatedParticipants.map(
        (participant, index) => ({ ...participant, index: index + 1 })
      );

      setState({
        ...state,
        participants: updatedParticipantsWithIndex,
        editingIndex: null,
        athlete: "",
        horse: "",
        club: "",
      });

      // Log the updated participants array
      console.log("Updated Participants:", updatedParticipantsWithIndex);
      onUpdateParticipants(updatedParticipantsWithIndex);

      if (selectComponentRef.current) {
        selectComponentRef.current.resetValue();
      }
    }
  };

  const editParticipant = (index) => {
    const participantToEdit = participants[index];
    setState({
      ...state,
      athlete: participantToEdit.athlete,
      horse: participantToEdit.horse,
      club: participantToEdit.club,
      editingIndex: index,
    });
  };

  const deleteParticipant = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setState({
      ...state,
      participants: updatedParticipants,
      editingIndex: null,
    });
  };

  const options = [
    { value: "Lisi lake", label: "Lisi lake" },
    { value: "Menes", label: "Menes" },
    { value: "Kachretis ambasadori", label: "Kachretis ambasadori" },
  ];

  return (
    <div className={classes.container}>
      <h1>Add Participant:</h1>

      <div className={classes.participantSection}>
        <div className={classes.inputContainer}>
          <div className={classes.inputWithIcon}>
            <input
              type="text"
              value={athlete}
              onChange={(e) => setState({ ...state, athlete: e.target.value })}
              placeholder="Athlete"
              className={classes.athleteInput}
            />
          </div>
        </div>

        <div className={classes.inputContainer}>
          <input
            type="text"
            value={horse}
            onChange={(e) => setState({ ...state, horse: e.target.value })}
            placeholder="Horse"
            className={classes.horseInput}
          />
        </div>

        <div className={classes.inputContainer}>
          <SelectComponent
            ref={selectComponentRef}
            value={club}
            onChange={(selectedOption) =>
              setState({ ...state, club: selectedOption })
            }
            options={options.map((option) => ({
              ...option,
              value: option.label,
            }))}
          />
        </div>

        <button onClick={addParticipant} className={classes.button}>
          {editingIndex !== null ? "Update Participant" : "Add Participant"}
        </button>
      </div>
      <hr />
      <ol type="1">
        {participants.map((participant, index) => (
          <div key={index} className={classes.listContainer}>
            <li className={classes.listItems}>
              <p>{index + 1}.</p>
              <div className={classes.participantRider}>
                <img
                  src={athleteIcon}
                  alt="Rider icon"
                  className={classes.icon}
                />
                <p>: {participant.athlete}</p>
              </div>
              <div className={classes.participantHorse}>
                <img
                  src={horseIcon}
                  alt="Horse icon"
                  className={classes.icon}
                />
                <p>: {participant.horse}</p>
              </div>
              <div className={classes.participantClub}>
                <p>Club</p>
                <img
                  src={clubIcons[participant.club]}
                  alt={`${participant.club} icon`}
                />
              </div>
            </li>
            <div className={classes.participantsDiv}>
              <button
                className={classes.button}
                onClick={() => editParticipant(index)}
              >
                Edit
              </button>
              <button
                className={classes.button}
                onClick={() => deleteParticipant(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default AddParticipants;

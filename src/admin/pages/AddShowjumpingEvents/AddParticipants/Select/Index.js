import React, { useState, useEffect } from "react";
import Select from "react-select";
// import lisiLake from "Images/ClubLogos/Lisi-lake.jpg";
// import Menes from "Images/ClubLogos/menes.jpg";
// import kachreti from "Images/ClubLogos/kachreti.jpg";
import classes from "./SelectComponent.module.css";

const CustomOption = ({ innerProps, label, data }) => (
  <div className={classes.customOption} {...innerProps}>
    <img src={data.icon} alt="icon" className={classes.icon} />
    {label}
  </div>
);

const CustomValue = ({ innerProps, data }) => (
  <div className={classes.customValue} {...innerProps}>
    <img src={data.icon} alt="icon" className={classes.icon} />
    {data.label}
  </div>
);

const SelectComponent = ({ value, onChange, options }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const lisiLake = process.env.PUBLIC_URL + "/Images/ClubLogos/Lisi-lake.jpg";
  const Menes = process.env.PUBLIC_URL + "/Images/ClubLogos/menes.jpg";
  const kachreti = process.env.PUBLIC_URL + "/Images/ClubLogos/kachreti.jpg";

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);
  const clubOptions = options.map((option) => {
    let icon;
    switch (option.value) {
      case "Lisi lake":
        icon = lisiLake;
        break;
      case "Menes":
        icon = Menes;
        break;
      case "Kachretis ambasadori":
        icon = kachreti;
        break;
      default:
        icon = null; // Set a default icon if needed
    }

    return {
      ...option,
      icon,
    };
  });

  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      // Add your custom styles for the valueContainer here
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "8px",
      display: "flex",
    }),
  };

  const selectedOption = selectedValue
    ? clubOptions.find((option) => option.value === selectedValue)
    : null;

  return (
    <div className={classes.customSelect}>
      <Select
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedValue(selectedOption ? selectedOption.value : null);
          onChange(selectedOption ? selectedOption.value : null);
        }}
        options={clubOptions}
        components={{
          Option: CustomOption,
          SingleValue: CustomValue,
        }}
        isSearchable={false}
        styles={customStyles}
      />
    </div>
  );
};

const ForwardedSelectComponent = React.forwardRef(SelectComponent);

export default ForwardedSelectComponent;

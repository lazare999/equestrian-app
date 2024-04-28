import React from "react";
import { Link } from "react-router-dom";

import classes from "./Sponsors.module.css";

const Sponsors = () => {
  const FAKE_DATA = [
    {
      sponsor1: {
        link: "https://l.facebook.com/l.php?u=http%3A%2F%2Fculture.gov.ge%2F%3Ffbclid%3DIwAR39FsEgBAybIbnYA1Mu9XfGH056gEeQAjS8PHKnFUuTzM1Qh4d-f4IFLIM&h=AT3jzlBIFnzRLXgbaAIiiFUtLiFwbil_2-4Ipb0KlNsPP4Ja7obUOFMSU6fc8VoJ2oTQhwPbKfN_eCIo7d2fZhRjmoQdYq8T-Yavq9mGO-g-dapniOEjRVI3sXWYlf15eoxUxA",
        name: "საქართველოს კულტურისა და სპორტის სამინისტრო",
        image: "images/SponsorsImages/sponsor1.jpg",
      },
    },
    {
      sponsor2: {
        link: "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fequestrian_sport_Federation%3Ffbclid%3DIwAR3UXdNFWn20_A0v_IVJNmJV6f0-44bYbymbDkgp0eGAUwFhvrmUMnVj5u4&h=AT3rbOm9SeNJSJIGlasT4yjvsvGzWuQD4sXp8KAN_HtP8_6432YaUeI6OEm21CJCgmpnQSAhdGRAfQj0_7AMmmVXKTJE2vyQvc6DMrxSZMvZ688-u_2exLkkMr3JVA_vFJR9",
        name: "საქართველოს საცხენოსნო სპორტის ეროვნული ფედერაცია",
        image: "images/Logo.jpg",
      },
    },
    {
      sponsor3: {
        link: "https://gulf.ge/",
        name: "Gulf",
        image: "images/SponsorsImages/sponsor2.jpg",
      },
    },
  ];

  return (
    <div className={classes.mainContainer}>
      {FAKE_DATA.map((sponsor, index) => (
        <Link
          key={index}
          to={sponsor[`sponsor${index + 1}`].link}
          target="_blank" // open link in a new tab/window
          className={classes.container}
        >
          <img
            src={
              process.env.PUBLIC_URL +
              "/" +
              sponsor[`sponsor${index + 1}`].image
            }
            alt={`sponsor${index + 1}`}
            className={classes.img}
          />
          <h3>{sponsor[`sponsor${index + 1}`].name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Sponsors;

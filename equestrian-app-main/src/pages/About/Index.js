import React from "react";

import AboutContent from "../../components/AboutContent/Index";
import ContactUs from "../../components/ContactUs/Index";

import classes from "./About.module.css";

const About = () => {
  return (
    <div>
      <h1 className={classes.title}>About</h1>
      <div>
        <AboutContent />
      </div>
      <h1 className={classes.title}>Contact Us</h1>
      <ContactUs />
    </div>
  );
};

export default About;

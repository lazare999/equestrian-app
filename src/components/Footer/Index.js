import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.footer}>
        <h2>Georgian Equsetrian Federation ©</h2>
        <p>
        📧 Gmail: <a href="gmail.com">lazare.osiashvili9@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;

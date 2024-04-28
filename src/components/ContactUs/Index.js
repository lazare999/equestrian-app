import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import classes from "./ContactUs.module.css";

const ContactUs = () => {
  const form = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_rlxfe4q", "template_rwwhjkh", form.current, {
        publicKey: "rFtrrBD8mMq1nyYVh",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className={classes.container}>
      <form className={classes.section} ref={form} onSubmit={submitHandler}>
        <div className={classes.inputsContainer}>
          <input
            className={classes.inputs}
            type="text"
            placeholder="FIRST NAME"
            name="user_name"
            required
          />
          <input
            className={classes.inputs}
            type="text"
            placeholder="PHONE"
            name="user_Phone"
            required
          />
          <input
            className={classes.inputs}
            type="email"
            placeholder="E-MAIL"
            name="user_email"
            required
          />
        </div>
        <textarea
          className={classes.textarea}
          placeholder="ENTER MESSAGE HERE..."
          name="message"
          cols="30"
          rows="8"
        ></textarea>
        <button type="submit" className={classes.button}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ContactUs;

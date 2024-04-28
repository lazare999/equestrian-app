import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

// import logo from "../../Images/Logo.jpg";
// import logo from "../../../public/Images/Logo.jpg";
import classes from "./Header.module.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    closeMenu();
  };

  return (
    <div className={classes.container}>
      <NavLink to="/" onClick={() => setActiveLink("")}>
        <img
          src={process.env.PUBLIC_URL + "/Images/Logo.jpg"}
          alt="georgian equestrian federation logo"
          className={classes.logo}
          title="naviget home page"
        />
      </NavLink>

      {/* Burger Button for Small Screens */}
      <FontAwesomeIcon
        icon={faBars}
        size="2x"
        className={classes.burgerIcon}
        onClick={toggleMenu}
      />

      {/* Navigation for Larger Screens */}
      <div
        className={`${classes.category} ${showMenu ? classes.showMenu : ""}`}
      >
        <Link
          to="/showjumping-events"
          state={{ eventType: "showjumping" }}
          className={`${classes.navLink} ${
            activeLink === "showjumping-events" ? classes.activeNavLink : ""
          }`}
          onClick={() => handleLinkClick("showjumping-events")}
        >
          Showjumping
        </Link>

        <Link
          to="/showjumping-events"
          state={{ eventType: "horse_race" }}
          className={`${classes.navLink} ${
            activeLink === "horse_race" ? classes.activeNavLink : ""
          }`}
          onClick={() => handleLinkClick("horse_race")}
        >
          Horse Race
        </Link>
        {/* <p onClick={() => handleLinkClick("horse-race")}>Horse Race</p> */}
        <p onClick={() => handleLinkClick("tours")}>Tours</p>
        <NavLink
          to="/stables"
          className={`${classes.navLink} ${
            activeLink === "stables" ? classes.activeNavLink : ""
          }`}
          onClick={() => handleLinkClick("stables")}
        >
          Stables
        </NavLink>
        <NavLink
          to="/about"
          className={`${classes.navLink} ${
            activeLink === "about" ? classes.activeNavLink : ""
          }`}
          onClick={() => handleLinkClick("about")}
        >
          About
        </NavLink>

        <FontAwesomeIcon
          icon={faUser}
          size="2xl"
          className={classes.profileIcon}
        />
      </div>
    </div>
  );
};

export default Header;

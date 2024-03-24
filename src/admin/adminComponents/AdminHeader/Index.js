import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./AdminHeader.module.css";

const AdminHeader = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className={classes.container}>
      <h1>Admin Panel</h1>
      <nav>
        <NavLink
          to="/admin/add-showjumping-event"
          className={`${classes.navLinkItem} ${
            activeLink === "add-showjumping-event"
              ? classes.activeNavLinkItem
              : ""
          }`}
          onClick={() => handleLinkClick("add-showjumping-event")}
        >
          Showjumpings
        </NavLink>

        <NavLink
          to="/admin/add-stables"
          className={`${classes.navLinkItem} ${
            activeLink === "add-stables" ? classes.activeNavLinkItem : ""
          }`}
          onClick={() => handleLinkClick("add-stables")}
        >
          Stables
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminHeader;

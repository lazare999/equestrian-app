import React from "react";

import classes from "./AdminLayout.module.css";
import AdminHeader from "../AdminHeader/Index";

const AdminLayout = ({ children }) => {
  return (
    <div className={classes.page}>
      <AdminHeader />
      {children}
    </div>
  );
};

export default AdminLayout;

import React from "react";
import Header from "../Header/Index";
import Footer from "../Footer/Index";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

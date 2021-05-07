import React from "react";
import MainHeader from "./header";

const Layout = ({ children }) => {
  return (
    <div className='main-wrapper'>
      <MainHeader />
      <div className='main-container py-2'>{children}</div>
    </div>
  );
};

export default Layout;

import React from "react";
import Navbar from "components/Navbar";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default PublicLayout;

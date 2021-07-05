import React from "react";
import Navbar from "components/Navbar";
import { Box } from "@chakra-ui/react";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box bg="gray.50" h={"89vh"}>
        {children}
      </Box>
    </>
  );
};

export default PublicLayout;

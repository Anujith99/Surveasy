import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import { isEmpty } from "helpers/utils";

const PublicLayout = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user.info);

  const isLoggedIn = () => {
    if (isEmpty(userInfo)) {
      return (
        <>
          <Navbar />
          <Box bg="gray.50" h={"89vh"}>
            {children}
          </Box>
        </>
      );
    } else {
      return <Redirect to="/dashboard" />;
    }
  };
  return <>{isLoggedIn()}</>;
};

export default PublicLayout;

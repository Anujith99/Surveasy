import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import { isEmpty } from "helpers/utils";

const PublicLayout = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user.info);

  const isLoggedIn = () => {
    if (isEmpty(userInfo)) {
      return (
        <Flex direction="column" height="100%">
          <Navbar type="public" />
          <Box bg="gray.50" flexGrow={1}>
            {children}
          </Box>
        </Flex>
      );
    } else {
      return <Redirect to="/dashboard" />;
    }
  };
  return <>{isLoggedIn()}</>;
};

export default PublicLayout;

import React from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { isEmpty } from "helpers/utils";
import { Box } from "@chakra-ui/react";
import Navbar from "components/Navbar";

const PrivateLayout = ({ children, location }) => {
  const { userInfo } = useSelector((state) => state.user.info);

  const isLoggedIn = () => {
    if (isEmpty(userInfo)) {
      return (
        <Redirect
          to={{ pathname: "/signin", state: { from: location.pathname } }}
        />
      );
    } else {
      return (
        <>
          <Navbar type="private" />
          <Box>{children}</Box>
        </>
      );
    }
  };
  return <>{isLoggedIn()}</>;
};

export default PrivateLayout;

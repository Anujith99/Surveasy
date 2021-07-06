import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";

import { logoutUser } from "actions/users/actions";

const DashboardHome = () => {
  const dispatch = useDispatch();

  const logout = () => dispatch(logoutUser());
  return (
    <div>
      <h1>Dashboard Home</h1>
      <Button mt={2} colorScheme="orange" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardHome;

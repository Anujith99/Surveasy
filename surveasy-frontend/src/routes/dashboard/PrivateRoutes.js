import React from "react";
import { Route } from "react-router-dom";
import DashboardHome from "pages/dashboard/DashboardHome";

const PrivateRoutes = () => {
  return (
    <>
      <Route exact path="/dashboard" component={DashboardHome} />
    </>
  );
};

export default PrivateRoutes;

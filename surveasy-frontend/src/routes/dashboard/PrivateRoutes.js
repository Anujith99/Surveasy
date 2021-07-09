import React from "react";
import { Route } from "react-router-dom";
import PrivateLayout from "layouts/dashboard/PrivateLayout";
import DashboardHome from "pages/dashboard/DashboardHome";

const PrivateRoutes = () => {
  return (
    <>
      <Route
        exact
        path="/dashboard"
        render={(props) => (
          <PrivateLayout {...props}>
            <DashboardHome {...props} />
          </PrivateLayout>
        )}
      />
    </>
  );
};

export default PrivateRoutes;

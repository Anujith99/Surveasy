import React from "react";
import PublicRoutes from "routes/dashboard/PublicRoutes";
import PrivateRoutes from "routes/dashboard/PrivateRoutes";

function DashboardApp() {
  return (
    <>
      <PublicRoutes />
      <PrivateRoutes />
    </>
  );
}

export default DashboardApp;

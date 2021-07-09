import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PublicRoutes from "routes/dashboard/PublicRoutes";
import PrivateRoutes from "routes/dashboard/PrivateRoutes";
import LoadingScreen from "components/LoadingScreen";

import { getCurrentUser } from "actions/users/actions";

function DashboardApp() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user.info);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <PublicRoutes />
          <PrivateRoutes />
        </>
      )}
    </>
  );
}

export default DashboardApp;

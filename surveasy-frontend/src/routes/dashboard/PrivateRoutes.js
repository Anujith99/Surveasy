import React from "react";
import { Route } from "react-router-dom";
import PrivateLayout from "layouts/dashboard/PrivateLayout";
import DashboardHome from "pages/dashboard/DashboardHome";
import SurveyHome from "pages/dashboard/SurveyHome";
import EditSurvey from "pages/dashboard/EditSurvey";

const privateLayoutRoutes = [
  { exact: true, path: "/dashboard", component: DashboardHome },
  { exact: true, path: "/dashboard/survey/:id", component: SurveyHome },
  { exact: true, path: "/dashboard/survey/:id/edit", component: EditSurvey },
];

const PrivateRoutes = () => {
  return (
    <>
      {privateLayoutRoutes.map(
        ({ exact, path, component: Component }, index) => (
          <Route
            key={index}
            exact={exact}
            path={path}
            render={(props) => (
              <PrivateLayout {...props}>
                <Component {...props} />
              </PrivateLayout>
            )}
          />
        )
      )}
    </>
  );
};

export default PrivateRoutes;

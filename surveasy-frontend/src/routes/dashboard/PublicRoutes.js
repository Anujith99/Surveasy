import React from "react";
import { Route } from "react-router-dom";

import PublicLayout from "layouts/dashboard/PublicLayout";
import HomePage from "pages/dashboard/Homepage";
import SignInPage from "pages/dashboard/SignInPage";
import SignUpPage from "pages/dashboard/SignUpPage";

const publicLayoutRoutes = [
  {
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    exact: true,
    path: "/signin",
    component: SignInPage,
  },
  {
    exact: true,
    path: "/signup",
    component: SignUpPage,
  },
];

const PublicRoutes = () => {
  return (
    <>
      {publicLayoutRoutes.map(
        ({ exact, path, component: Component }, index) => (
          <Route
            key={index}
            exact={exact}
            path={path}
            render={(props) => (
              <PublicLayout>
                <Component {...props} />
              </PublicLayout>
            )}
          />
        )
      )}
    </>
  );
};

export default PublicRoutes;

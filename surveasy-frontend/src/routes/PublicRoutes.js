import React from "react";
import { Route } from "react-router-dom";

import PublicLayout from "layouts/PublicLayout";
import HomePage from "pages/Homepage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";

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

const PublicLayoutRoutes = () => {
  return (
    <>
      {publicLayoutRoutes.map(
        ({ exact, path, component: Component }, index) => (
          <Route
            key={index}
            exact={exact}
            path={path}
            render={(props) => <Component {...props} />}
          />
        )
      )}
    </>
  );
};

const PublicRoutes = () => {
  return (
    <>
      <Route
        path="/"
        render={(props) => (
          <PublicLayout {...props}>
            <PublicLayoutRoutes {...props} />
          </PublicLayout>
        )}
      />
    </>
  );
};

export default PublicRoutes;

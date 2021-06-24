import React from "react";
import { Route } from "react-router-dom";

import PublicLayout from "layouts/PublicLayout";
import HomePage from "pages/Homepage";

const routes = [
  {
    exact: true,
    path: "/",
    layout: PublicLayout,
    component: HomePage,
  },
];

const PublicRoutes = () => {
  return (
    <>
      {routes.map(
        ({ exact, path, component: Component, layout: Layout }, index) => (
          <Route
            key={index}
            exact={exact}
            to={path}
            render={(props) => (
              <Layout {...props}>
                <Component {...props} />
              </Layout>
            )}
          />
        )
      )}
    </>
  );
};

export default PublicRoutes;

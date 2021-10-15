import Survey from "pages/survey/Survey";
import React from "react";
import { Route } from "react-router-dom";

const SurveyRoutes = () => {
  return (
    <>
      <Route exact={true} path="/survey/:id/:preview?" component={Survey} />
    </>
  );
};

export default SurveyRoutes;

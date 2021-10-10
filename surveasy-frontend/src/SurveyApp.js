import React, { useEffect } from "react";
import SurveyRoutes from "routes/survey/SurveyRoutes";

const SurveyApp = () => {
  useEffect(() => {
    return () => {
      if (document.body.classList.contains("survey")) {
        document.body.classList.remove("survey");
      }
    };
  }, []);
  return <SurveyRoutes />;
};

export default SurveyApp;

import React from "react";
import { useParams } from "react-router-dom";

const SurveyHome = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>This is the survey home for {id}</h1>
    </div>
  );
};

export default SurveyHome;

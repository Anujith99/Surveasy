import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { SurveyContext } from "helpers/context";
import React, { useContext } from "react";

const LongText = ({ id }) => {
  const context = useContext(SurveyContext);
  const answer = context ? context.getAnswer(id).answer : undefined;

  const handleChange = (e) => {
    if (context) {
      context.updateAnswer(id, e.target.value);
    }
  };
  return (
    <Box>
      <Textarea
        placeholder="What's your answer?"
        maxH="sm"
        value={answer}
        onChange={handleChange}
      />
    </Box>
  );
};

export default LongText;

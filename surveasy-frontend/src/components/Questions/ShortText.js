import React, { useContext } from "react";
import { Box, Input } from "@chakra-ui/react";
import { SurveyContext } from "helpers/context";
import FormError from "components/Forms/FormError";

const ShortText = ({ id }) => {
  const context = useContext(SurveyContext);
  const answer = context ? context.getAnswer(id).answer : undefined;
  const handleChange = (e) => {
    if (context) {
      context.updateAnswer(id, e.target.value);
    }
  };
  return (
    <>
      <Box>
        <Box maxW={400} mt={3} mb={4}>
          <Input
            w={"100%"}
            variant="flushed"
            placeholder="What's your answer?"
            value={answer}
            onChange={handleChange}
          />
        </Box>
      </Box>
      {context && context.questionError ? (
        <FormError>This answer is required</FormError>
      ) : null}
    </>
  );
};

export default ShortText;

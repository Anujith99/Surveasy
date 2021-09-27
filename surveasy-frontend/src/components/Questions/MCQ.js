import React, { useContext } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { SurveyContext } from "helpers/context";

const MCQ = ({ options, id }) => {
  const context = useContext(SurveyContext);
  const answer = context ? context.getAnswer(id).answer : undefined;

  const handleChange = (val) => {
    if (context) {
      context.updateAnswer(id, val);
    }
  };
  return (
    <RadioGroup value={answer} onChange={handleChange}>
      <Stack>
        {options.map((option) => (
          <Radio colorScheme="teal" key={option.id} value={option.value}>
            {option.text}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default MCQ;

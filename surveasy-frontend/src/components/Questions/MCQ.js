import React, { useContext } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { SurveyContext } from "helpers/context";
import FormError from "components/Forms/FormError";

const MCQ = ({ options, id }) => {
  const context = useContext(SurveyContext);
  const answer = context ? context.getAnswer(id).answer : undefined;

  const handleChange = (val) => {
    if (context) {
      context.updateAnswer(id, val);
    }
  };
  return (
    <>
      <RadioGroup value={answer} onChange={handleChange}>
        <Stack>
          {options.map((option) => (
            <Radio colorScheme="teal" key={option.id} value={option.value}>
              {option.text}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {context && context.questionError ? (
        <FormError>Please select one option</FormError>
      ) : null}
    </>
  );
};

export default MCQ;

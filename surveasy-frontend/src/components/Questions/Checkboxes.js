import React, { useContext } from "react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { SurveyContext } from "helpers/context";
import FormError from "components/Forms/FormError";

const Checkboxes = ({ options, id }) => {
  const context = useContext(SurveyContext);
  const answer = context ? context.getAnswer(id).answer : undefined;

  const handleChange = (val) => {
    if (context) {
      context.updateAnswer(id, val);
    }
  };
  return (
    <>
      <CheckboxGroup onChange={handleChange} value={answer}>
        <Stack>
          {options.map((option) => (
            <Checkbox colorScheme="teal" key={option.id} value={option.value}>
              {option.text}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      {context && context.questionError ? (
        <FormError>Please select atleast 1 option</FormError>
      ) : null}
    </>
  );
};

export default Checkboxes;

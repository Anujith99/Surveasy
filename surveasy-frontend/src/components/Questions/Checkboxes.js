import React, { useContext } from "react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { SurveyContext } from "helpers/context";

const Checkboxes = ({ options, id }) => {
  const context = useContext(SurveyContext);
  const answer = context ? context.getAnswer(id).answer : undefined;

  const handleChange = (val) => {
    if (context) {
      context.updateAnswer(id, val);
    }
  };
  return (
    <CheckboxGroup onChange={handleChange} value={answer}>
      <Stack>
        {options.map((option) => (
          <Checkbox colorScheme="teal" key={option.id} value={option.value}>
            {option.text}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};

export default Checkboxes;

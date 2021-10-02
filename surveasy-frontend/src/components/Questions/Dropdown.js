import { Box, Select } from "@chakra-ui/react";
import FormError from "components/Forms/FormError";
import { SurveyContext } from "helpers/context";
import React, { useContext } from "react";

const Dropdown = ({ options, id }) => {
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
        <Select
          name="dropdown"
          w={"100%"}
          placeholder="Select an option"
          value={answer}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.text}
            </option>
          ))}
        </Select>
      </Box>
      {context && context.questionError ? (
        <FormError>Please select one option</FormError>
      ) : null}
    </>
  );
};

export default Dropdown;

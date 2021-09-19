import React from "react";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

const Checkboxes = ({ options }) => {
  return (
    <CheckboxGroup>
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

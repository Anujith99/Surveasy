import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

const MCQ = ({ options }) => {
  return (
    <RadioGroup>
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

import { Box, Select } from "@chakra-ui/react";
import React from "react";

const Dropdown = ({ options }) => {
  return (
    <Box>
      <Select name="dropdown" w={"100%"} placeholder="Select an option">
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default Dropdown;

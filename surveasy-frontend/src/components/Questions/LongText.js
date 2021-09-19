import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";

const LongText = () => {
  return (
    <Box>
      <Textarea placeholder="What's your answer?" maxH="sm" />
    </Box>
  );
};

export default LongText;

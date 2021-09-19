import React from "react";
import { Box, Input } from "@chakra-ui/react";

const ShortText = () => {
  return (
    <Box>
      <Box maxW={400} mt={3} mb={4}>
        <Input w={"100%"} variant="flushed" placeholder="What's your answer?" />
      </Box>
    </Box>
  );
};

export default ShortText;

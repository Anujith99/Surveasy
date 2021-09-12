import React from "react";
import { Box, Input } from "@chakra-ui/react";

const EditShortAnswer = () => {
  return (
    <Box maxW={400} mt={3} mb={4}>
      <Input
        w={"100%"}
        variant="flushed"
        placeholder="Short Answer Question"
        readOnly={true}
      />
    </Box>
  );
};

export default EditShortAnswer;

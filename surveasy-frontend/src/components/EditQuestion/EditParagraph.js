import { Box, Textarea } from "@chakra-ui/react";
import React from "react";

const EditParagraph = () => {
  return (
    <Box my={2}>
      <Textarea placeholder="Paragraph Question" readOnly={true} maxH="sm" />
    </Box>
  );
};

export default EditParagraph;

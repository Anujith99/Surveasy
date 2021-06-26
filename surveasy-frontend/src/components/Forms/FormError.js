import React from "react";
import { Text } from "@chakra-ui/react";

const FormError = ({ mt = 0.5, children }) => {
  return (
    <Text mt={mt} fontWeight={500} fontSize="sm" color="red.500">
      {children}
    </Text>
  );
};

export default FormError;

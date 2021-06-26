import React from "react";
import { Text } from "@chakra-ui/react";

const FormError = ({ mt = 1, children }) => {
  return (
    <Text mt={mt} fontWeight={500} color="red.500">
      {children}
    </Text>
  );
};

export default FormError;

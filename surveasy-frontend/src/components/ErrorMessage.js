import { Box, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const ErrorMessage = ({ children }) => {
  return (
    <Box
      py={{ base: 2, md: 3 }}
      px={{ base: 3, md: 5 }}
      border="1px"
      borderColor="red.500"
      borderRadius="10px"
      bgColor="red.50"
      textAlign="center"
    >
      <Text fontWeight="bolder" color="red.500">
        <Icon mb={1} as={FaExclamationCircle} /> {children}
      </Text>
    </Box>
  );
};

export default ErrorMessage;

import React from "react";
import Container from "components/Container";
import { Flex, Text } from "@chakra-ui/react";

const SuccessMessage = () => {
  return (
    <Container mode="card" pb={0} pt={{ base: 6, md: 4 }} px={1}>
      <Flex
        flexDirection="column"
        p={{ base: 3, md: 4 }}
        bg="white"
        shadow="sm"
        borderRadius={4}
      >
        <Text fontSize="xl" fontWeight="semibold">
          Your response has been submitted successfully!
        </Text>
        <Text mt={1}>Thank you for participating in this survey.</Text>
      </Flex>
    </Container>
  );
};

export default SuccessMessage;

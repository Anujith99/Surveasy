import React from "react";
import SignUpForm from "components/Forms/SignUpForm";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";

const SignUpPage = () => {
  return (
    <Box h={"95%"}>
      <Flex h={"100%"} align={"center"} justify={"center"}>
        <Box
          px={{ base: 4, sm: 5 }}
          py={{ base: 5, sm: 6 }}
          w={{ base: "305px", sm: "370px" }}
          bg="white"
          borderRadius="md"
          shadow="base"
        >
          <VStack justify="center">
            <Text fontSize={"2xl"} fontWeight={500}>
              Sign Up
            </Text>
          </VStack>
          <Box pt={{ base: 4, sm: 6 }}>
            <SignUpForm />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUpPage;

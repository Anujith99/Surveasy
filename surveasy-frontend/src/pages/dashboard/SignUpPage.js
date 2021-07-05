import React from "react";
import SignUpForm from "components/Forms/SignUpForm";
import { Box, Flex, VStack, Text, useMediaQuery } from "@chakra-ui/react";

const SignUpPage = () => {
  const [isHeightEnough] = useMediaQuery("(min-height:570px)");
  return (
    <Box h={"100%"}>
      <Flex
        h={"100%"}
        align={isHeightEnough ? "center" : "start"}
        justify={"center"}
      >
        <Box
          px={{ base: 4, sm: 5 }}
          py={{ base: 3, sm: 5 }}
          w={{ base: "305px", sm: "370px" }}
          bg="white"
          borderRadius="md"
          shadow="base"
          my={isHeightEnough ? 0 : 3}
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

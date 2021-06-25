import React from "react";
import SignInForm from "components/Forms/SignInForm";
import { Box, Flex, VStack, Text, Avatar } from "@chakra-ui/react";

const SignInPage = () => {
  return (
    <Box h={"90%"}>
      <Flex h={"100%"} align={"center"} justify={"center"}>
        <Box
          px={5}
          py={6}
          w={"350px"}
          bg="white"
          borderRadius="md"
          shadow="base"
        >
          <VStack justify="center">
            <Avatar bg={"teal.400"} />
            <Text fontSize={"2xl"} fontWeight={500}>
              Sign In
            </Text>
          </VStack>
          <Box pt={6}>
            <SignInForm />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignInPage;

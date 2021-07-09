import React from "react";
import SignInForm from "components/Forms/SignInForm";
import { Box, Flex, VStack, Text, Avatar } from "@chakra-ui/react";

const SignInPage = (props) => {
  return (
    <Box h={"100%"}>
      <Flex h={"100%"} align={"center"} justify={"center"}>
        <Box
          px={{ base: 4, sm: 5 }}
          py={6}
          w={{ base: "300px", sm: "350px" }}
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
          <Box pt={{ base: 5, sm: 6 }}>
            <SignInForm {...props} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignInPage;

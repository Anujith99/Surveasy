import React from "react";
import { Flex, VStack, Box, Spinner } from "@chakra-ui/react";
import { ReactComponent as Logo } from "resources/Surveasy_Logo.svg";

const LoadingScreen = () => {
  return (
    <>
      <Flex
        pos="fixed"
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        bg="white"
        zIndex={2000}
        align="center"
        justify="center"
      >
        <VStack spacing={12}>
          <Box
            width={{ base: "250px", sm: "300px", md: "400px" }}
            height="auto"
          >
            <Logo width="100%" height="100%" />
          </Box>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.400"
            size="xl"
          />
        </VStack>
      </Flex>
    </>
  );
};

export default LoadingScreen;

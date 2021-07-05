import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, VStack, Text, Button } from "@chakra-ui/react";
import Container from "components/Container";
import { ReactComponent as HeroImage } from "resources/HeroImage.svg";

const Homepage = () => {
  return (
    <Container h={{ base: "95%" }}>
      <Box h={"100%"}>
        <Flex
          h={"100%"}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "center" }}
          justify={{ base: "space-evenly", md: "space-between" }}
        >
          <Box maxW={"400px"} mt={-4}>
            <VStack spacing={{ base: 4, md: 6 }} align="start">
              <VStack spacing={2} align="start">
                <Text fontSize={{ base: "xx-large", md: "xxx-large" }}>
                  Quick and Simple
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }}>
                  With Surveasy, you can build custom surveys in quick time and
                  with minimal effort.
                </Text>
              </VStack>
              <Button
                as={Link}
                to="/signup"
                py={{ base: 4, md: 6 }}
                px={{ base: 6, md: 8 }}
                fontSize={{ base: "md", md: "lg" }}
                colorScheme="teal"
              >
                Get Started
              </Button>
            </VStack>
          </Box>
          <Box w={{ base: "300px", md: "400px" }}>
            <HeroImage width="100%" height="100%" />
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default Homepage;

import React from "react";
import Container from "components/Container";
import { Flex, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "assets/submitted-lottie";
import { Link } from "react-router-dom";

const SuccessMessage = ({ isPreview }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Container mode="card" pb={0} pt={{ base: 6, md: 4 }} px={1}>
      <Flex
        flexDirection="column"
        p={{ base: 3, md: 4 }}
        bg="white"
        shadow="sm"
        borderRadius={4}
      >
        {isPreview && (
          <Text textAlign="center" fontWeight="medium">
            Preview Responses Are Not Saved
          </Text>
        )}
        <Flex justifyContent="center">
          <Lottie
            options={defaultOptions}
            width={"50%"}
            height={"50%"}
            isClickToPauseDisabled={true}
          />
        </Flex>
        <Flex flexDirection="column" mt={-2} alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Your response has been submitted successfully!
          </Text>
          <Text mt={1}>Thank you for participating in this survey.</Text>
          <Text fontWeight="medium" fontSize="lg" mt={3}>
            Created Using{" "}
            <Text as={Link} to="/" color="teal.500">
              Surveasy
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SuccessMessage;

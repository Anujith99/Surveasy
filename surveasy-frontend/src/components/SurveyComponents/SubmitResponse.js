import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Flex, Text, Spinner, Button } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "assets/success-lottie.json";

import ErrorMessage from "components/ErrorMessage";

const SubmitResponse = ({ closeModal, onSuccess }) => {
  const { loading, success, error } = useSelector(
    (state) => state.respondent.response
  );

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }
  }, [success, onSuccess]);
  return (
    <>
      <Flex
        flexDirection="column"
        px={success ? 0 : { base: 2, md: 3 }}
        my={3}
        alignItems="center"
        justifyContent="center"
        height={150}
      >
        {loading ? (
          <>
            <Spinner color="teal.500" size="xl" thickness={4} />
            <Text mt={4} fontWeight="medium" fontSize="lg">
              Submitting...
            </Text>
          </>
        ) : error ? (
          <>
            <ErrorMessage>
              Could not submit your response. Please try again.
            </ErrorMessage>
            <Button
              onClick={closeModal}
              colorScheme="teal"
              px={4}
              py={2}
              mt={3}
            >
              Close
            </Button>
          </>
        ) : (
          <>
            <Lottie options={defaultOptions} />
          </>
        )}
      </Flex>
    </>
  );
};

export default SubmitResponse;

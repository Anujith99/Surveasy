import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Flex, Text, Spinner, Button } from "@chakra-ui/react";
import ErrorMessage from "components/ErrorMessage";

const SubmitResponse = ({ closeModal, onSuccess }) => {
  const { loading, success, error } = useSelector(
    (state) => state.respondent.response
  );

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onSuccess();
      }, 2500);
    }
  }, [success, onSuccess]);
  return (
    <>
      <Flex
        flexDirection="column"
        p={3}
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
            <Text>Success!!</Text>
          </>
        )}
      </Flex>
    </>
  );
};

export default SubmitResponse;

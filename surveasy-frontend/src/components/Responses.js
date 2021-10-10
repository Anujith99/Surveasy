import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Text, Button, Icon, Tooltip, Spinner } from "@chakra-ui/react";
import { FaFileExcel, FaPrint } from "react-icons/fa";
import Container from "./Container";
import ResponseCard from "./ResponseComponents/ResponseCard";
import { clearResponses, getResponses } from "actions/responses/actions";
import ErrorMessage from "./ErrorMessage";

const Responses = ({ surveyID }) => {
  const dispatch = useDispatch();
  const { loading, responses, error, errorMessage } = useSelector(
    (state) => state.responses.summary
  );
  useEffect(() => {
    dispatch(getResponses(surveyID));
    return () => {
      dispatch(clearResponses());
    };
  }, [dispatch, surveyID]);
  return (
    <>
      {loading ? (
        <Flex justifyContent="center">
          <Spinner mt={4} color="teal.500" size="xl" />
        </Flex>
      ) : error ? (
        <ErrorMessage>
          {errorMessage !== null
            ? errorMessage
            : "Could not fetch the responses."}
        </ErrorMessage>
      ) : (
        <>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold">
              12 Responses
            </Text>
            <Flex>
              <Tooltip label="Generate Excel Sheet">
                <Button colorScheme="teal" mr={1.5} p={0}>
                  <Icon as={FaFileExcel} />
                </Button>
              </Tooltip>
              <Tooltip label="Print Summary">
                <Button colorScheme="teal" p={0}>
                  <Icon as={FaPrint} />
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
          <Container mode="card" p={0} mt={2} mb={1}>
            <ResponseCard />
          </Container>
        </>
      )}
    </>
  );
};

export default Responses;

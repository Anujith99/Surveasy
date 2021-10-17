import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Text,
  Button,
  Icon,
  Tooltip,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { FaFileExcel } from "react-icons/fa";
import Container from "./Container";
import ResponseCard from "./ResponseComponents/ResponseCard";
import { clearResponses, getResponses } from "actions/responses/actions";
import ErrorMessage from "./ErrorMessage";

const Responses = ({ surveyID }) => {
  const dispatch = useDispatch();
  const { loading, totalResponses, responses, error, errorMessage } =
    useSelector((state) => state.responses.summary);
  useEffect(() => {
    dispatch(getResponses(surveyID));
    return () => {
      dispatch(clearResponses());
    };
  }, [dispatch, surveyID]);

  const downloadExcel = () => {
    let downloadURL =
      process.env.REACT_APP_API_URL + "dashboard/spreadsheet/" + surveyID;
    window.open(downloadURL, "_blank");
  };

  return (
    <>
      {loading ? (
        <Flex justifyContent="center">
          <Spinner mt={4} color="teal.500" size="xl" />
        </Flex>
      ) : error ? (
        <Container mode="card">
          <ErrorMessage>
            {errorMessage !== null
              ? errorMessage
              : "Could not fetch the responses."}
          </ErrorMessage>
        </Container>
      ) : responses.length === 0 ? (
        <Flex w={"100%"} justifyContent="center">
          <Box w="290px" textAlign="center" color="gray.600" mt={4}>
            <Text fontSize="2xl">You have no responses!</Text>
            <Text mt={2}>
              The survey must be activated to accept responses.
            </Text>
          </Box>
        </Flex>
      ) : (
        <>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold">
              {totalResponses && `${totalResponses} Responses`}
            </Text>
            <Flex>
              <Tooltip label="Generate Excel Sheet">
                <Button
                  onClick={downloadExcel}
                  colorScheme="teal"
                  leftIcon={<Icon as={FaFileExcel} />}
                >
                  Create
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
          <Container mode="card" p={0} mt={2} mb={1}>
            {responses.map((response, index) => (
              <ResponseCard key={index} response={response} />
            ))}
          </Container>
        </>
      )}
    </>
  );
};

export default memo(Responses);

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Flex, Button, Icon, Text } from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";
import QuestionCard from "./Questions/QuestionCard";
import { RespondentInfoPreview } from "./EditQuestion/EditRespondentInfo";
import Container from "./Container";

const QuestionsList = () => {
  const { survey } = useSelector((state) => state.survey.surveyHome);
  return (
    <>
      <Box>
        <Flex justifyContent="end">
          <Button
            as={Link}
            to={`/dashboard/survey/${survey._id}/edit`}
            colorScheme="teal"
            leftIcon={<Icon as={FaPencilAlt} />}
          >
            Edit
          </Button>
        </Flex>
        <Flex mt={2} flexDirection="column" alignItems="center">
          {survey.respondentInfo && (
            <Container mode="card" p={0} mb={3}>
              <Flex
                w={"100%"}
                bgColor="white"
                borderRadius={5}
                shadow="sm"
                p={{ base: 3, md: 4 }}
              >
                <RespondentInfoPreview
                  info={survey.respondentInfo}
                  onClick={null}
                />
              </Flex>
            </Container>
          )}
          {survey.surveyQuestions && survey.surveyQuestions.length ? (
            survey.surveyQuestions.map((question) => (
              <QuestionCard question={question} />
            ))
          ) : (
            <Box w="280px" textAlign="center" color="gray.600" mt={4}>
              <Text fontSize="2xl">You have no questions!</Text>
              <Text mt={2}>Click on the 'Edit' button to get started.</Text>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default QuestionsList;

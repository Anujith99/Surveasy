import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Flex, Button, Icon } from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";
import QuestionCard from "./Questions/QuestionCard";

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
          {survey.surveyQuestions && survey.surveyQuestions.length
            ? survey.surveyQuestions.map((question) => (
                <QuestionCard question={question} />
              ))
            : null}
        </Flex>
      </Box>
    </>
  );
};

export default QuestionsList;

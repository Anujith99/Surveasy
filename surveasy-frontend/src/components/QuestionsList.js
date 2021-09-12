import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Icon } from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";

const QuestionsList = () => {
  const { survey } = useSelector((state) => state.survey.surveyHome);
  return (
    <>
      <Box>
        <Button
          as={Link}
          to={`/dashboard/survey/${survey._id}/edit`}
          colorScheme="teal"
          float="right"
          leftIcon={<Icon as={FaPencilAlt} />}
        >
          Edit
        </Button>
      </Box>
    </>
  );
};

export default QuestionsList;

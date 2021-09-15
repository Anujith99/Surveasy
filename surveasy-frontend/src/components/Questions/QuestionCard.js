import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import Container from "components/Container";
import ShortText from "./ShortText";
import LongText from "./LongText";
import Dropdown from "./Dropdown";
import MCQ from "./MCQ";
import Checkboxes from "./Checkboxes";

const QuestionCard = ({ question }) => {
  const renderInput = (questionType) => {
    switch (questionType) {
      case "shortText":
        return <ShortText />;
      case "longText":
        return <LongText />;
      case "dropdown":
        return <Dropdown options={question.options} />;
      case "mcq":
        return <MCQ options={question.options} />;
      case "checkbox":
        return <Checkboxes options={question.options} />;
      default:
        return null;
    }
  };
  return (
    <Container mode="card" p={0} mb={3}>
      <Flex
        flexDirection="column"
        w={"100%"}
        bgColor="white"
        borderRadius={5}
        shadow="sm"
        p={{ base: 3, md: 4 }}
      >
        <Text fontSize={{ base: "lg", md: "xl" }}>
          {question.questionTitle}{" "}
          {question.isRequired && <span style={{ color: "red" }}>*</span>}
        </Text>
        {question.questionDescription && (
          <Text color="gray.500" mt={1} fontSize={{ base: 12, md: 14 }}>
            {question.questionDescription}
          </Text>
        )}
        <Box mt={1.5}>{renderInput(question.questionType)}</Box>
      </Flex>
    </Container>
  );
};

export default QuestionCard;

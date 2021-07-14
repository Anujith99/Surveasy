import {
  Badge,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

const surveys = [
  {
    _id: 100,
    surveyTitle: "Web Developer Survey 2020-2021",
    surveyDescription:
      "Find out everything about web developers in the last year during COVID-19 Pandemic",
    isActive: true,
  },
  {
    _id: 101,
    surveyTitle: "Android Developer Survey 2020-2021",
    surveyDescription:
      "Find out everything about web developers in the last year during COVID-19 Pandemic",
    isActive: false,
  },
  {
    _id: 102,
    surveyTitle: "Java Developer Survey 2020-2021",
    surveyDescription:
      "Find out everything about web developers in the last year during COVID-19 Pandemic",
    isActive: true,
  },
  {
    _id: 103,
    surveyTitle: "Python Developer Survey 2020-2021",
    surveyDescription:
      "Find out everything about web developers in the last year during COVID-19 Pandemic",
    isActive: true,
  },
];

const SurveyListItem = ({ survey }) => {
  return (
    <Flex
      my={2}
      bg="white"
      w="100%"
      shadow="sm"
      borderRadius="md"
      px={3}
      py={4}
      align="center"
      justify="space-between"
      _first={{ mt: 0 }}
      _last={{ mb: 0 }}
      cursor="pointer"
    >
      <Text color="gray.800" fontSize="lg" fontWeight="semibold">
        {survey.surveyTitle}
      </Text>
      <Badge fontSize="md" colorScheme={survey.isActive ? "green" : "gray"}>
        {survey.isActive ? "Active" : "Inactive"}
      </Badge>
    </Flex>
  );
};

const SurveyList = () => {
  return (
    <>
      <Flex>
        <InputGroup w={{ base: "180px", md: "300px" }} mr={1}>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaSearch} color="gray.300" />}
          />
          <Input bg="white" type="text" placeholder="Search for survey" />
        </InputGroup>
        <Select bg="white" w="max-content">
          <option>All Surveys</option>
          <option>Active</option>
          <option>Inactive</option>
        </Select>
      </Flex>
      <Divider my={{ base: 2, md: 3 }} />
      <Flex flexDirection="column">
        {surveys.map((survey) => (
          <SurveyListItem key={survey._id} survey={survey} />
        ))}
      </Flex>
    </>
  );
};

export default SurveyList;

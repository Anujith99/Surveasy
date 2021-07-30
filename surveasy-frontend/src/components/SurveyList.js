import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { getAllSurveys } from "actions/dashboard/actions";
import ErrorMessage from "./ErrorMessage";

// const surveys = [
//   {
//     _id: 100,
//     surveyTitle: "Web Developer Survey 2020-2021",
//     surveyDescription:
//       "Find out everything about web developers in the last year during COVID-19 Pandemic",
//     isActive: true,
//   },
//   {
//     _id: 101,
//     surveyTitle: "Best Cuisines Survey 2020-2021",
//     surveyDescription:
//       "Find out everything about web developers in the last year during COVID-19 Pandemic",
//     isActive: false,
//   },
//   {
//     _id: 102,
//     surveyTitle: "Most Popular Celebrities Survey 2020-2021",
//     surveyDescription:
//       "Find out everything about web developers in the last year during COVID-19 Pandemic",
//     isActive: true,
//   },
//   {
//     _id: 103,
//     surveyTitle: "Worst Travel Destinations Survey 2020-2021",
//     surveyDescription:
//       "Find out everything about web developers in the last year during COVID-19 Pandemic",
//     isActive: true,
//   },
// ];

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
  const dispatch = useDispatch();
  const { loading, surveys, error } = useSelector(
    (state) => state.dashboard.home
  );
  const [filteredSurveys, setFilteredSurveys] = useState(surveys);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllSurveys());
  }, [dispatch]);

  useEffect(() => {
    let results = surveys.filter(
      (s) => s.surveyTitle.toLowerCase().indexOf(search.toLowerCase()) > -1
    );

    setFilteredSurveys(results);
  }, [search, surveys]);
  return (
    <>
      <Flex>
        <InputGroup w={{ base: "180px", md: "300px" }} mr={1}>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaSearch} color="gray.300" />}
          />
          <Input
            bg="white"
            type="text"
            placeholder="Search for survey"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <Divider my={{ base: 2, md: 3 }} />
      <Flex flexDirection="column" align="center">
        {loading ? (
          <Spinner mt={4} color="teal.500" size="xl" />
        ) : error ? (
          <ErrorMessage>
            Error while fetching surveys. Please try again.
          </ErrorMessage>
        ) : surveys.length === 0 ? (
          <Box w="240px" textAlign="center" color="gray.600" mt={4}>
            <Text fontSize="2xl">You have no surveys!</Text>
            <Text mt={2}>Click on the 'Create' button to get started.</Text>
          </Box>
        ) : filteredSurveys.length === 0 ? (
          <Box w="240px" textAlign="center" color="gray.600" mt={4}>
            <Text fontSize="xl">No Surveys Found</Text>
          </Box>
        ) : (
          filteredSurveys.map((survey) => (
            <SurveyListItem key={survey._id} survey={survey} />
          ))
        )}
      </Flex>
    </>
  );
};

export default SurveyList;

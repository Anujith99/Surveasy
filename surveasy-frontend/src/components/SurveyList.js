import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    >
      <Link to={`/dashboard/survey/${survey._id}`}>
        <Text
          color="gray.800"
          fontSize="lg"
          fontWeight="semibold"
          _hover={{ color: "teal.400" }}
          p={1}
          pr={2}
        >
          {survey.surveyTitle}
        </Text>
      </Link>
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

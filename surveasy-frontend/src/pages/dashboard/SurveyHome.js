import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "components/Container";
import {
  Button,
  Flex,
  Icon,
  Text,
  Spinner,
  Heading,
  Tooltip,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { getSurveyById } from "actions/survey/actions";
import {
  FaArrowLeft,
  FaEllipsisV,
  FaEye,
  FaLink,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import ErrorMessage from "components/ErrorMessage";

const SurveyHome = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { survey, loading, error, errorMessage } = useSelector(
    (state) => state.survey.surveyHome
  );
  const breakpoint = useBreakpointValue({ base: "base", sm: "sm" });

  useEffect(() => {
    dispatch(getSurveyById(id));
  }, [dispatch, id]);
  return (
    <Container mt={3}>
      <Flex>
        <Link to="/dashboard">
          <Flex
            alignItems="center"
            color="teal.600"
            _hover={{ color: "teal.500" }}
            p={1}
            pl={0}
          >
            <Icon as={FaArrowLeft} />
            <Text ml={1.5}>Back To Surveys</Text>
          </Flex>
        </Link>
      </Flex>
      {loading ? (
        <Flex justifyContent="center">
          <Spinner mt={4} color="teal.500" size="xl" />
        </Flex>
      ) : error ? (
        <Flex justifyContent="center">
          <ErrorMessage>
            {errorMessage !== null
              ? errorMessage
              : "Could not fetch survey. Please try again."}
          </ErrorMessage>
        </Flex>
      ) : (
        <Flex justifyContent="space-between">
          <Heading color="gray.700" as="h3" size="lg">
            {survey.surveyTitle}
          </Heading>
          <HStack spacing={1}>
            <Button
              colorScheme={survey.isActive ? "red" : "teal"}
              display={{ base: "none", sm: "block" }}
            >
              {survey.isActive ? "Deactivate" : "Activate"}
            </Button>
            <Tooltip label="Preview">
              <Button
                colorScheme="teal"
                px={1}
                display={{ base: "none", sm: "flex" }}
              >
                <FaEye />
              </Button>
            </Tooltip>
            <Menu autoSelect={false}>
              <MenuButton
                as={IconButton}
                icon={<Icon as={FaEllipsisV} />}
                variant="ghost"
                colorScheme="teal"
                borderRadius={10}
                px={1}
              />
              <MenuList>
                {breakpoint === "base" ? (
                  <MenuItem
                    fontWeight="semibold"
                    backgroundColor={survey.isActive ? "red.500" : "teal.400"}
                    color="white"
                  >
                    {survey.isActive ? "Deactivate" : "Activate"} Survey
                  </MenuItem>
                ) : null}
                {breakpoint === "base" ? (
                  <MenuItem icon={<Icon as={FaEye} />}>Preview</MenuItem>
                ) : null}
                <MenuItem icon={<Icon as={FaLink} />}>Share Link</MenuItem>
                <MenuItem icon={<Icon as={FaPencilAlt} />}>Edit</MenuItem>
                <MenuItem icon={<Icon as={FaTrash} />}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      )}
    </Container>
  );
};

export default SurveyHome;

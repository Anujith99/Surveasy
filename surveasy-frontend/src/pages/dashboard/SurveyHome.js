import React, { useEffect, useState } from "react";
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
  Collapse,
} from "@chakra-ui/react";
import {
  deleteSurvey,
  getSurveyById,
  toggleActivation,
} from "actions/survey/actions";
import {
  FaArrowLeft,
  FaEllipsisV,
  FaEye,
  FaLink,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import ErrorMessage from "components/ErrorMessage";
import Confirm from "components/Confirm";
import Modal from "components/Modal";
import SurveyForm from "components/Forms/SurveyForm";

const SurveyHome = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { survey, loading, error, errorMessage } = useSelector(
    (state) => state.survey.surveyHome
  );
  const breakpoint = useBreakpointValue({ base: "base", sm: "sm" });

  const cancelRef = React.createRef();
  const [isActiveOpen, setActiveOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const onActiveClose = () => setActiveOpen(false);
  const onDeleteClose = () => setDeleteOpen(false);
  const onEditClose = () => setEditOpen(false);

  const handleToggleActivation = () => {
    dispatch(toggleActivation(id, { isActive: !survey.isActive }));
  };
  const handleDelete = () => {
    dispatch(deleteSurvey(id));
  };

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
        <Flex flexDirection="column">
          <Flex justifyContent="space-between">
            <Heading color="gray.700" as="h3" size="lg">
              {survey.surveyTitle}
            </Heading>
            <HStack spacing={1}>
              <Button
                colorScheme={survey.isActive ? "red" : "teal"}
                display={{ base: "none", sm: "block" }}
                onClick={() => setActiveOpen(true)}
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
                      onClick={() => setActiveOpen(true)}
                    >
                      {survey.isActive ? "Deactivate" : "Activate"} Survey
                    </MenuItem>
                  ) : null}
                  {breakpoint === "base" ? (
                    <MenuItem icon={<Icon as={FaEye} />}>Preview</MenuItem>
                  ) : null}
                  <MenuItem icon={<Icon as={FaLink} />}>Share Link</MenuItem>
                  <MenuItem
                    icon={<Icon as={FaPencilAlt} />}
                    onClick={() => setEditOpen(true)}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    icon={<Icon as={FaTrash} />}
                    onClick={() => setDeleteOpen(true)}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <Confirm
              isOpen={isActiveOpen}
              onClose={onActiveClose}
              cancelRef={cancelRef}
              title={`Confirm ${
                survey.isActive ? "Deactivation" : "Activation"
              }`}
              body={`Are you sure you want to ${
                survey.isActive ? "DEACTIVATE" : "ACTIVATE"
              } this survey?`}
              onConfirm={handleToggleActivation}
              confirmText={survey.isActive ? "Deactivate" : "Activate"}
              confirmBtnColor={survey.isActive ? "red" : "teal"}
            />
            <Confirm
              isOpen={isDeleteOpen}
              onClose={onDeleteClose}
              cancelRef={cancelRef}
              title="Confirm Delete Survey"
              body="Are you sure you want to delete this survey? This action cannot be undone."
              onConfirm={handleDelete}
              confirmText="Delete"
              confirmBtnColor="red"
              showToastOnConfirm={true}
              confirmToastText="Survey Deleted Successfully"
            />
            <Modal
              isOpen={isEditOpen}
              onClose={onEditClose}
              title="Edit Survey"
              body={
                <SurveyForm
                  onSuccess={onEditClose}
                  isEdit={true}
                  survey={survey}
                />
              }
            />
          </Flex>
          {survey.surveyDescription && survey.surveyDescription.length !== 0 ? (
            <Flex flexDirection="column">
              <Collapse in={showDesc}>{survey.surveyDescription}</Collapse>
              <Text
                size="lg"
                color="teal.500"
                cursor="pointer"
                onClick={() => setShowDesc(!showDesc)}
                _hover={{ color: "teal.400" }}
              >
                {showDesc ? "Hide" : "Show"} Description
              </Text>
            </Flex>
          ) : null}
        </Flex>
      )}
    </Container>
  );
};

export default SurveyHome;

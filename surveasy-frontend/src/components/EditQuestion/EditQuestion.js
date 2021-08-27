import React, { useState, useEffect } from "react";
import Container from "components/Container";
import {
  Button,
  Collapse,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
  Tooltip,
  Switch,
} from "@chakra-ui/react";
import { FaRegCopy, FaGripVertical, FaTrash } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

import EditShortAnswer from "./EditShortAnswer";
import EditParagraph from "./EditParagraph";
import EditOptions from "./EditOptions";
import Confirm from "components/Confirm";

const EditQuestion = ({
  questionItem,
  deleteQuestion,
  duplicateQuestion,
  handleQuestionChange,
  index,
}) => {
  const [question, setQuestion] = useState(questionItem);
  const [showDesc, setShowDesc] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const cancelRef = React.createRef();

  const onConfirmClose = () => setShowConfirm(false);
  const handleDelete = () => {
    setShowConfirm(false);
    deleteQuestion(questionItem.questionId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedQuestion = { ...question, [name]: value };
    setQuestion(updatedQuestion);
  };
  const handleToggle = () =>
    setQuestion({ ...question, isRequired: !question.isRequired });

  const handleOptionsChange = (options) =>
    setQuestion({ ...question, options });

  const renderQuestionType = () => {
    const type = question.questionType;

    switch (type) {
      case "mcq":
      case "dropdown":
      case "checkbox":
        return (
          <EditOptions question={question} onChange={handleOptionsChange} />
        );
      case "shortText":
        return <EditShortAnswer />;
      case "longText":
        return <EditParagraph />;
      default:
        return null;
    }
  };
  useEffect(() => {
    handleQuestionChange(question.questionId, question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);
  return (
    <Draggable draggableId={question.questionId} index={index}>
      {(provided, snapshot) => (
        <Container mode="card" p={0} mb={3}>
          <Flex
            dir="column"
            w={"100%"}
            bgColor="white"
            borderRadius={5}
            shadow="sm"
            p={{ base: 3, md: 4 }}
            opacity={snapshot.isDragging ? 0.7 : 1.0}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Flex alignItems="center" w={"100%"}>
              <Flex
                height="100%"
                mt={2}
                mr={-1}
                p={1}
                {...provided.dragHandleProps}
              >
                <Icon
                  as={FaGripVertical}
                  color="gray.400"
                  w={5}
                  h={5}
                  outline="none"
                />
              </Flex>
              <Flex
                flexDirection="column"
                w={"100%"}
                ml={{ base: 1, sm: 2, md: 3 }}
              >
                <Flex flexDirection={{ base: "column", sm: "row" }} w={"100%"}>
                  <Input
                    w={{ base: "100%", sm: "65%" }}
                    name="questionTitle"
                    placeholder="Enter Question"
                    value={question.questionTitle}
                    onChange={handleChange}
                  />
                  <Select
                    name="questionType"
                    w={{ base: "100%", sm: "35%" }}
                    ml={{ base: 0, sm: 2 }}
                    mt={{ base: 1, sm: 0 }}
                    onChange={handleChange}
                    value={question.questionType}
                  >
                    <option value="mcq">Multiple Choice</option>
                    <option value="checkbox">Checkboxes</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="shortText">Short Answer</option>
                    <option value="longText">Paragraph</option>
                  </Select>
                </Flex>
                <Flex flexDir="column" mt={2}>
                  <Text
                    size="lg"
                    color="teal.500"
                    cursor="pointer"
                    onClick={() => setShowDesc(!showDesc)}
                    _hover={{ color: "teal.400" }}
                  >
                    {showDesc ? "Hide" : "Show"} Description
                  </Text>
                  <Collapse in={showDesc}>
                    <Textarea
                      name="questionDescription"
                      value={question.questionDescription}
                      mt={1}
                      placeholder="Enter Description"
                      onChange={handleChange}
                    />
                  </Collapse>
                </Flex>
                <Divider marginY={1} />
                {renderQuestionType()}
                <Flex mt={1} justifyContent="flex-end">
                  <HStack>
                    <Tooltip label="Duplicate">
                      <Button
                        colorScheme="teal"
                        variant="ghost"
                        px={1}
                        onClick={() =>
                          duplicateQuestion(questionItem.questionId)
                        }
                      >
                        <Icon as={FaRegCopy} w={5} h={5} />
                      </Button>
                    </Tooltip>
                    <Tooltip label="Delete">
                      <Button
                        colorScheme="red"
                        variant="ghost"
                        px={1}
                        onClick={() => setShowConfirm(true)}
                      >
                        <Icon as={FaTrash} w={5} h={5} />
                      </Button>
                    </Tooltip>
                    <Divider orientation="vertical" mr={2} />
                    <Flex alignItems="center">
                      <Text color="gray.600" fontWeight="semibold" mr={1}>
                        Required?
                      </Text>
                      <Switch
                        mt={1}
                        colorScheme="teal"
                        isChecked={question.isRequired}
                        onChange={handleToggle}
                      />
                    </Flex>
                  </HStack>
                </Flex>
              </Flex>
            </Flex>
            {showConfirm && (
              <Confirm
                isOpen={showConfirm}
                onClose={onConfirmClose}
                cancelRef={cancelRef}
                title="Confirm Delete Question"
                body="Are you sure you want to delete this question?"
                onConfirm={handleDelete}
                confirmText="Delete"
                confirmBtnColor="red"
              />
            )}
          </Flex>
        </Container>
      )}
    </Draggable>
  );
};

export default EditQuestion;

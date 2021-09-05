import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Icon, Text, Spinner, Button } from "@chakra-ui/react";
import Container from "components/Container";
import { FaArrowLeft, FaPlus, FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { animateScroll as Scroll } from "react-scroll";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { isEmpty } from "helpers/utils";
import { getSurveyById, updateSurvey } from "actions/survey/actions";
import ErrorMessage from "components/ErrorMessage";
import EditQuestion from "components/EditQuestion/EditQuestion";
import RespondentInfo from "components/EditQuestion/RespondentInfo";

const EditSurvey = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { survey, loading, error, errorMessage } = useSelector(
    (state) => state.survey.surveyHome
  );

  useEffect(() => {
    if (isEmpty(survey)) {
      dispatch(getSurveyById(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSurveyUpdate = (key, updatedData) => {
    dispatch(updateSurvey({ ...survey, [key]: updatedData }));
  };

  const addQuestion = () => {
    const newQuestion = {
      questionId: uuidv4(),
      questionType: "mcq",
      questionTitle: "",
      questionDescription: "",
      isRequired: false,
      options: [],
    };
    setSelectedQuestion(newQuestion.questionId);
    handleSurveyUpdate("surveyQuestions", [
      ...survey.surveyQuestions,
      newQuestion,
    ]);
    Scroll.scrollToBottom();
  };

  const deleteQuestion = (questionId) => {
    const qIndex = survey.surveyQuestions.findIndex(
      (q) => q.questionId === questionId
    );
    const updatedQuestions = survey.surveyQuestions.filter(
      (q) => q.questionId !== questionId
    );
    if (updatedQuestions.length) {
      let newSelectedQuestionIndex = qIndex === 0 ? qIndex : qIndex - 1;
      setSelectedQuestion(
        updatedQuestions[newSelectedQuestionIndex].questionId
      );
    } else {
      setSelectedQuestion(null);
    }
    handleSurveyUpdate("surveyQuestions", updatedQuestions);
  };

  const duplicateQuestion = (questionId) => {
    let updatedQuestions = [...survey.surveyQuestions];
    const questionIndex = updatedQuestions.findIndex(
      (q) => q.questionId === questionId
    );
    const duplicateQuestion = {
      ...updatedQuestions[questionIndex],
      questionId: uuidv4(),
    };
    setSelectedQuestion(duplicateQuestion.questionId);
    updatedQuestions.splice(questionIndex + 1, 0, duplicateQuestion);
    handleSurveyUpdate("surveyQuestions", updatedQuestions);
  };

  const handleQuestionChange = (id, updatedQuestion) => {
    let updatedQuestions = [...survey.surveyQuestions];
    const questionIndex = updatedQuestions.findIndex(
      (q) => q.questionId === id
    );
    updatedQuestions[questionIndex] = updatedQuestion;
    handleSurveyUpdate("surveyQuestions", updatedQuestions);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let updatedQuestions = [...survey.surveyQuestions];
    let draggedQuestion = updatedQuestions.find(
      (q) => q.questionId === draggableId
    );
    if (draggedQuestion) {
      updatedQuestions.splice(source.index, 1);
      updatedQuestions.splice(destination.index, 0, draggedQuestion);
      handleSurveyUpdate("surveyQuestions", updatedQuestions);
    } else {
      return;
    }
  };

  return (
    <Container mt={2}>
      <Flex>
        <Link to={`/dashboard/survey/${id}`}>
          <Flex
            alignItems="center"
            color="teal.600"
            _hover={{ color: "teal.500" }}
            p={1}
            pl={0}
          >
            <Icon as={FaArrowLeft} />
            <Text ml={1.5}>Back</Text>
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
          <Container
            mt={2}
            p={0}
            sx={{ postition: "-webkit-sticky", position: "sticky", top: "1" }}
            zIndex={10}
          >
            <Flex bg="white" shadow="sm" p={2} mb={3} justify="space-between">
              <Flex alignItems="center">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  px={1}
                  display={{ base: "block", sm: "none" }}
                  onClick={addQuestion}
                >
                  <Icon as={FaPlus} />
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={FaPlus} />}
                  display={{ base: "none", sm: "block" }}
                  onClick={addQuestion}
                >
                  Add
                </Button>
              </Flex>
              <Flex alignItems="center">
                <Text
                  mr={{ base: 2, md: 3 }}
                  color="teal.500"
                  _hover={{ color: "teal.600" }}
                  fontWeight="semibold"
                  textDecoration="underline"
                  fontSize={{ base: "sm", sm: "initial" }}
                >
                  Last edit was seconds ago
                </Text>
                <Button
                  colorScheme="teal"
                  px={1}
                  pt={0}
                  display={{ base: "block", sm: "none" }}
                >
                  <Icon as={FaSave} />
                </Button>
                <Button
                  colorScheme="teal"
                  leftIcon={<Icon as={FaSave} />}
                  display={{ base: "none", sm: "block" }}
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          </Container>
          {survey.respondentInfo && (
            <Container mode="card" p={0} mb={3}>
              <Flex
                flexDirection="column"
                bg="white"
                shadow="sm"
                borderRadius={5}
                padding={{ base: 3, md: 4 }}
                borderWidth={2}
                borderColor="teal.500"
              >
                <RespondentInfo
                  respondentInfo={survey.respondentInfo}
                  handleChange={handleSurveyUpdate}
                  isSelected={selectedQuestion === null}
                  onClick={() => setSelectedQuestion(null)}
                />
              </Flex>
            </Container>
          )}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <Flex
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  flexDirection="column"
                  w={"100%"}
                >
                  {survey.surveyQuestions &&
                    survey.surveyQuestions.map((question, index) => (
                      <EditQuestion
                        key={question.questionId}
                        index={index}
                        questionItem={question}
                        handleQuestionChange={handleQuestionChange}
                        deleteQuestion={deleteQuestion}
                        duplicateQuestion={duplicateQuestion}
                        isSelected={question.questionId === selectedQuestion}
                        onSelect={(id) => setSelectedQuestion(id)}
                      />
                    ))}
                  {provided.placeholder}
                </Flex>
              )}
            </Droppable>
          </DragDropContext>
        </Flex>
      )}
    </Container>
  );
};

export default EditSurvey;

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
import { editSurvey, getSurveyById } from "actions/survey/actions";
import ErrorMessage from "components/ErrorMessage";
import EditQuestion from "components/EditQuestion/EditQuestion";
import EditRespondentInfo from "components/EditQuestion/EditRespondentInfo";

const EditSurvey = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { survey, loading, error, errorMessage } = useSelector(
    (state) => state.survey.surveyHome
  );
  const isSaving = useSelector((state) => state.survey.surveyForm.loading);
  const [updatedSurvey, setUpdatedSurvey] = useState(survey);

  useEffect(() => {
    if (isEmpty(survey)) {
      dispatch(getSurveyById(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEmpty(updatedSurvey) && !isEmpty(survey)) {
      setUpdatedSurvey(survey);
    }
  }, [survey, updatedSurvey]);

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log("CALL API");
      dispatch(editSurvey(id, updatedSurvey));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [updatedSurvey, dispatch, id]);

  const handleSurveyUpdate = (key, updatedData) => {
    setUpdatedSurvey({ ...updatedSurvey, [key]: updatedData });
  };

  const addQuestion = () => {
    const newQuestion = {
      questionId: uuidv4(),
      questionType: "mcq",
      questionIndex: updatedSurvey.surveyQuestions.length,
      questionTitle: "Question Title",
      questionDescription: "",
      isRequired: false,
      options: [],
    };
    setSelectedQuestion(newQuestion.questionId);
    handleSurveyUpdate("surveyQuestions", [
      ...updatedSurvey.surveyQuestions,
      newQuestion,
    ]);
    Scroll.scrollToBottom();
  };

  const deleteQuestion = (questionId) => {
    const qIndex = updatedSurvey.surveyQuestions.findIndex(
      (q) => q.questionId === questionId
    );
    const updatedQuestions = updatedSurvey.surveyQuestions.filter(
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
    let updatedQuestions = [...updatedSurvey.surveyQuestions];
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
    let updatedQuestions = [...updatedSurvey.surveyQuestions];
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

    let updatedQuestions = [...updatedSurvey.surveyQuestions];
    let draggedQuestion = updatedQuestions.find(
      (q) => q.questionId === draggableId
    );
    if (draggedQuestion) {
      updatedQuestions.splice(source.index, 1);
      updatedQuestions.splice(destination.index, 0, draggedQuestion);
      updatedQuestions = updatedQuestions.map((question, index) => ({
        ...question,
        questionIndex: index,
      }));
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
                <Button
                  colorScheme="teal"
                  px={1}
                  pt={0}
                  display={{ base: "block", sm: "none" }}
                >
                  <Icon as={FaSave} />
                </Button>
                {isSaving ? (
                  <Button colorScheme="teal" isLoading loadingText="Saving" />
                ) : (
                  <Button
                    colorScheme="teal"
                    leftIcon={<Icon as={FaSave} />}
                    display={{ base: "none", sm: "block" }}
                    onClick={() => dispatch(editSurvey(id, updatedSurvey))}
                  >
                    Save
                  </Button>
                )}
              </Flex>
            </Flex>
          </Container>
          {updatedSurvey.respondentInfo && (
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
                <EditRespondentInfo
                  respondentInfo={updatedSurvey.respondentInfo}
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
                  {updatedSurvey.surveyQuestions &&
                    updatedSurvey.surveyQuestions.map((question, index) => (
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

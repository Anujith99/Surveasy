import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Flex, Text, Button, Spinner, Progress } from "@chakra-ui/react";
import validator from "validator";
import moment from "moment";

import TitleCard from "components/SurveyComponents/TitleCard";
import SubmitResponse from "components/SurveyComponents/SubmitResponse";
import Container from "components/Container";
import Modal from "components/Modal";
import QuestionCard from "components/Questions/QuestionCard";
import { SurveyContext } from "helpers/context";
import { isEmpty } from "helpers/utils";
import { getQuestions, submitResponse } from "actions/respondent/actions";
import ErrorMessage from "components/ErrorMessage";
import SuccessMessage from "components/SurveyComponents/SuccessMessage";

const SurveyForm = ({ survey }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(null);
  const [answers, setAnswers] = useState({});
  const [respondentInfo, setRespondentInfo] = useState({});
  const [questionError, setQuestionError] = useState(false);
  const [respondentError, setRespondentError] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isEmpty(survey)) {
      const answerObj = survey.surveyQuestions.reduce((obj, item) => {
        let answer = {
          questionId: item.questionId,
          questionTitle: item.questionTitle,
          answer: item.questionType === "checkbox" ? [] : "",
        };
        obj[item["questionId"]] = answer;
        return obj;
      }, {});

      const respondentInfoObj = survey.respondentInfo.reduce((obj, item) => {
        let info = {
          info: item.info,
          value: "",
        };
        obj[item["info"]] = info;
        return obj;
      }, {});

      setAnswers(answerObj);
      setRespondentInfo(respondentInfoObj);
    }
  }, [survey]);

  const noOfQuestions = survey.surveyQuestions
    ? survey.surveyQuestions.length
    : 0;

  const validateDate = (dateStr) => {
    return (
      !moment(dateStr, "DD-MM-YYYY", true).isValid() ||
      !moment(dateStr, "DD-MM-YYYY", true).isBefore()
    );
  };

  const validateInfo = () => {
    const info = survey.respondentInfo;
    let errors = {};
    info.forEach((i) => {
      const { value } = respondentInfo[i.info];
      errors[i.info] = i.isRequired && !value.length;
      if (!errors[i.info] && value.length) {
        errors[i.info] =
          i.info === "email"
            ? !validator.isEmail(value)
            : i.info === "phoneNumber"
            ? !/^\d{10}$/.test(value)
            : i.info === "dob"
            ? validateDate(value)
            : false;
      }
    });
    setRespondentError(errors);
    if (!Object.values(errors).includes(true)) {
      onNextClick();
    }
  };

  const validateQuestion = () => {
    if (survey.surveyQuestions[currentStep].isRequired) {
      let questionId = survey.surveyQuestions[currentStep].questionId;
      if (answers[questionId].answer.length === 0) {
        setQuestionError(true);
      } else {
        setQuestionError(false);
        onNextClick();
      }
    } else {
      onNextClick();
    }
  };

  const onNextClick = () => {
    if (currentStep === noOfQuestions - 1) {
      let data = {
        surveyId: survey._id,
        respondentInfo: Object.values(respondentInfo),
        answers: Object.values(answers),
      };
      console.log(data);
      dispatch(submitResponse(data));
      setIsModalVisible(true);
    } else {
      const nextStep = currentStep === null ? 0 : currentStep + 1;
      setCurrentStep(nextStep);
    }
  };

  const onPrevClick = () => {
    setQuestionError(false);
    const prevStep = currentStep === 0 ? null : currentStep - 1;
    setCurrentStep(prevStep);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setIsSubmitted(true);
  };

  const contextValue = {
    respondentInfo,
    answers,
    getAnswer: (id) => answers[id],
    updateAnswer: (questionId, updatedAnswer) => {
      let updatedAnswers = { ...answers };
      updatedAnswers[questionId].answer = updatedAnswer;
      setAnswers(updatedAnswers);
    },
    updateRespondentInfo: (info, updatedValue) => {
      let updatedInfo = { ...respondentInfo };
      updatedInfo[info].value = updatedValue;
      setRespondentInfo(updatedInfo);
    },
    questionError,
    respondentError,
  };
  return (
    <>
      {isEmpty(survey) ? null : isSubmitted ? (
        <SuccessMessage />
      ) : (
        <SurveyContext.Provider value={contextValue}>
          <Flex
            flexDirection="column"
            pt={{ base: 2, md: 4 }}
            px={{ base: 1, md: 0 }}
          >
            {currentStep === null ? (
              <TitleCard
                surveyTitle={survey.surveyTitle}
                surveyDescription={survey.surveyDescription}
                respondentInfo={survey.respondentInfo}
              />
            ) : (
              <QuestionCard question={survey.surveyQuestions[currentStep]} />
            )}
            <Container mode="card" p={0}>
              {currentStep !== null && (
                <>
                  <Progress
                    value={currentStep + 1}
                    max={noOfQuestions}
                    mt={{ base: 1, md: 2 }}
                    colorScheme="teal"
                    borderRadius={5}
                    backgroundColor="gray.200"
                  />
                </>
              )}
              <Flex
                justifyContent={
                  currentStep === null ? "flex-end" : "space-between"
                }
                alignItems="center"
                my={3}
                w="100%"
              >
                {currentStep !== null && (
                  <Button px={6} colorScheme="teal" onClick={onPrevClick}>
                    Prev
                  </Button>
                )}
                <Button
                  px={6}
                  colorScheme="teal"
                  onClick={
                    currentStep === null ? validateInfo : validateQuestion
                  }
                >
                  {currentStep === null
                    ? "Start"
                    : currentStep === noOfQuestions - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </Flex>
            </Container>
          </Flex>
          <Modal
            isOpen={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            showHeader={false}
            body={
              <SubmitResponse
                closeModal={() => setIsModalVisible(false)}
                onSuccess={handleSuccess}
              />
            }
            motionPreset="scale"
            isCentered={true}
          />
        </SurveyContext.Provider>
      )}
    </>
  );
};

const Survey = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, survey, error, errorMessage } = useSelector(
    (state) => state.respondent.questions
  );
  useEffect(() => {
    dispatch(getQuestions(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Flex h={"100%"} alignItems="center">
          <Container mode="card" p={0}>
            <Flex
              flexDirection="column"
              p={{ base: 3, md: 4 }}
              bg="white"
              shadow="sm"
              borderRadius={4}
              alignItems="center"
            >
              <Spinner color="teal.500" size="xl" thickness={4} />
              <Text fontSize="xl" mt={3} fontWeight="semibold">
                Fetching Survey...
              </Text>
            </Flex>
          </Container>
        </Flex>
      ) : error ? (
        <Flex h="100%" alignItems="center">
          <Container mode="card" p={0}>
            <ErrorMessage>
              {errorMessage !== null
                ? errorMessage
                : "Could not fetch this survey. Please check the entered URL."}
            </ErrorMessage>
          </Container>
        </Flex>
      ) : !survey.isActive ? (
        <Flex h="100%" alignItems="center">
          <Container mode="card" p={0}>
            <ErrorMessage>
              This survey has been deactivated. Please contact the survey owner.
            </ErrorMessage>
          </Container>
        </Flex>
      ) : (
        <SurveyForm survey={survey} />
      )}
    </>
  );
};

export default Survey;

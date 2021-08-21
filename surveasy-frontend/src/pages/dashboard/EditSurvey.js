import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Icon, Text, Spinner } from "@chakra-ui/react";
import Container from "components/Container";
import { FaArrowLeft } from "react-icons/fa";
import { isEmpty } from "helpers/utils";
import { getSurveyById } from "actions/survey/actions";
import ErrorMessage from "components/ErrorMessage";
import EditQuestion from "components/EditQuestion/EditQuestion";

const EditSurvey = () => {
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
          <Flex>
            <EditQuestion />
          </Flex>
        </Flex>
      )}
    </Container>
  );
};

export default EditSurvey;

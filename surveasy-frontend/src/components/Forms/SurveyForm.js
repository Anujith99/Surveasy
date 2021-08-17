import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Box,
} from "@chakra-ui/react";
import FormError from "./FormError";
import { createSurvey, editSurvey } from "actions/survey/actions";
import useClearState from "helpers/hooks/useClearState";
import { SURVEY_FORM_RESET } from "actions/survey/types";
import ErrorMessage from "components/ErrorMessage";

const SurveyForm = ({ onSuccess, survey, isEdit }) => {
  const dispatch = useDispatch();
  const { loading, error, errorMessage, success } = useSelector(
    (state) => state.survey.surveyForm
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data) => {
    return isEdit
      ? dispatch(editSurvey(survey._id, data))
      : dispatch(createSurvey(data));
  };
  const validationConfig = {
    surveyTitle: {
      required: "Survey Title is required",
      maxLength: {
        value: 60,
        message: "Title can be maximum 60 characters",
      },
    },
    surveyDescription: {
      maxLength: 140,
    },
  };

  useEffect(() => {
    if (isEdit) {
      const fields = ["surveyTitle", "surveyDescription"];
      fields.map((field) => setValue(field, survey[field]));
    }
  }, [isEdit, setValue, survey]);

  const toast = useToast();

  useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: `Survey ${isEdit ? "updated" : "created"} successfully!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSuccess();
    }
  }, [success, onSuccess, toast, isEdit]);

  useClearState(SURVEY_FORM_RESET);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <VStack spacing={3}>
          <FormControl>
            <FormLabel>Survey Title</FormLabel>
            <Input
              type="text"
              name="surveyTitle"
              placeholder="e.g. America's Favorite City Survey"
              {...register("surveyTitle", validationConfig.surveyTitle)}
            />
            {errors.surveyTitle && (
              <FormError>{errors.surveyTitle.message}</FormError>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Survey Description</FormLabel>
            <Textarea
              placeholder="Enter Description"
              name="surveyDescription"
              {...register(
                "surveyDescription",
                validationConfig.surveyDescription
              )}
            />
            {errors.surveyDescription && (
              <FormError>{errors.surveyDescription.message}</FormError>
            )}
            <FormHelperText
              color={
                errors.surveyDescription &&
                errors.surveyDescription.type === "maxLength"
                  ? "red.500"
                  : "gray.500"
              }
            >
              Maximum 140 characters
            </FormHelperText>
          </FormControl>
        </VStack>
        {error && (
          <Box mt={1}>
            <ErrorMessage>
              {errorMessage ||
                "Oops! Could not perform action. Please try again"}
            </ErrorMessage>
          </Box>
        )}
        <Button
          type="submit"
          float="right"
          my={2}
          colorScheme="teal"
          isLoading={loading}
        >
          {isEdit ? "Edit" : "Create"}
        </Button>
      </form>
    </>
  );
};

export default SurveyForm;

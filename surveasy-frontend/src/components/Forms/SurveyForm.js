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
} from "@chakra-ui/react";
import FormError from "./FormError";
import { createSurvey } from "actions/dashboard/actions";
import useClearState from "helpers/hooks/useClearState";
import { CREATE_SURVEY_RESET } from "actions/dashboard/types";

const SurveyForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error, errorMessage, success } = useSelector(
    (state) => state.dashboard.createSurvey
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data) => {
    dispatch(createSurvey(data));
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
    if (success) {
      onSuccess();
    }
  }, [success, onSuccess]);

  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Create Survey Error",
        description:
          errorMessage || "Oops! Could not create survey. Please try again.",
        status: "error",
        duration: null,
        isClosable: true,
      });
    } else {
      toast.closeAll();
    }
  }, [error, errorMessage, toast]);

  useEffect(() => {
    return () => {
      toast.closeAll();
    };
  }, [toast]);

  useClearState(CREATE_SURVEY_RESET);
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
        <Button
          type="submit"
          float="right"
          my={2}
          colorScheme="teal"
          isLoading={loading}
        >
          Create
        </Button>
      </form>
    </>
  );
};

export default SurveyForm;

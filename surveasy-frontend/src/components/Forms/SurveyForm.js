import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "./FormError";

const SurveyForm = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data) => onFormSubmit(data);
  const validationConfig = {
    surveyTitle: {
      required: "Survey title is required",
      maxLength: {
        value: 60,
        message: "Title can be maximum 60 characters",
      },
    },
    surveyDescription: {
      maxLength: 140,
    },
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="(Optional)"
              name="surveyDescription"
              {...register(
                "surveyDescription",
                validationConfig.surveyDescription
              )}
            />
            <FormHelperText
              color={errors.surveyDescription ? "red.500" : "gray.500"}
            >
              Maximum 140 characters
            </FormHelperText>
          </FormControl>
        </VStack>
        <Button type="submit" float="right" my={2} colorScheme="teal">
          Create
        </Button>
      </form>
    </>
  );
};

export default SurveyForm;

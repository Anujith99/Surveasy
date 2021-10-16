import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import validator from "validator";
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";

import { FaUser, FaEnvelope } from "react-icons/fa";
import FormError from "./FormError";
import { updateUser, resetState } from "actions/users/actions";
import { isEmpty } from "helpers/utils";
import useClearState from "helpers/hooks/useClearState";
import { USER_PROFILE_UPDATE_RESET } from "actions/users/types";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { loading, error, errorMessage, success } = useSelector(
    (state) => state.user.profile
  );
  const { userInfo } = useSelector((state) => state.user.info);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      const fields = ["firstName", "lastName", "email"];
      fields.map((field) => setValue(field, userInfo[field]));
    }
  }, [userInfo, setValue]);

  const onSubmit = (data) => {
    dispatch(updateUser(data));
  };

  const validationConfig = {
    firstName: {
      required: "First Name is required",
    },
    lastName: {
      validate: (val) => {
        if (val) {
          return (
            validator.isAlpha(val) || "Last Name must contain only letters"
          );
        }
      },
    },
    email: {
      required: "Email is required",
      validate: (val) => validator.isEmail(val) || "Please enter valid email",
    },
  };

  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: "Update Error",
        description:
          errorMessage ||
          "Oops! There seems to be some issue. Please try again.",
        status: "error",
        duration: null,
        isClosable: true,
      });
    } else if (success) {
      setTimeout(() => {
        dispatch(resetState());
      }, 2500);
      toast({
        title: "Success",
        description: "Profile Updated Successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } else {
      toast.closeAll();
    }
  }, [error, errorMessage, toast, success, dispatch]);

  useClearState(USER_PROFILE_UPDATE_RESET);
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3}>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaUser} color="gray.300" />}
              />
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                {...register("firstName", validationConfig.firstName)}
              />
            </InputGroup>
            {errors.firstName && (
              <FormError>{errors.firstName.message}</FormError>
            )}
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaUser} color="gray.300" />}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                {...register("lastName", validationConfig.lastName)}
              />
            </InputGroup>
            {errors.lastName && (
              <FormError>{errors.lastName.message}</FormError>
            )}
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaEnvelope} color="gray.300" />}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", validationConfig.email)}
              />
            </InputGroup>
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </FormControl>
        </VStack>
        <Button
          w={"100%"}
          mt={4}
          fontSize={"lg"}
          colorScheme="teal"
          type="submit"
          isLoading={loading}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default ProfileForm;

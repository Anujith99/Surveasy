import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Button,
  Text,
  Icon,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { FaEnvelope, FaLock } from "react-icons/fa";

import FormError from "./FormError";
import { loginUser } from "actions/users/actions";
import { USER_LOGIN_RESET } from "actions/users/types";
import useClearState from "helpers/hooks/useClearState";

const SignInForm = () => {
  const dispatch = useDispatch();
  const { loading, error, errorMessage } = useSelector(
    (state) => state.user.login
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const validationConfig = {
    email: {
      required: "Email is required",
      validate: (val) => isEmail(val) || "Please enter valid email",
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be minimum 6 characters",
      },
    },
  };
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Sign In Error",
        description:
          errorMessage ||
          "Oops! There seems to be some issue. Please try again.",
        status: "error",
        duration: null,
        isClosable: true,
      });
    } else {
      toast.closeAll();
    }
  }, [error, errorMessage, toast]);

  useClearState(USER_LOGIN_RESET);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3}>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaEnvelope} color="gray.300" />}
              />
              <Input
                type="text"
                name="email"
                placeholder="Email"
                {...register("email", validationConfig.email)}
              />
            </InputGroup>
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaLock} color="gray.300" />}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", validationConfig.password)}
              />
            </InputGroup>
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
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
          Sign In
        </Button>
      </form>
      <Box mt={6} textAlign="center">
        <Text>
          Don't have an account?{" "}
          <ChakraLink as={Link} to="/signup" color="teal.500">
            Sign Up
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
};

export default SignInForm;

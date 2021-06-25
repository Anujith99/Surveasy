import React from "react";
import { Link } from "react-router-dom";
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
  Link as ChakraLink,
} from "@chakra-ui/react";

import { FaEnvelope, FaLock } from "react-icons/fa";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data) => console.log(data);
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
            {errors.email && (
              <Text mt={1} fontWeight={500} color="red.400">
                {errors.email.message}
              </Text>
            )}
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
              <Text mt={1} fontWeight={500} color="red.400">
                {errors.password.message}
              </Text>
            )}
          </FormControl>
        </VStack>
        <Button
          w={"100%"}
          mt={4}
          fontSize={"lg"}
          colorScheme="teal"
          type="submit"
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

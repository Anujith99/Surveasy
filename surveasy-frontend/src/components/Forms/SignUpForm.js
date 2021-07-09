import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import validator from "validator";
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  VStack,
  HStack,
  Button,
  Text,
  Icon,
  Link as ChakraLink,
  useBoolean,
  useToast,
} from "@chakra-ui/react";

import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import FormError from "./FormError";
import { registerUser } from "actions/users/actions";
import { USER_REGISTER_RESET } from "actions/users/types";
import useClearState from "helpers/hooks/useClearState";

const ShowPasswordIcon = ({ show }) => {
  const icon = show ? FaEyeSlash : FaEye;

  return (
    <Button bg="transparent" _hover={{ bg: "transparent" }}>
      <Icon as={icon} color="gray.300" _hover={{ color: "teal.400" }} />
    </Button>
  );
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { loading, error, errorMessage } = useSelector(
    (state) => state.user.register
  );
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirm, setShowConfirm] = useBoolean(false);

  const watchPasswords = watch(["password", "confirmPassword"]);

  const onSubmit = (data) => {
    setShowPassword.off();
    setShowConfirm.off();
    dispatch(registerUser(data));
  };

  const validationConfig = {
    firstName: {
      required: "First Name is required",
      validate: (val) =>
        validator.isAlpha(val) || "First Name must contain only letters",
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
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be minimum 6 characters",
      },
    },
    confirmPassword: {
      required: "Please confirm password",
      validate: (val) =>
        validator.equals(val, getValues("password")) ||
        "Passwords do not match",
    },
  };

  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: "Sign Up Error",
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
  useClearState(USER_REGISTER_RESET);
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3}>
          <HStack
            mb={errors.firstName || errors.lastName ? -2 : "auto"}
            spacing={1}
          >
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
            </FormControl>
          </HStack>
          {errors.firstName || errors.lastName ? (
            <Box w={"100%"}>
              {errors.firstName && (
                <FormError mt={0}>{errors.firstName.message}</FormError>
              )}
              {errors.lastName && (
                <FormError>{errors.lastName.message}</FormError>
              )}
            </Box>
          ) : null}

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

          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaLock} color="gray.300" />}
              />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                {...register("password", validationConfig.password)}
              />
              {watchPasswords[0] && (
                <InputRightElement
                  onClick={setShowPassword.toggle}
                  children={<ShowPasswordIcon show={showPassword} />}
                />
              )}
            </InputGroup>
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaLock} color="gray.300" />}
              />
              <Input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register(
                  "confirmPassword",
                  validationConfig.confirmPassword
                )}
              />
              {watchPasswords[1] && (
                <InputRightElement
                  onClick={setShowConfirm.toggle}
                  children={<ShowPasswordIcon show={showConfirm} />}
                />
              )}
            </InputGroup>
            {errors.confirmPassword && (
              <FormError>{errors.confirmPassword.message}</FormError>
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
          Sign Up
        </Button>
      </form>
      <Box mt={{ base: 3, sm: 6 }} textAlign="center">
        <Text>
          Already have an account?{" "}
          <ChakraLink as={Link} to="/signin" color="teal.500">
            Sign In
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
};

export default SignUpForm;

import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  HStack,
  Button,
  Text,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUpForm = () => {
  return (
    <Box>
      <form>
        <VStack spacing={3}>
          <HStack spacing={1}>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FaUser} color="gray.300" />}
                />
                <Input type="text" name="firstName" placeholder="First Name" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FaUser} color="gray.300" />}
                />
                <Input type="text" name="lastName" placeholder="Last Name" />
              </InputGroup>
            </FormControl>
          </HStack>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaEnvelope} color="gray.300" />}
              />
              <Input type="email" name="email" placeholder="Email" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaLock} color="gray.300" />}
              />
              <Input type="password" name="password" placeholder="Password" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaLock} color="gray.300" />}
              />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </InputGroup>
          </FormControl>
        </VStack>
        <Button
          w={"100%"}
          mt={4}
          fontSize={"lg"}
          colorScheme="teal"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
      <Box mt={6} textAlign="center">
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

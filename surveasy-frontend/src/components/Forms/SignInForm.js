import React from "react";
import { Link } from "react-router-dom";
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

import { FaUser, FaLock } from "react-icons/fa";

const SignInForm = () => {
  return (
    <Box>
      <form>
        <VStack spacing={3} w={"100%"}>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaUser} color="gray.300" />}
              />
              <Input type="text" placeholder="Email" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaLock} color="gray.300" />}
              />
              <Input type="password" placeholder="Password" />
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

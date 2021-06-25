import { Link } from "react-router-dom";
import { Box, Flex, Button, Stack } from "@chakra-ui/react";
import Container from "components/Container";
import { ReactComponent as Logo } from "resources/Surveasy_Logo.svg";

const Navbar = () => {
  return (
    <Box
      minH={"60px"}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={"gray.200"}
    >
      <Container>
        <Flex bg={"white"} py={{ base: 3 }} align={"center"}>
          <Flex flex={{ base: 1 }} justify={"start"}>
            <Box as={Link} to="/" mt={1}>
              <Logo />
            </Box>
          </Flex>

          <Stack justify={"flex-end"} direction={"row"} spacing={3}>
            <Button
              as={Link}
              fontSize={"sm"}
              colorScheme="teal"
              fontWeight={500}
              to={"/signin"}
              variant="outline"
            >
              Sign In
            </Button>
            <Button
              as={Link}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              colorScheme="teal"
              to={"/signup"}
            >
              Sign Up
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

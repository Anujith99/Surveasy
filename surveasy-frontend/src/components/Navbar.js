import { Link } from "react-router-dom";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box>
      <Flex
        bg={"white"}
        color={"gray.600"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"start"}>
          <Text textAlign={"left"} fontFamily={"heading"} color={"gray.800"}>
            Logo
          </Text>
        </Flex>

        <Stack justify={"flex-end"} direction={"row"} spacing={3}>
          <Button as={Link} fontSize={"sm"} fontWeight={500} to={"/sigin"}>
            Sign In
          </Button>
          <Button
            as={Link}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"teal.400"}
            _hover={{
              bg: "teal.500",
            }}
            to={"/signup"}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;

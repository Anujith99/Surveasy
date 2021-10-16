import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Flex,
  Button,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  useBreakpointValue,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
} from "@chakra-ui/react";
import Container from "components/Container";
import { isEmpty } from "helpers/utils";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

import { ReactComponent as Logo } from "resources/Surveasy_Logo.svg";
import { logoutUser } from "actions/users/actions";

const Buttons = () => {
  return (
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
  );
};

const UserAvatar = () => {
  const dispatch = useDispatch();
  const avatarSize = useBreakpointValue({ base: "sm", md: "md" });
  const { userInfo } = useSelector((state) => state.user.info);
  const fullName = isEmpty(userInfo)
    ? ""
    : `${userInfo.firstName} ${userInfo.lastName ? userInfo.lastName : ""}`;
  const logout = () => dispatch(logoutUser());
  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        _hover={{ textDecoration: "none" }}
      >
        <Avatar bg="teal.400" color="white" name={fullName} size={avatarSize} />
      </MenuButton>
      <MenuList>
        <MenuItem cursor="auto">
          <Flex w="100%" align="center" justify="space-around">
            <Avatar
              bg="teal.400"
              color="white"
              name={userInfo.firstName}
              size="sm"
            />
            <Flex direction="column" justify="end">
              <Text fontWeight="semibold">{fullName}</Text>
              <Text fontWeight="light">{userInfo.email}</Text>
            </Flex>
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem as={Link} to="/dashboard/profile" icon={<FaUserAlt />}>
          Profile
        </MenuItem>
        <MenuItem onClick={logout} icon={<FaSignOutAlt />}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Navbar = ({ type }) => {
  return (
    <Box
      minH={{ base: "20px", md: "60px" }}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={"gray.200"}
      bg="white"
    >
      <Container>
        <Flex bg={"white"} py={{ base: 3 }} align={"center"}>
          <Flex flex={{ base: 1 }} justify={"start"}>
            <Box as={Link} to="/" mt={1} width={{ base: "95px", md: "125px" }}>
              <Logo width={"100%"} height={"100%"} />
            </Box>
          </Flex>

          {type === "public" ? <Buttons /> : <UserAvatar />}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

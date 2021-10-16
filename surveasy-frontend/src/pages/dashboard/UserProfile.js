import React from "react";
import { Box, Flex, VStack, Text, Avatar } from "@chakra-ui/react";
import ProfileForm from "components/Forms/ProfileForm";

const UserProfile = () => {
  return (
    <Box h={"100%"} mt={4}>
      <Flex h={"100%"} align={"center"} justify={"center"}>
        <Box
          px={{ base: 4, sm: 5 }}
          py={6}
          w={{ base: "300px", sm: "350px" }}
          bg="white"
          borderRadius="md"
          shadow="base"
        >
          <VStack justify="center">
            <Avatar bg={"teal.400"} />
            <Text fontSize={"2xl"} fontWeight={500}>
              Profile
            </Text>
          </VStack>
          <Box pt={{ base: 5, sm: 6 }}>
            <ProfileForm />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserProfile;

import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const ResponseCard = () => {
  return (
    <Flex
      flexDirection="column"
      w={"100%"}
      bgColor="white"
      borderRadius={5}
      shadow="sm"
      p={{ base: 3, md: 4 }}
    >
      <Text fontSize={{ base: "lg", md: "xl" }}>Question Title</Text>
    </Flex>
  );
};

export default ResponseCard;

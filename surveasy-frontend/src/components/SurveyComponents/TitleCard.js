import React from "react";
import RespondentInfo from "components/Questions/RespondentInfo";
import Container from "components/Container";
import { Flex, Text } from "@chakra-ui/react";

const TitleCard = ({ surveyTitle, surveyDescription, respondentInfo }) => {
  return (
    <Container mode="card" p={0}>
      <Flex
        w={"100%"}
        flexDirection="column"
        bg="white"
        borderRadius={5}
        p={{ base: 3, md: 4 }}
        shadow="sm"
      >
        <Text
          fontSize={{ base: "x-large", md: "xx-large" }}
          fontWeight="semibold"
        >
          {surveyTitle}
        </Text>
        <Text
          color="gray.700"
          fontSize={{ base: "medium", md: "large" }}
          pt={1}
          mb={2}
        >
          {surveyDescription}
        </Text>
        <RespondentInfo info={respondentInfo} />
      </Flex>
    </Container>
  );
};

export default TitleCard;

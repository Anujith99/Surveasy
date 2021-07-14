import React from "react";
import Container from "components/Container";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import SurveyList from "components/SurveyList";

const DashboardHome = () => {
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  return (
    <Container mt={4}>
      <Flex align="bottom" justify="space-between">
        <Heading color="gray.800" size={headingSize}>
          Surveys
        </Heading>
        <Button
          leftIcon={<Icon as={FaPlus} />}
          colorScheme="teal"
          size={buttonSize}
        >
          Create
        </Button>
      </Flex>
      <Box mt={4}>
        <SurveyList />
      </Box>
    </Container>
  );
};

export default DashboardHome;

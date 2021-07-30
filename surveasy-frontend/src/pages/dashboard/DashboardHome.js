import React from "react";
import Container from "components/Container";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import SurveyList from "components/SurveyList";
import Modal from "components/Modal";
import SurveyForm from "components/Forms/SurveyForm";

const DashboardHome = () => {
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Container mt={4}>
        <Flex align="bottom" justify="space-between">
          <Heading color="gray.800" size={headingSize}>
            Surveys
          </Heading>
          <Button
            leftIcon={<Icon as={FaPlus} />}
            colorScheme="teal"
            size={buttonSize}
            onClick={onOpen}
          >
            Create
          </Button>
        </Flex>
        <Box mt={4}>
          <SurveyList />
        </Box>
      </Container>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create Survey"
        body={<SurveyForm onSuccess={onClose} />}
      />
    </>
  );
};

export default DashboardHome;

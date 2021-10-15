import React from "react";
import { Flex, Table, Tbody, Tr, Td } from "@chakra-ui/react";

const scrollBarStyle = {
  "&::-webkit-scrollbar": {
    width: "8px",
    borderRadius: "24px",
  },
  "&::-webkit-scrollbar-track": {
    width: "8px",
    background: "#E6FFFA",
    borderRadius: "24px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#4FD1C5",
    borderRadius: "24px",
  },
};

const ResponseAccordion = ({ answerData }) => {
  return (
    <Flex
      flexDirection="column"
      w={"100%"}
      maxHeight={"300px"}
      overflowY="auto"
      css={scrollBarStyle}
    >
      <Table>
        <Tbody>
          {answerData.map((ans, index) => (
            <Tr key={index}>
              <Td>{ans.answer}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default ResponseAccordion;

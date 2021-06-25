import React from "react";
import { Container as ChakraContainer } from "@chakra-ui/react";

const Container = ({ children }) => {
  return (
    <ChakraContainer
      maxW={{
        base: "container.sm",
        md: "container.md",
        lg: "container.lg",
        xl: "container.xl",
      }}
    >
      {children}
    </ChakraContainer>
  );
};

export default Container;

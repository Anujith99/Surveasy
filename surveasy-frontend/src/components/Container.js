import React from "react";
import { Container as ChakraContainer } from "@chakra-ui/react";

const Container = ({ children, ...props }) => {
  return (
    <ChakraContainer
      maxW={{
        base: "container.sm",
        md: "container.md",
        lg: "container.lg",
        xl: "container.xl",
      }}
      {...props}
    >
      {children}
    </ChakraContainer>
  );
};

export default Container;

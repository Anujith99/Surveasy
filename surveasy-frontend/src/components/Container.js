import React from "react";
import { Container as ChakraContainer } from "@chakra-ui/react";

const Container = ({ mode = "normal", children, ...props }) => {
  let containerConfig = {
    base: "container.sm",
    md: "container.md",
    lg: "container.lg",
    xl: "container.xl",
  };

  if (mode === "card") {
    containerConfig = {
      base: "container.sm",
      lg: "container.md",
    };
  }
  return (
    <ChakraContainer maxW={containerConfig} {...props}>
      {children}
    </ChakraContainer>
  );
};

export default Container;

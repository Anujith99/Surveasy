import React from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const Modal = ({
  isOpen,
  onClose,
  title,
  showHeader = true,
  body,
  ...props
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      {...props}
      closeOnOverlayClick={showHeader}
    >
      <ModalOverlay />
      <ModalContent mx={{ base: 2, md: 0 }}>
        {showHeader && (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
          </>
        )}
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;

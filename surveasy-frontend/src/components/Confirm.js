import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import ErrorMessage from "./ErrorMessage";
import { SURVEY_CONFIRM_RESET } from "actions/survey/types";

const Confirm = ({
  isOpen,
  onClose,
  cancelRef,
  title,
  body,
  onConfirm,
  confirmText,
  confirmBtnColor,
  showToastOnConfirm,
  confirmToastText,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, error, errorMessage, success } = useSelector(
    (state) => state.survey.confirm
  );
  useEffect(() => {
    if (success) {
      if (showToastOnConfirm) {
        toast({
          title: "Confirm Success",
          description: confirmToastText,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
      dispatch({ type: SURVEY_CONFIRM_RESET });
    }
  }, [success, onClose, dispatch, showToastOnConfirm, toast, confirmToastText]);
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogBody>
            <>
              {body}
              {error ? (
                <ErrorMessage>
                  {errorMessage !== null
                    ? errorMessage
                    : "Could not perform action.Please try again"}
                </ErrorMessage>
              ) : null}
            </>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} mr={1}>
              Cancel
            </Button>
            <Button
              colorScheme={confirmBtnColor}
              onClick={onConfirm}
              isLoading={loading}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Confirm;

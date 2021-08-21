import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Radio,
  Text,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const EditOptions = ({ question, onChange }) => {
  const [options, setOptions] = useState(question.options);

  const convertToValue = (text) => {
    return text.toLowerCase().replaceAll(" ", "_");
  };

  const handleChange = (e, option) => {
    const updatedText = e.target.value;
    const index = options.findIndex((o) => o.id === option.id);
    let updatedOptions = [...options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      text: updatedText,
      value: convertToValue(updatedText),
    };

    setOptions(updatedOptions);
  };

  const addOption = () =>
    setOptions([
      ...options,
      { id: uuidv4(), text: "New Option", value: convertToValue("New Option") },
    ]);

  const deleteOption = (id) => {
    const updatedOptions = options.filter((o) => o.id !== id);

    setOptions(updatedOptions);
  };

  useEffect(() => {
    onChange(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const renderQuestionType = () => {
    const { questionType } = question;

    switch (questionType) {
      case "mcq":
        return <Radio isChecked={false} readOnly={true} mt={1} />;
      case "checkbox":
        return <Checkbox isChecked={false} readOnly={true} mt={1} />;
      default:
        return null;
    }
  };
  return (
    <Box my={2}>
      {options.map((option, index) => (
        <Flex
          key={option.id}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Flex alignItems="center">
            {question.questionType === "dropdown" ? (
              <Text>{index + 1}.</Text>
            ) : (
              renderQuestionType()
            )}
            <Input
              w={{ base: 250, sm: 350, md: 400 }}
              ml={1}
              variant="flushed"
              value={option.text}
              onChange={(e) => handleChange(e, option)}
            />
          </Flex>
          <Button
            color="red.600"
            _hover={{ color: "red.500" }}
            variant="unstyled"
            pb={0}
            onClick={(e) => deleteOption(option.id)}
          >
            <Icon as={FaTrash} />
          </Button>
        </Flex>
      ))}
      <Button
        mt={1}
        pl={0}
        color="teal.600"
        _hover={{
          color: "teal.500",
        }}
        variant="unstyled"
        leftIcon={<Icon as={FaPlus} />}
        onClick={addOption}
      >
        Add Option
      </Button>
    </Box>
  );
};

export default EditOptions;

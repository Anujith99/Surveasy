import React, { useState } from "react";
import {
  Flex,
  Text,
  Checkbox,
  Switch,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

const infoOptions = [
  { text: "Name", value: "name" },
  { text: "Date Of Birth", value: "dob" },
  { text: "Gender", value: "gender" },
  { text: "Email", value: "email" },
  { text: "Phone Number", value: "phoneNumber" },
];

export const RespondentInfoPreview = ({ info, onClick }) => {
  const renderInfo = () => {
    let outputString = "";
    info.forEach((i, index) => {
      let option = infoOptions.find((o) => o.value === i.info);
      if (option) {
        outputString += `${option.text}${
          index !== info.length - 1 ? ", " : ""
        }`;
      }
    });
    return outputString;
  };
  return (
    <Flex
      align="center"
      cursor={onClick ? "pointer" : "initial"}
      onClick={onClick}
    >
      <Icon
        as={FaUsers}
        w={{ base: 5, md: 6 }}
        h={{ base: 5, md: 6 }}
        mr={2}
        color="gray.600"
      />
      <Text fontWeight="semibold" fontSize={16}>
        {info.length === 0 ? "Know Your Respondents" : renderInfo()}
      </Text>
    </Flex>
  );
};

const EditRespondentInfo = ({
  respondentInfo,
  handleChange,
  isSelected,
  onClick,
}) => {
  const checkboxSize = useBreakpointValue({ base: "md", md: "lg" });
  const [info, setInfo] = useState(respondentInfo);

  const checkForOption = (val) => info.findIndex((i) => i.info === val);

  const handleCheckboxChange = (e) => {
    const updatedInfo = [...info];
    const { value } = e.target;
    let selectedIndex = checkForOption(value);
    if (selectedIndex === -1) {
      updatedInfo.push({ info: value, isRequired: false });
    } else {
      updatedInfo.splice(selectedIndex, 1);
    }
    setInfo(updatedInfo);
    handleChange("respondentInfo", updatedInfo);
  };

  const handleSwitchChange = (val) => {
    let switchIndex = checkForOption(val);
    let updatedInfo = [...info];
    if (switchIndex !== -1) {
      updatedInfo[switchIndex] = {
        ...updatedInfo[switchIndex],
        isRequired: !updatedInfo[switchIndex].isRequired,
      };
      setInfo(updatedInfo);
      handleChange("respondentInfo", updatedInfo);
    }
  };

  const isSwitchChecked = (val) => {
    let switchIndex = checkForOption(val);
    if (switchIndex === -1) {
      return false;
    } else {
      return info[switchIndex].isRequired;
    }
  };

  return (
    <Flex flexDirection="column">
      {!isSelected ? (
        <RespondentInfoPreview info={respondentInfo} onClick={onClick} />
      ) : (
        <>
          <Flex align="center">
            <Icon
              as={FaUsers}
              w={{ base: 5, md: 6 }}
              h={{ base: 5, md: 6 }}
              mr={2}
              color="gray.600"
            />
            <Text fontWeight="semibold" fontSize={{ base: 16, md: 18 }}>
              Know Your Respondents
            </Text>
          </Flex>
          <Text color="gray.500" fontSize={{ base: 12, md: 14 }}>
            Choose the details you would like to know about your respondents.
          </Text>
          <Text fontWeight="semibold" colorScheme="teal" textAlign="right">
            Required?
          </Text>
          {infoOptions.map((option) => (
            <Flex
              position="relative"
              justifyContent="space-between"
              align="flex-end"
              mb={1}
              key={option.value}
            >
              <Checkbox
                isChecked={checkForOption(option.value) !== -1}
                onChange={handleCheckboxChange}
                value={option.value}
                size={checkboxSize}
              >
                {option.text}
              </Checkbox>
              <Switch
                isDisabled={checkForOption(option.value) === -1}
                isChecked={isSwitchChecked(option.value)}
                onChange={() => handleSwitchChange(option.value)}
                position="relative"
                top={1}
              />
            </Flex>
          ))}
        </>
      )}
    </Flex>
  );
};

export default EditRespondentInfo;

import React, { useContext } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { SurveyContext } from "helpers/context";
import { isEmpty } from "helpers/utils";

const RespondentInfo = ({ info }) => {
  const { respondentInfo, updateRespondentInfo } = useContext(SurveyContext);
  const fields = React.useMemo(() => {
    return info.reduce(
      // eslint-disable-next-line no-sequences
      (obj, item) => ((obj[item.info] = item.isRequired), obj),
      {}
    );
  }, [info]);

  const handleChange = (info, value) => {
    updateRespondentInfo(info, value);
  };
  return (
    <>
      {!isEmpty(respondentInfo) && (
        <Flex flexDirection="column">
          {fields.hasOwnProperty("name") && (
            <FormControl id="name" isRequired={fields["name"]}>
              <FormLabel>Name</FormLabel>
              <Input
                width={{ base: "100%", sm: "350px", md: "400px" }}
                variant="flushed"
                placeholder="e.g. John Doe"
                value={respondentInfo["name"].value}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </FormControl>
          )}
          {fields.hasOwnProperty("email") && (
            <FormControl id="email" isRequired={fields["email"]} mt={2}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                width={{ base: "100%", sm: "350px", md: "400px" }}
                variant="flushed"
                placeholder="e.g. john@gmail.com "
                value={respondentInfo["email"].value}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </FormControl>
          )}
          {fields.hasOwnProperty("phoneNumber") && (
            <FormControl
              id="phoneNumber"
              isRequired={fields["phoneNumber"]}
              mt={2}
            >
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                width={{ base: "100%", sm: "350px", md: "400px" }}
                variant="flushed"
                placeholder="e.g. 999-999-9999"
                value={respondentInfo["phoneNumber"].value}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </FormControl>
          )}
          {fields.hasOwnProperty("dob") && (
            <FormControl id="dob" isRequired={fields["dob"]} mt={2}>
              <FormLabel>Date Of Birth</FormLabel>
              <Input
                width={{ base: "100%", sm: "350px", md: "400px" }}
                variant="flushed"
                placeholder="DD-MM-YYYY"
                value={respondentInfo["dob"].value}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            </FormControl>
          )}
          {fields.hasOwnProperty("gender") && (
            <FormControl as="fieldset" mt={2} isRequired={fields["gender"]}>
              <FormLabel as="legend">Gender</FormLabel>
              <RadioGroup
                colorScheme="teal"
                value={respondentInfo["gender"].value}
                onChange={(val) => handleChange("gender", val)}
              >
                <HStack spacing={{ base: "20px", md: "24px" }}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          )}
        </Flex>
      )}
    </>
  );
};

export default RespondentInfo;

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
import { Rifm } from "rifm";

import { SurveyContext } from "helpers/context";
import { isEmpty } from "helpers/utils";
import FormError from "components/Forms/FormError";

const RespondentInfo = ({ info }) => {
  const { respondentInfo, updateRespondentInfo, respondentError } =
    useContext(SurveyContext);
  const fields = React.useMemo(() => {
    return info.reduce(
      // eslint-disable-next-line no-sequences
      (obj, item) => ((obj[item.info] = item.isRequired), obj),
      {}
    );
  }, [info]);

  const parseDigits = (string) => (string.match(/\d+/g) || []).join("");

  const formatDate = (string) => {
    const digits = parseDigits(string);
    const chars = digits.split("");
    return chars
      .reduce(
        (r, v, index) =>
          index === 2 || index === 4 ? `${r}-${v}` : `${r}${v}`,
        ""
      )
      .substr(0, 10);
  };

  const formatDateWithAppend = (string) => {
    const res = formatDate(string);

    if (string.endsWith("-")) {
      if (res.length === 2) {
        return `${res}-`;
      }

      if (res.length === 5) {
        return `${res}-`;
      }
    }
    return res;
  };

  const appendHyphen = (v) => (v.length === 2 || v.length === 5 ? `${v}-` : v);

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
              {respondentError.name && (
                <FormError>Please enter a valid name</FormError>
              )}
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
              {respondentError.email && (
                <FormError>Please enter a valid email</FormError>
              )}
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
                placeholder="e.g. 9999999999"
                value={respondentInfo["phoneNumber"].value}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                maxLength={10}
              />
              {respondentError.phoneNumber && (
                <FormError>Please enter a valid phone number</FormError>
              )}
            </FormControl>
          )}
          {fields.hasOwnProperty("dob") && (
            <FormControl id="dob" isRequired={fields["dob"]} mt={2}>
              <FormLabel>Date Of Birth</FormLabel>
              <Rifm
                accept={/\d+/g}
                mask={10 <= respondentInfo["dob"].value.length}
                format={formatDateWithAppend}
                append={appendHyphen}
                value={respondentInfo["dob"].value}
                onChange={(val) => handleChange("dob", val)}
              >
                {({ value, onChange }) => (
                  <Input
                    width={{ base: "100%", sm: "350px", md: "400px" }}
                    variant="flushed"
                    placeholder="DD-MM-YYYY"
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                  />
                )}
              </Rifm>
              {respondentError.dob && (
                <FormError>Please enter a valid date of birth</FormError>
              )}
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
              {respondentError.gender && (
                <FormError>Please select one option</FormError>
              )}
            </FormControl>
          )}
        </Flex>
      )}
    </>
  );
};

export default RespondentInfo;

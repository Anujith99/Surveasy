import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";

const RespondentInfo = ({ info }) => {
  const fields = React.useMemo(() => {
    return info.reduce(
      // eslint-disable-next-line no-sequences
      (obj, item) => ((obj[item.info] = item.isRequired), obj),
      {}
    );
  }, [info]);
  return (
    <Flex flexDirection="column">
      {fields.hasOwnProperty("name") && (
        <FormControl id="name" isRequired={fields["name"]}>
          <FormLabel>Name</FormLabel>
          <Input
            width={{ base: "100%", sm: "350px", md: "400px" }}
            variant="flushed"
            placeholder="e.g. John Doe"
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
          />
        </FormControl>
      )}
      {fields.hasOwnProperty("phoneNumber") && (
        <FormControl id="phoneNumber" isRequired={fields["phoneNumber"]} mt={2}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            width={{ base: "100%", sm: "350px", md: "400px" }}
            variant="flushed"
            placeholder="e.g. 999-999-9999"
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
          />
        </FormControl>
      )}
      {fields.hasOwnProperty("gender") && (
        <FormControl as="fieldset" mt={2} isRequired={fields["gender"]}>
          <FormLabel as="legend">Gender</FormLabel>
          <RadioGroup colorScheme="teal">
            <HStack spacing={{ base: "20px", md: "24px" }}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      )}
    </Flex>
  );
};

export default RespondentInfo;

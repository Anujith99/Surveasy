import React from "react";
import { Flex, Text } from "@chakra-ui/react";

let survey = {
  surveyDescription:
    "This is a test survey to ensure that all types of questions are working!!",
  isActive: true,
  _id: "61044351c1955f0004f71063",
  surveyTitle: "Test Survey",
  userID: "60dc8eac80fbc40f60d05169",
  respondentInfo: [
    { isRequired: true, info: "name" },
    { isRequired: false, info: "gender" },
    { isRequired: true, info: "email" },
    { isRequired: false, info: "dob" },
    { isRequired: false, info: "phoneNumber" },
  ],
  surveyQuestions: [
    {
      questionId: "a82b43f6-a0a6-443d-a56f-3f1597890e64",
      questionType: "shortText",
      questionIndex: 0,
      questionTitle: "Question 4",
      questionDescription: "This should be the 4th description",
      isRequired: false,
      options: [],
    },
    {
      questionId: "dacd729a-6df2-4280-ab04-d77d12f70ea0",
      questionType: "mcq",
      questionIndex: 1,
      questionTitle: "Question 1 ",
      questionDescription: "This is question 1 description",
      isRequired: true,
      options: [
        {
          id: "f804548f-8485-4555-b03c-df409fdd638d",
          text: "Option 1",
          value: "option_1",
        },
        {
          id: "251f0a60-2638-4ad4-a8fc-ff83ecac7505",
          text: "Option 2",
          value: "option_2",
        },
      ],
    },
    {
      questionId: "61efdea2-9183-44f0-85e6-a1cea2fd29dd",
      questionType: "checkbox",
      questionIndex: 2,
      questionTitle: "Question 2",
      questionDescription: "",
      isRequired: true,
      options: [
        {
          id: "8d95a8b1-28ff-4f79-a4f2-d96c2b40cde8",
          text: "Option 1",
          value: "option_1",
        },
        {
          id: "c5c9219b-00f8-4917-a37d-a7af26b37153",
          text: "Option 2",
          value: "option_2",
        },
      ],
    },
    {
      questionId: "3911d6e0-95e8-4a35-80fb-72cc97cd9fb4",
      questionType: "dropdown",
      questionIndex: 3,
      questionTitle: "Question 3",
      questionDescription: "",
      isRequired: false,
      options: [
        {
          id: "adf628d0-4c58-4625-acca-b67713b1a313",
          text: "Option 1",
          value: "option_1",
        },
        {
          id: "88be8bbf-422e-406a-8cb4-4e830e1cafc7",
          text: "Option 2",
          value: "option_2",
        },
        {
          id: "06639393-0224-496b-abb9-1395c4f6f5de",
          text: "Option 3",
          value: "option_3",
        },
      ],
    },
    {
      questionId: "b94d3048-f222-4e7f-8363-7d77e45a46d6",
      questionType: "longText",
      questionIndex: 4,
      questionTitle: "Question 5",
      questionDescription: "",
      isRequired: true,
      options: [],
    },
  ],
  createdAt: "2021-07-30T18:22:09.342Z",
  updatedAt: "2021-09-19T11:41:17.721Z",
  __v: 0,
};

const Survey = () => {
  return (
    <Flex justifyContent="center" pt={{ base: 2, md: 4 }}>
      <Text fontSize="xxx-large">Survey App</Text>
    </Flex>
  );
};

export default Survey;

import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

import ResponsePieChart from "./ResponsePieChart";
import { isEmpty } from "helpers/utils";

const ResponseCard = ({ response }) => {
  const [answerData, setAnswerData] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    parseData();
  }, []);

  const parseData = () => {
    let { answers, questionInfo } = response;
    let { questionType, options } = questionInfo;
    let parsedData = {};
    if (questionType !== "shortText" && questionType !== "longText") {
      let graphLabels = options.map((option) => {
        parsedData[option.value] = 0;
        return option.text;
      });
      setLabels(graphLabels);
      answers.map((ans) => {
        if (ans.answer.length) {
          parsedData[ans.answer]++;
        }
      });
      setAnswerData(Object.values(parsedData));
    }
  };
  const renderChart = () => {
    const { questionInfo } = response;
    switch (questionInfo.questionType) {
      case "dropdown":
      case "mcq":
        return <ResponsePieChart answerData={answerData} labels={labels} />;
      default:
        return null;
    }
  };
  return (
    <Flex
      flexDirection="column"
      w={"100%"}
      bgColor="white"
      borderRadius={5}
      shadow="sm"
      p={{ base: 3, md: 4 }}
      mb={3}
    >
      <Text fontSize={{ base: "lg", md: "xl" }}>{response.questionTitle}</Text>
      {~isEmpty(response) && <Flex mt={2}>{renderChart()}</Flex>}
    </Flex>
  );
};

export default ResponseCard;

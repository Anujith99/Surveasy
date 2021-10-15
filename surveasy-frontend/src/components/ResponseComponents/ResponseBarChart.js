import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Flex } from "@chakra-ui/layout";
import { getRandomColor } from "helpers/utils";

const ResponseBarChart = ({ answerData, labels }) => {
  const getBGColors = () => {
    let colors = answerData.map((data) => getRandomColor());
    return colors;
  };
  const data = {
    labels: labels,
    datasets: [
      {
        data: answerData,
        backgroundColor: getBGColors(),
      },
    ],
  };
  const options = {
    indexAxis: "y",
    plugins: {
      datalabels: {
        color: "rgba(0,0,0,0.8)",
        font: {
          size: 20,
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return (
    <Flex
      pos="relative"
      width={{ base: "100%", sm: "85%", md: "75%", lg: "65%" }}
    >
      <Bar data={data} plugins={[ChartDataLabels]} options={options} />
    </Flex>
  );
};

export default ResponseBarChart;

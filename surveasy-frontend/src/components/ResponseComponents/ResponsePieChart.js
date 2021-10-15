import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Flex } from "@chakra-ui/layout";

import { getRandomColor } from "helpers/utils";

const ResponsePieChart = ({ answerData, labels }) => {
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
    plugins: {
      datalabels: {
        color: "rgba(0,0,0,0.8)",
        font: {
          size: 24,
        },
      },
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };
  return (
    <Flex
      position="relative"
      width={{ base: "100%", sm: "80%", md: "65%", lg: "50%" }}
    >
      <Pie data={data} plugins={[ChartDataLabels]} options={options} />;
    </Flex>
  );
};

export default ResponsePieChart;

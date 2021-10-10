import { getRandomColor } from "helpers/utils";
import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  return <Pie data={data} plugins={[ChartDataLabels]} options={options} />;
};

export default ResponsePieChart;

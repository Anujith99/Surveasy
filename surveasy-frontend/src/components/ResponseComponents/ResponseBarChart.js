import { getRandomColor } from "helpers/utils";
import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  return <Bar data={data} plugins={[ChartDataLabels]} options={options} />;
};

export default ResponseBarChart;

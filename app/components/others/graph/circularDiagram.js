// components/AnualChart.js

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Text from "@/app/components/others/text/text";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularDiagram = ({ type = "month", data = [] }) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.updated_at);
    if (type === "month") {
      return (
        itemDate.getMonth() + 1 === currentMonth &&
        itemDate.getFullYear() === currentYear
      );
    } else if (type === "year") {
      return itemDate.getFullYear() === currentYear;
    }
    return false;
  });

  const approvedCount = filteredData.filter(
    (item) => item.status.id === 2
  ).length;
  const pendingCount = filteredData.filter(
    (item) => item.status.id === 1
  ).length;
  const deniedCount = filteredData.filter(
    (item) => item.status.id === 3
  ).length;

  const chartData = {
    labels: ["Aprobadas", "Pendientes", "Denegadas"],
    datasets: [
      {
        data: [approvedCount, pendingCount, deniedCount],
        backgroundColor: ["#4fff52", "#36A2EB", "#ff4f4f"],
        hoverBackgroundColor: ["#4fff52", "#36A2EB", "#ff4f4f"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Oculta la leyenda superior
      },
    },
  };

  const dataset = chartData.datasets[0];

  return (
    <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full sm:w-1/2 h-auto">
      <Text
        texto={type === "month" ? "PETICIONES MENSUAL" : "PETICIONES ANUAL"}
        color="blue-secondary"
        type="title"
      />
      <div className="w-40 h-40 mx-auto mb-8">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="mt-8 space-y-4">
        {chartData.labels.map((label, index) => (
          <div key={index} className="flex items-center justify-start space-x-4">
            <div className="flex items-center">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: dataset.backgroundColor[index] }}
              ></div>
              <span className="text-black font-bold">{label}:</span>
            </div>
            <span className="font-bold">{dataset.data[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularDiagram;

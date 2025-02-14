import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Text from "@/app/components/others/text/text";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularDiagram = ({ type = "month", data = [] }) => {
  // Asegúrate de que 'data' sea un arreglo
  const filteredData = Array.isArray(data) ? data : [];

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const filteredResults = filteredData.filter((item) => {
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

  const approvedCount = filteredResults.filter(
    (item) => item.status.id === 1
  ).length;
  const pendingCount = filteredResults.filter(
    (item) => item.status.id === 2
  ).length;
  const deniedCount = filteredResults.filter(
    (item) => item.status.id === 3
  ).length;
  const inProcessCount = filteredResults.filter(
    (item) => item.status.id === 35 // Asumiendo que el ID para "En proceso" es 2
  ).length;

  const chartData = {
    labels: ["Aprobadas", "En espera","En proceso", "Denegadas" ],
    datasets: [
      {
        data: [approvedCount, pendingCount,inProcessCount, deniedCount ],
        backgroundColor: ["#4fff52", "#36A2EB", "#ffc107","#ff4f4f" ],
        hoverBackgroundColor: ["#4fff52", "#36A2EB", "#ffc107","#ff4f4f" ],
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
    <div className=" rounded-lg px-8 py-6 w-full sm:w-auto h-auto">
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
            <span className="text-black font-bold">{dataset.data[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularDiagram;

// components/AnualChart.js

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularDiagram = ({ type = 'month', data = [] }) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.updated_at);
    if (type === 'month') {
      return itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
    } else if (type === 'year') {
      return itemDate.getFullYear() === currentYear;
    }
    return false;
  });

  const approvedCount = filteredData.filter((item) => item.status.id === 2).length;
  const pendingCount = filteredData.filter((item) => item.status.id === 1).length;
  const deniedCount = filteredData.filter((item) => item.status.id === 3).length;

  const chartData = {
    labels: ['Aprobadas', 'Pendientes', 'Denegadas'],
    datasets: [
      {
        data: [approvedCount, pendingCount, deniedCount],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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
      <div className="bg-white shadow-md rounded-lg p-8 text-center w-1">
        <h2 className="text-4xl font-bold text-blue-700 mb-8">
          {type === 'month' ? 'Mes Actual' : 'Año Actual'}
        </h2>
        <div className="w-64 h-64 mx-auto mb-8">
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="mt-8 space-y-4">
          {chartData.labels.map((label, index) => (
            <div key={index} className="flex items-center justify-center">
            </div>
          ))}
        </div>
      </div>
  );
};

export default CircularDiagram;

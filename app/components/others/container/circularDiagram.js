// components/AnualChart.js

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularDiagram = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo'],
    datasets: [
      {
        data: [20200500, 140200500, 200200500],
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

  const dataset = data.datasets[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-lg">
        <h2 className="text-4xl font-bold text-blue-700 mb-8">anual</h2>
        <div className="w-64 h-64 mx-auto mb-8">
          <Doughnut data={data} options={options} />
        </div>
        <div className="mt-8 space-y-4">
          {data.labels.map((label, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="w-6 h-6" style={{ backgroundColor: dataset.backgroundColor[index] }}></div>
              <span className="text-lg ml-2">{label}: {dataset.data[index].toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircularDiagram;




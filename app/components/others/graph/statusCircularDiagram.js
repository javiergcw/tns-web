import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const StatusBuy = ({ time, data }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Enero es 0
  const currentYear = currentDate.getFullYear();

  // Filtrar datos según el tiempo seleccionado
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.updated_at);
    const itemMonth = itemDate.getMonth() + 1;
    const itemYear = itemDate.getFullYear();

    if (time === 'month') {
      return itemMonth === currentMonth && itemYear === currentYear;
    } else if (time === 'year') {
      return itemYear === currentYear;
    }
    return false;
  });

  // Contar compras aprobadas, denegadas y pendientes
  const countStatus = (statusId) => {
    return filteredData.reduce((count, item) => {
      return item.status && item.status.id === statusId ? count + 1 : count;
    }, 0);
  };

  const approvedCount = countStatus(2);
  const pendingCount = countStatus(1);
  const deniedCount = countStatus(3);

  const chartData = {
    labels: ['Rechazadas', 'Aprobadas', 'Pendientes'],
    datasets: [
      {
        label: 'Compras',
        data: [deniedCount, approvedCount, pendingCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `Estadísticas de Compras - ${time === 'month' ? 'Mes' : 'Año'}`,
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
        },
        formatter: (value) => {
          return `${value}`;
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">ESTADÍSTICAS</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default StatusBuy;

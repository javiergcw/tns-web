import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const StatusBuy = () => {
  const data = {
    labels: ['Canceladas', 'Aprobadas', 'Pendientes'],
    datasets: [
      {
        label: 'Compras',
        data: [3, 7, 10],
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
        text: 'Estadísticas de Compras',
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
        },
        formatter: (value, context) => {
          return `${value}`;
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">ESTADÍSTICAS</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default StatusBuy;

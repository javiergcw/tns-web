// CustomComponent.jsx

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getShoppingById } from '@/app/services/shoppingService'; // Asegúrate de que la ruta sea correcta

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Precio',
    },
  },
};

const CustomComponent = ({ shoppingId }) => {
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopping = async () => {
      try {
        const shoppingData = await getShoppingById(shoppingId);
        setPurchaseStatus(shoppingData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopping();
  }, [shoppingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const items = purchaseStatus ? purchaseStatus.products : [];

  const data = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: 'Prices',
        data: items.map((item) => item.price),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-start p-4 bg-gray-100 w-full lg:w-4/6 h-full">
        <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg w-full mb-4">
          <p className="text-lg lg:text-2xl font-bold mb-2">{purchaseStatus.title || "Título no disponible"}</p>
          <p className="text-gray-700">{purchaseStatus.description || "Descripción no disponible"}</p>
        </div>

        {purchaseStatus && (
          <div className="flex flex-wrap justify-between w-full mb-4">
            <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/4 mx-1 mb-4 lg:mb-0 order-1 lg:order-1">
              <span className="text-2xl lg:text-3xl">📅</span>
              <p className="text-gray-700 font-bold">Fecha</p>
              <p className="text-gray-700">{new Date(purchaseStatus.request_date).toLocaleDateString()}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/4 mx-1 mb-4 lg:mb-0 order-3 lg:order-2">
              <span className="text-2xl lg:text-3xl">📋</span>
              <p className="text-gray-700 font-bold">Estado</p>
              <p className="text-gray-700">{purchaseStatus.status.name}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-full lg:w-1/4 mx-1 mb-4 lg:mb-0 order-2 lg:order-3">
              <span className="text-2xl lg:text-3xl">🧑🏻</span>
              <p className="text-gray-700 font-bold">Líder</p>
              <p className="text-gray-700">{purchaseStatus.user.profile.name}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg w-full">
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="flex flex-col items-start px-4 py-4 bg-gray-100 w-full lg:w-2/6 overflow-y-auto h-full" style={{ maxHeight: '700px' }}>
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-lg mb-4 w-full h-auto flex-shrink-0">
            <h3 className="text-lg lg:text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-gray-700">{item.description}</p>
            <p className="text-gray-700">Precio: ${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );



}

export default CustomComponent;

// LatestStatisticalRequestsView.js

import React, { useEffect, useState } from 'react';
import { getLatestStatisticalRequestsOfTheMonth } from '@/app/services/shoppingService';

const LatestStatisticalRequestsView = () => {
  const [recentShoppings, setRecentShoppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentShoppings = async () => {
      try {
        const shoppings = await getLatestStatisticalRequestsOfTheMonth();
        setRecentShoppings(shoppings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentShoppings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Últimas Solicitudes Estadísticas del Mes</h1>
      {recentShoppings.length === 0 ? (
        <p>No hay solicitudes recientes.</p>
      ) : (
        <ul>
          {recentShoppings.map((shopping) => (
            <li key={shopping.id}>
              <h2>{shopping.title}</h2>
              <p>{shopping.description}</p>
              <p>Categoría: {shopping.category.name}</p>
              <p>Estado: {shopping.status.name}</p>
              <p>Usuario: {shopping.user.profile.name}</p>
              <p>Productos:</p>
              <ul>
                {shopping.products.map((product) => (
                  <li key={product.id}>
                    {product.name} - {product.description} - ${product.price}
                  </li>
                ))}
              </ul>
              <p>Fecha de Solicitud: {new Date(shopping.request_date).toLocaleDateString()}</p>
              <p>Fecha de Pendiente: {new Date(shopping.pending_date).toLocaleDateString()}</p>
              <p>Fecha de Aprobación: {new Date(shopping.date_approval).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LatestStatisticalRequestsView;

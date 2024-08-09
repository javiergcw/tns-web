import React, { useEffect, useState } from "react";
import { getLatestStatisticalRequestsOfTheMonth } from "@/app/services/shoppingService";

const ShoppingSummary = () => {
  const [shoppings, setShoppings] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0); // Inicializar con 0

  useEffect(() => {
    const fetchShoppings = async () => {
      try {
        const response = await getLatestStatisticalRequestsOfTheMonth();
        
        // Verificar si la respuesta tiene el formato esperado
        if (Array.isArray(response)) {
          setShoppings(response); // Asignar directamente el array de compras
        } else {
          setShoppings(response.recent_shoppings || []); // Asignar las compras si existen
          setMonthlyExpenses(response.monthly_expenses || 0); // Asignar el valor de monthly_expenses si existe
        }
      } catch (error) {
        console.error("Error al cargar las compras:", error);
      }
    };

    fetchShoppings();
  }, []);

  const calculateTotal = (products) => {
    return products.reduce((acc, product) => acc + product.price, 0);
  };

  return (
    <div>
      <h2>Resumen de Compras Recientes</h2>
      <ul>
        {shoppings.length > 0 ? (
          shoppings.map((shopping, index) => (
            <li key={index}>
              <strong>{shopping.title ?? "N/A"}</strong>: {calculateTotal(shopping.products)}
            </li>
          ))
        ) : (
          <li>No hay compras recientes disponibles.</li>
        )}
      </ul>
      <h3>Gastos Mensuales Totales: {monthlyExpenses}</h3> {/* Mostrar el valor de monthly_expenses */}
    </div>
  );
};

export default ShoppingSummary;

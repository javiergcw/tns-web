import React, { useEffect, useState } from "react";
import Text from "@/app/components/others/text/text";
import { getLatestStatisticalRequestsOfTheMonth } from "@/app/services/shoppingService";

/**
 * MonthlyExpenses Component
 *
 * Este componente muestra la suma total de los gastos del mes y una lista de los detalles de los gastos.
 *
 * @component
 */
const MonthlyExpenses = () => {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      try {
        const response = await getLatestStatisticalRequestsOfTheMonth();

        if (Array.isArray(response)) {
          setData(response.map(shopping => ({
            title: shopping.title,
            totalPrice: shopping.products.reduce((acc, product) => acc + product.price, 0)
          })));
        } else {
          setData(response.recent_shoppings.map(shopping => ({
            title: shopping.title,
            totalPrice: shopping.products.reduce((acc, product) => acc + product.price, 0)
          })) || []);
          setTotal(response.monthly_expenses || 0);
        }
      } catch (error) {
        console.error("Error al cargar los gastos mensuales:", error);
      }
    };

    fetchMonthlyExpenses();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-auto w-full sm:w-1/2">
      <Text texto="GASTOS DEL MES" color="blue-secondary" type="title" />
      <Text
        texto={
          total.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })
        }
        color="green"
        type="title"
        className="text-2xl font-bold mb-4"
      />
      <ul className="mt-4 overflow-y-auto max-h-48">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-start text-gray-600 text-2xl py-1 border-b"
          >
            <span className="font-bold">
              {item.totalPrice.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </span>
            <span className="mx-2">|</span> {/* Divisor vertical */}
            <span>{item.title || "Sin título"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyExpenses;

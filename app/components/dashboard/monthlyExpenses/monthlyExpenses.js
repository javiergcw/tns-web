import React, { useEffect } from "react";
import Text from "@/app/components/others/text/text";

/**
 * MonthlyExpenses Component
 *
 * Este componente muestra la suma total de los gastos del mes y una lista de los detalles de los gastos.
 *
 * @param {number} total - La suma total de los valores de la lista.
 * @param {Array} data - Una lista de objetos que contiene el valor y el título de cada gasto.
 *
 * @component
 */
const MonthlyExpenses = ({ total = 0, data = [] }) => {
  useEffect(() => {}, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64 w-1/2">
      <Text texto="GASTOS DEL MES" color="blue-secondary" type="title" />
      <Text
        texto={
          "Total: " +
          total.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })
        }
        color="green"
        type="title"
      />
      <ul className="mt-4 overflow-y-scroll">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex justify-between text-gray-600 text-sm py-1 border-b"
          >
            <span>
              {item.price
                ? item.price.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })
                : "N/A"}
            </span>
            <span className="ml-4">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyExpenses;

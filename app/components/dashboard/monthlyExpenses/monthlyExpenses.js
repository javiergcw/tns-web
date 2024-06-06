import React from 'react';
import Text from '@/app/components/others/text/text';

/**
 * MonthlyExpenses Component
 *
 * Este componente muestra la suma total de los gastos del mes y una lista de los detalles de los gastos.
 *
 * @param {number} total - La suma total de los valores de la lista.
 * @param {Array} expenses - Una lista de objetos que contiene el valor y el título de cada gasto.
 *
 * @component
 */
const MonthlyExpenses = ({ total, expenses }) => {
  return (
    <>
      <Text texto="GASTOS DEL MES" color="blue" type="header" />
      <div className="bg-white p-4 rounded-lg mt-4">
        <Text texto={total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} color="green" type="title" />
        <ul className="mt-4">
          {expenses.map((expense, index) => (
            <li key={index} className="flex justify-between text-gray-600 text-sm py-1 border-b">
              <Text texto={expense.value.toLocaleString('es-CO', { style: 'currency', currency: 'USD' })} color="black" type="normal" />
              <Text texto={expense.title} color="black" type="normal" className="ml-4" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MonthlyExpenses;

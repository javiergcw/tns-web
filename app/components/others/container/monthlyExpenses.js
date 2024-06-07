import React from 'react';

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
      <div className="bg-gray-200 p-4 rounded-t-lg max-w-2xl mx-auto">
        <div className="text-blueSecundary text-2xl font-poppins">GASTOS DEL MES</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-1.5">
        <div className="text-green-500 text-3xl font-semibold">{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</div>
        <ul className="mt-4">
          {expenses.map((expense, index) => (
            <li key={index} className="flex justify-start items-center text-gray-700 text-lg py-2 border-b border-gray-200">
              <div className="text-black flex-initial">{expense.value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</div>
              <div className="text-black mx-3">|</div> {/* Separador añadido */}
              <div className="text-black flex-shrink-0 w-48">{expense.title}</div>
            </li>                                                                                                   
          ))}
        </ul>
      </div>
    </>
  );
};

export default MonthlyExpenses;

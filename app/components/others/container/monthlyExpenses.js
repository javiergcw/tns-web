import React from 'react';

const MonthlyExpenses = ({ total = "0", gastos = [] }) => {
    return (
        <div className="p-4 bg-white shadow-lg rounded-md max-w-md mx-auto">
        <h1 className="text-blue-600 text-xl font-bold mb-2">GASTOS DEL MES</h1>
        <h2 className="text-green-500 text-3xl font-bold mb-4">{total} COP</h2>
        <div className="space-y-2">
          {gastos.length > 0 ? (
            gastos.map((gasto, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{gasto.cantidad}$</span>
                <span className="text-gray-700 font-semibold">{gasto.descripcion}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay gastos registrados.</p>
          )}
        </div>
      </div>
      );
};

export default MonthlyExpenses;

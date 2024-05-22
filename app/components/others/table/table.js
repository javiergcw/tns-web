import React from "react";
/**
 * Table Component
 *
 * Este componente genera una tabla que acepta una cantidad variable de columnas y registros.
 *
 * @param {Array} columns - Un arreglo con los títulos de las columnas.
 * @param {Array} data - Un arreglo de arreglos, donde cada arreglo interno representa una fila de la tabla.
 *
 **/

const Table = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-black"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="py-2 px-4 border-b border-gray-300 text-black"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// components/ProductTable.js

import React from 'react';
import '/app/ProductTable.css'; // Asegúrate de importar el archivo CSS

const ProductTable = ({ data }) => {

/**
 * ProductTable Component
 * Este componente muestra una tabla de seguimiento de peticiones.
 * @param {Array} data - Una lista de objetos que contiene los detalles de las peticiones.
 * @component
 */
const ProductTable = ({ data }) => {
  const columns = [
    "ITEM",
    "LÍDER DE ÁREA",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA APROBADO",
    "FECHA FINALIZACIÓN",
  ];

  // Verifica que data es un arreglo antes de mapear
  const rows = Array.isArray(data)
    ? data.map((item) => [
        item.item,
        item.areaLeader,
        item.status,
        item.requestDate,
        item.approvalDate,
        item.endDate,
      ])
    : [];

  return (
    <table className="product-table min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">ID</th>
          <th className="py-2">Name</th>
          <th className="py-2">URL</th>
          <th className="py-2">Description</th>
          <th className="py-2">Price</th>
          <th className="py-2">Created At</th>
          <th className="py-2">Updated At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="py-2 px-4">{product.id}</td>
            <td className="py-2 px-4">{product.name}</td>
            <td className="py-2 px-4">
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                Link
              </a>
            </td>
            <td className="py-2 px-4">{product.description}</td>
            <td className="py-2 px-4">{product.price}</td>
            <td className="py-2 px-4">{new Date(product.createdAt).toLocaleString()}</td>
            <td className="py-2 px-4">{new Date(product.updatedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

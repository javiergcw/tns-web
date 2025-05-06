"use client";
import React, { useEffect } from "react";

// Función para formatear los montos con separador de miles
const formatCurrency = (value) => {
  return isNaN(value)
    ? "0"
    : parseFloat(value).toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
};

export const OrderPDF = ({ order, onReady }) => {
  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);

  return (
    <div
      id="pdf-content"
      className="w-[794px] min-h-[1123px] bg-white text-black font-sans"
      style={{ margin: 0, padding: 0, fontSize: "12px", lineHeight: "1.5" }}
    >
      {/* Encabezado */}
      <img
        src="/images/pdf/header.png"
        alt="Encabezado"
        className="w-full h-[240px] object-cover"
        style={{ display: "block", margin: 0, padding: 0 }}
        onError={(e) => (e.target.src = "/images/pdf/fallback-header.png")}
      />

      {/* Título */}
      <div className="mt-6 mb-4 text-center">
        <h1 className="mb-12 text-2xl font-bold text-gray-500 uppercase">
          Orden de Compra
        </h1>
      </div>

      {/* Datos de Encabezado */}
      <div className="grid grid-cols-2 gap-4 px-8 mb-12">
        <div>
          <p>
            <span className="font-semibold text-blue-700">Encargado:</span>{" "}
            {order.encargado || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-blue-700">Área o proceso:</span>{" "}
            {order.area || "N/A"}
          </p>
        </div>
        <div className="text-right">
          <p>
            <span className="font-semibold text-blue-700">No. de orden:</span>{" "}
            {order.numero_orden || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-blue-700">Fecha:</span>{" "}
            {order.fecha || "N/A"}
          </p>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="px-8 mb-6">
        <table className="w-full text-xs border-collapse">
          <thead className="text-gray-500 bg-white">
            <tr>
              <th className="p-3 font-semibold text-left border border-blue-200">
                Concepto
              </th>
              <th className="p-3 font-semibold text-left border border-blue-200">
                Descripción
              </th>
              <th className="p-3 font-semibold text-left border border-blue-200">
                Cantidad
              </th>
              <th className="p-3 font-semibold text-left border border-blue-200">
                Valor unitario
              </th>
              <th className="p-3 font-semibold text-left border border-blue-200">
                Total (sin IVA)
              </th>
            </tr>
          </thead>
          <tbody>
            {order.productos && order.productos.length > 0 ? (
              order.productos.map((prod, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  <td className="p-3 text-gray-500 border border-blue-200">
                    {prod.nombre || "N/A"}
                  </td>
                  <td className="p-3 text-gray-500 border border-blue-200">
                    {prod.descripcion || "N/A"}
                  </td>
                  <td className="p-3 text-gray-500 border border-blue-200">
                    {prod.cantidad || 1}
                  </td>
                  <td className="p-3 text-gray-500 border border-blue-200">
                    ${formatCurrency(prod.precio || 0)}
                  </td>
                  <td className="p-3 text-gray-500 border border-blue-200">
                    ${formatCurrency((prod.precio || 0) * (prod.cantidad || 1))}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td className="p-3 text-gray-500 border border-blue-200">
                  {order.titulo || "N/A"}
                </td>
                <td className="p-3 text-gray-500 border border-blue-200">
                  {order.description || "N/A"}
                </td>
                <td className="p-3 text-gray-500 border border-blue-200">1</td>
                <td className="p-3 text-gray-500 border border-blue-200">
                  ${formatCurrency(order.subtotal || 0)}
                </td>
                <td className="p-3 text-gray-500 border border-blue-200">
                  ${formatCurrency(order.subtotal || 0)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totales y Cuenta */}
      <div className="px-8 mb-32">
        <p className="mb-3 font-semibold text-gray-500">
          ¿A qué cuenta de gastos va? {order.cuenta_gastos || "N/A"}
        </p>
        <div className="text-right">
          <p className="font-semibold">
            SUBTOTAL:{" "}
            <span className="text-blue-800">
              ${formatCurrency(order.subtotal)}
            </span>
          </p>
          <p className="font-semibold">
            IVA:{" "}
            <span className="text-blue-800">
              ${formatCurrency(order.iva)}
            </span>
          </p>
          <p className="font-semibold">
            RETEFUENTE:{" "}
            <span className="text-blue-800">
              ${formatCurrency(order.retefuente)}
            </span>
          </p>
          <p className="font-semibold">
            TOTAL:{" "}
            <span className="text-blue-800">
              ${formatCurrency(order.total)}
            </span>
          </p>
        </div>
      </div>

      {/* Firmas */}
      <div className="grid grid-cols-2 gap-4 px-8 mb-12 text-center">
        <div>
          <p className="mb-2 border-t border-gray-400"></p>
          <p className="text-xs text-gray-600">Ordenado por</p>
          <p>{order.encargado || "N/A"}</p>
        </div>
        <div>
          <p className="mb-2 border-t border-gray-400"></p>
          <p className="text-xs text-gray-600">Autorizado por</p>
          <p>Felipe Chavez</p>
        </div>
      </div>

      {/* Pie de Página */}
      <img
        src="/images/pdf/footer.png"
        alt="Pie de Página"
        className="w-full h-[50px] object-cover absolute bottom-0"
        style={{ display: "block", margin: 0, padding: 0 }}
        onError={(e) => (e.target.src = "/images/pdf/fallback-footer.png")}
      />
    </div>
  );
};

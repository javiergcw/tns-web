"use client";
import React, { useEffect } from "react";

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
      <div className="text-center mt-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-500 uppercase mb-12">
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
        <table className="w-full border-collapse text-xs">
          <thead className="bg-white text-gray-500">
            <tr>
              <th className="p-3 border border-blue-200 text-left font-semibold">
                Concepto
              </th>
              <th className="p-3 border border-blue-200 text-left font-semibold">
                Descripción
              </th>
              <th className="p-3 border border-blue-200 text-left font-semibold">
                Cantidad
              </th>
              <th className="p-3 border border-blue-200 text-left font-semibold">
                Valor unitario
              </th>
              <th className="p-3 border border-blue-200 text-left font-semibold">
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
                  <td className="p-3 border border-blue-200 text-gray-500">
                    {prod.nombre || "N/A"}
                  </td>
                  <td className="p-3 border border-blue-200 text-gray-500">
                    {prod.descripcion || "N/A"}
                  </td>
                  <td className="p-3 border border-blue-200 text-gray-500">
                    {prod.cantidad || 1}
                  </td>
                  <td className="p-3 border border-blue-200 text-gray-500">
                    ${parseFloat(prod.precio || 0).toFixed(2)}
                  </td>
                  <td className="p-3 border border-blue-200 text-gray-500">
                    $
                    {parseFloat((prod.precio || 0) * (prod.cantidad || 1)).toFixed(
                      2
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td className="p-3 border border-blue-200 text-gray-500">
                  {order.titulo || "N/A"}
                </td>
                <td className="p-3 border border-blue-200 text-gray-500">
                  {order.description || "N/A"}
                </td>
                <td className="p-3 border border-blue-200 text-gray-500">1</td>
                <td className="p-3 border border-blue-200 text-gray-500">
                  ${parseFloat(order.total || 0).toFixed(2)}
                </td>
                <td className="p-3 border border-blue-200 text-gray-500">
                  ${parseFloat(order.subtotal || 0).toFixed(2)}
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
              $
              {isNaN(parseFloat(order.subtotal))
                ? "0.00"
                : parseFloat(order.subtotal).toFixed(2)}
            </span>
          </p>
          <p className="font-semibold">
            IVA:{" "}
            <span className="text-blue-800">
              $
              {isNaN(parseFloat(order.iva))
                ? "0.00"
                : parseFloat(order.iva).toFixed(2)}
            </span>
          </p>
          <p className="font-semibold">
            RETEFUENTE:{" "}
            <span className="text-blue-800">
              $
              {isNaN(parseFloat(order.retefuente))
                ? "0.00"
                : parseFloat(order.retefuente).toFixed(2)}
            </span>
          </p>
          <p className="font-semibold">
            TOTAL:{" "}
            <span className="text-blue-800">
              $
              {isNaN(parseFloat(order.total))
                ? "0.00"
                : parseFloat(order.total).toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Firmas */}
      <div className="grid grid-cols-2 gap-4 text-center px-8 mb-12">
        <div>
          <p className="border-t border-gray-400 mb-2"></p>
          <p className="text-xs text-gray-600">Ordenado por</p>
          <p>{order.encargado || "N/A"}</p>
        </div>
        <div>
          <p className="border-t border-gray-400 mb-2"></p>
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
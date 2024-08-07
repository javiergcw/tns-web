import React from "react";
import Table from "@/app/components/others/table/table";
import Text from "@/app/components/others/text/text";

/**
 * TrackingTable Component
 * Este componente muestra una tabla de seguimiento de peticiones.
 * @param {Array} data - Una lista de objetos que contiene los detalles de las peticiones.
 * @component
 */
const TrackingTable = ({ data }) => {
  const columns = [
    "ID",
    "ITEM",
    "CATEGORÍA",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA PENDIENTE",
    "FECHA APROBADO",
  ];

  // Verifica que data es un arreglo antes de mapear
  const rows = Array.isArray(data)
    ? data.flatMap((item) =>
      item.products.map((product) => [
        item.id,
        product.name,
        item.category ? item.category.name : "N/A",
        item.status ? item.status.name : "N/A",
        item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : "N/A",
        item.pending_date
          ? new Date(item.pending_date).toLocaleDateString()
          : "N/A",
        item.date_approval
          ? new Date(item.date_approval).toLocaleDateString()
          : "N/A",
      ])
    )
    : [];

  console.log("TrackingTable input data:", data);
  console.log("TrackingTable rows:", rows);

  return (
    <>
      <Text texto="TRACKING PETICIONES" color="blue-secondary" type="header" />
      <div className="bg-white p-4 rounded-lg mt-4 overflow-x-auto">
        <Table columns={columns} data={rows} />
      </div>
    </>
  );
};

export default TrackingTable;

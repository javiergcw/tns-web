import React from "react";
import Table from "@/app/components/others/table/table";
import Text from "@/app/components/others/text/text";

/**
 * TrackingTable Component
 *
 * Este componente muestra una tabla de seguimiento de peticiones.
 *
 * @param {Array} data - Una lista de objetos que contiene los detalles de las peticiones.
 *
 * @component
 */
const TrackingTable = ({ data }) => {
  const columns = [
    "ITEM",
    "LIDER DE AREA",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA APROBADO",
    "FECHA FINALIZACIÓN",
  ];
  const rows = data.map((item) => [
    item.item,
    item.leader,
    item.status,
    item.requestDate,
    item.approvedDate,
    item.endDate,
  ]);

  return (
    <>
      <Text texto="TRACKING PETICIONES" color="blue" type="header" />
      <div className="bg-white p-4 rounded-lg mt-4 overflow-x-auto">
        <Table columns={columns} data={rows} />
      </div>
    </>
  );
};

export default TrackingTable;

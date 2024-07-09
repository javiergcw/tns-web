"use client";
import Table from "@/app/components/others/table/table";
import Text from "@/app/components/others/text/text";

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

  console.log("ProductTable data:", data);
  console.log("ProductTable rows:", rows);

  return (
    <>
      <Text texto="TRACKING PETICIONES" color="blue-secondary" type="header" />
      <div className="bg-white p-4 rounded-lg mt-4 overflow-x-auto">
        <Table columns={columns} data={rows} />
      </div>
    </>
  );
};

export default ProductTable;

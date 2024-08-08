import React, { useState } from "react";
import LastRequestDetailsModal from "../lastRequestDetails/lastRequestDetails";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";

/**
 * LastRequest Component
 *
 * Este componente representa una tarjeta que contiene un botón para abrir un modal.
 * El modal muestra cualquier contenido pasado como `children`.
 *
 * @param {object} item - Objeto que contiene la información de la petición
 *
 * @component
 */
const LastRequest = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Extraer datos del objeto item
  const categoryName = item.category.name;
  const productNames = item.products.map((product) => product.name).join(", ");
  const totalValue = item.products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto h-auto w-1/3">
      <Text
        texto={categoryName}
        color="blue-secondary"
        type="title"
        className="text-left mb-1"
      />
      <Text
        texto={item.user.profile.name}
        color="green"
        type="subtitle"
        className=""
      />
      <hr className="border-black my-1" />
      <Text texto="Productos: " color="blue-secondary" type="title" />
      <Text
        texto={`${productNames}`}
        color="green"
        type="subtitle"
        className="text-left mb-1 font-bold"
      />
      <Text
        texto={`Total Value: ${totalValue}`}
        color="grey"
        type="subtitle"
        className="text-left mt-1"
      />
      <NormalButton text="Ver Detalles" onClick={handleModalToggle} />
      <LastRequestDetailsModal isOpen={isModalOpen} onClose={handleModalToggle} item={item} total={totalValue}>
        {/* Aquí puedes pasar más detalles del item al modal si es necesario */}
      </LastRequestDetailsModal>
    </div>
  );
};

export default LastRequest;

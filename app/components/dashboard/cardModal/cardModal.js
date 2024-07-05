import React, { useState } from "react";
import Modal from "@/app/components/others/modal/modal";
import NormalButton from "@/app/components/others/button/normalButton";

/**
 * CardModal Component
 *
 * Este componente representa una tarjeta que contiene un botón para abrir un modal. El modal muestra cualquier contenido pasado como `children`.
 *
 * @param {object} children
 * @param {string} cardTitle
 * @param {string} buttonText
 *
 * @component
 */
const CardModal = ({ children, cardTitle, buttonText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{cardTitle}</h2>
      <NormalButton text={buttonText} onClick={handleModalToggle} />
      {isModalOpen && <Modal onClose={handleModalToggle}>{children}</Modal>}
    </div>
  );
};

export default CardModal;

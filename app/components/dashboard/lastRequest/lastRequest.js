import React, { useState } from "react";
import Modal from "react-modal";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";

Modal.setAppElement("#__next"); // Asegúrate de que esto apunta al elemento correcto en tu aplicación

/**
 * CardModal Component
 *
 * Este componente representa una tarjeta que contiene un botón para abrir un modal. El modal muestra cualquier contenido pasado como `children`.
 *
 * @param {object} children
 * @param {string} cardTitle
 * @param {string} buttonText
 * @param {string} area
 * @param {string} leader
 * @param {string} description
 *
 * @component
 */
const lastRequest = ({ children, cardTitle, buttonText, area, leader, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto h-64 w-1/3">
      <Text
        texto={area}
        color="blue-secondary"
        type="title"
        className="text-left mb-1"
      />
      <hr className="border-black my-1" />
      <Text
        texto={leader}
        color="green"
        type="subtitle"
        className="text-left mb-1 font-bold"
      />
      <Text
        texto="descripción:"
        color="blue-secondary"
        type="normal"
        className="text-left mt-1 font-bold"
      />
      <Text
        texto={description}
        color="grey"
        type="normal"
        className="text-left mt-1"
      />
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalToggle}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </div>
  );
};

export default lastRequest;

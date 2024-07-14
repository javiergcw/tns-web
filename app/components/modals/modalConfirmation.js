// components/others/modal/ConfirmationModal.js
import React from 'react';
import Modal from 'react-modal';
import { RedButton,BlueButton } from '@/app/utils/Buttons'; // Importa ambos botones
import { IoClose } from "react-icons/io5";

Modal.setAppElement('#__next'); // Asegúrate de que esto apunta al elemento correcto

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, title, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmación"
      className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10 relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        <IoClose size={24} />
      </button>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end">
        <BlueButton
          text="Confirmar"
          onClick={onConfirm}
          className="mr-2"
        />
        <RedButton
          text="Cancelar"
          onClick={onRequestClose}
        />
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

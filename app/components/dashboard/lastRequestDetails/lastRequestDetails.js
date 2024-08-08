import React, { useState } from "react";
import NormalButton from "@/app/components/others/button/normalButton";
import Text from "@/app/components/others/text/text";
/**
 * SimpleModal Component
 *
 * Este componente representa un modal simple con un título, una descripción y dos botones (Aceptar y Cancelar).
 *
 * @component
 */
const LastRequestDetailsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <Text
          texto="Titutl"
          color="blue-secondary"
          type="bigTitle"
          className="text-left mb-1"
        />
        <hr></hr>
        <p className="mb-6">
          This is the description of the modal. You can put any content you like
          here.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastRequestDetailsModal;

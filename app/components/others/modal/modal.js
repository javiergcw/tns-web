import React from "react";
import ReactDOM from "react-dom";

/**
 * Modal Component
 *
 * Este componente representa un modal que se muestra como un overlay. Contiene un botón para cerrarlo y muestra cualquier contenido pasado como `children`.
 *
 * @param {function} onClose - La función para cerrar el modal.
 * @param {object} children - El contenido a mostrar dentro del modal.
 *
 * @component
 */
const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-transparent text-black text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;

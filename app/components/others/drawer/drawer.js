import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import {
  MdDashboard,
  MdSettings,
  MdPerson,
  MdHelp,
  MdExitToApp,
} from "react-icons/md";

/**
 * Drawer Component
 *
 * Este componente genera un menú lateral desplegable con 5 ítems.
 *
 * @component
 */
const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del drawer entre abierto y cerrado
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      // Estilos dinámicos para ajustar el ancho del drawer basado en su estado
      className={`fixed top-0 left-0 h-full bg-[#004F9F] text-white ${
        isOpen ? "w-72" : "w-16"
      } transition-width duration-300 ease-in-out flex flex-col items-center`}
    >
      <button
        // Botón para abrir/cerrar el drawer
        onClick={toggleDrawer}
        className="mt-4 bg-transparent text-white px-2 py-1 rounded-md"
      >
        <IoMenu className="text-green-500 text-2xl" /> {/* Icono de menú */}
      </button>
      {isOpen && (
        // Contenido del drawer cuando está abierto
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between w-full px-4 mt-4">
            <div className="flex items-center">
              <img
                // Imagen de perfil con borde verde
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="w-12 h-12 rounded-full mr-3 border-2 border-green-500"
              />
              <div>
                <div>Nombre Apellido1 Apellido2</div>
                <div className="text-green-500 text-sm">Jefe de área</div>
              </div>
            </div>
            <button
              // Botón adicional para cerrar el drawer
              onClick={toggleDrawer}
              className="bg-transparent text-white"
            ></button>
          </div>
          <ul className="mt-16 space-y-4 w-full">
            {/* Lista de ítems del menú */}
            <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
              <MdDashboard className="mr-2 text-green-500" />
              <p className="text-white font-bold">Item 1</p>
            </li>
            <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
              <MdSettings className="mr-2 text-green-500" />
              <p className="text-white font-bold">Item 2</p>
            </li>
            <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
              <MdPerson className="mr-2 text-green-500" />
              <p className="text-white font-bold">Item 3</p>
            </li>
            <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
              <MdHelp className="mr-2 text-green-500" />
              <p className="text-white font-bold">Item 4</p>
            </li>
            <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
              <MdExitToApp className="mr-2 text-green-500" />
              <p className="text-white font-bold">Item 5</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Drawer;

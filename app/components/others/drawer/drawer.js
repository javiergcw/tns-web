import React from 'react';
import { IoMenu } from 'react-icons/io5';
import {
  MdDashboard,
  MdSettings,
  MdPerson,
  MdHelp,
  MdExitToApp,
} from 'react-icons/md';
import Text from '@/app/components/others/text/text';

/**
 * Drawer Component
 *
 * Este componente genera un menú lateral desplegable con 5 ítems.
 * Es un componente donde el administrador puede ver las últimas peticiones que hacen los jefes de área.
 *
 * @param {boolean} isOpen - Estado de si el drawer está abierto.
 * @param {function} onToggle - Función para alternar el estado del drawer.
 *
 * @component
 */
const Drawer = ({ isOpen, onToggle }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#004F9F] text-white z-50 ${
        isOpen ? 'w-64' : 'w-16'
      } transition-all duration-300 ease-in-out flex flex-col items-center`}
    >
      <button
        onClick={onToggle}
        className="mt-4 bg-transparent text-white px-2 py-1 rounded-md self-center"
      >
        <IoMenu className="text-green-500 text-2xl" />
      </button>
      <div className={`flex flex-col items-center w-full mt-4 flex-1 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col sm:flex-row items-center w-full px-4">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="w-12 h-12 rounded-full sm:mr-3 border-2 border-green-500 mb-2 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <Text texto="Nombre Apellido1 Apellido2" color="white" type="normal" />
            <Text texto="Jefe de área" color="green" type="normal" />
          </div>
        </div>
        <ul className="mt-6 space-y-4 w-full flex-1">
          <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
            <MdDashboard className="mr-2 text-green-500" />
            <Text texto="Item 1" color="white" type="normal" />
          </li>
          <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
            <MdSettings className="mr-2 text-green-500" />
            <Text texto="Item 2" color="white" type="normal" />
          </li>
          <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
            <MdPerson className="mr-2 text-green-500" />
            <Text texto="Item 3" color="white" type="normal" />
          </li>
          <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
            <MdHelp className="mr-2 text-green-500" />
            <Text texto="Item 4" color="white" type="normal" />
          </li>
          <li className="px-4 py-2 hover:bg-[#004695] cursor-pointer flex items-center">
            <MdExitToApp className="mr-2 text-green-500" />
            <Text texto="Item 5" color="white" type="normal" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;

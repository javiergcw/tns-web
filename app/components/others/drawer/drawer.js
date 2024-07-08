import "/app/globals.css";
import React from "react";
import { IoMenu } from "react-icons/io5";
import {
  MdDashboard,
  MdSettings,
  MdPerson,
  MdHelp,
  MdExitToApp,
} from "react-icons/md";
import Text from "@/app/components/others/text/text";
import { ImagesPath } from "@/app/utils/assetsPath";
import Link from "next/link";

/**
 * Drawer Component
 *
 * Este componente genera un menú lateral desplegable con 5 ítems.
 *
 * @param {boolean} isOpen - Estado de si el drawer está abierto.
 * @param {function} onToggle - Función para alternar el estado del drawer.
 * @param {object} profile - Datos del perfil del usuario logueado.
 *
 * @component
 */
const Drawer = ({ isOpen, onToggle, profile }) => {
  // Listado de ítems con enlaces, nombres e íconos
  const menuItems = [
    { link: "/dashboardManager", name: "Dashboard", icon: <MdDashboard /> },
    { link: "/view-product", name: "View Product", icon: <MdSettings /> },
    { link: "/profile", name: "Profile", icon: <MdPerson /> },
    { link: "/create-product", name: "Create", icon: <MdHelp /> },
    { link: "/logout", name: "Logout", icon: <MdExitToApp /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#004F9F] text-white z-50 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out flex flex-col items-center`}
    >
      <button
        onClick={onToggle}
        className="mt-4 bg-transparent text-white px-2 py-1 rounded-md self-center"
      >
        <IoMenu className="text-green-500 text-2xl" />
      </button>
      <div className="flex flex-col items-center w-full mt-4 flex-1">
        <div className="flex items-center w-full px-4">
          <img
            src={profile?.photo || ImagesPath.drawerPhoto}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-green-500 mb-2"
          />
          {isOpen && (
            <div className="text-left ml-4">
              <Text
                texto={profile?.name || "Nombre Apellido1 Apellido2"}
                color="white"
                type="normal"
                className="font-bold text-[15px] text-white"
                style={{ fontFamily: 'Patua One, sans-serif' }}
              />
              <div className="border-t border-green-500 w-full my-1"></div>
              <Text 
                texto={profile?.rol?.name || "Jefe de área"}
                color="white"
                type="normal"
                className="text-[10px] text-white mt-1"
                style={{ fontFamily: 'Patua One, sans-serif' }}
              />
            </div>
          )}
        </div>
        <ul className="mt-6 space-y-4 w-full flex-1">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-blueHard cursor-pointer flex ${
                isOpen ? "items-center" : "justify-center"
              }`}
            >
              <Link href={item.link} className="flex items-center w-full">
                <span
                  className={`text-green-500 ${
                    isOpen ? "text-2xl" : "text-4xl"
                  } flex items-center justify-center`}
                >
                  {item.icon}
                </span>
                {isOpen && (
                  <Text
                    texto={item.name}
                    color="white"
                    type="normal"
                    className="ml-2"
                    style={{ fontFamily: 'Patua One, sans-serif' }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;

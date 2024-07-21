import "/app/globals.css";
import Modal from "react-modal";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import {
  MdDashboard,
  MdPerson,
  MdExitToApp,
  MdVisibility,
  MdAddBox,
  MdSettings,
} from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import Text from "@/app/components/others/text/text";
import { ImagesPath } from "@/app/utils/assetsPath";
import LoaderOverlay from "@/app/utils/loaderOverlay";
import { useRouter } from "next/router";
import { RedButton, BlueButton } from "@/app/utils/Buttons"; // Importar los botones constantes
import ConfirmationModal from "../../modals/modalConfirmation"; // Importar el modal de confirmación
import react from "@heroicons/react";

const greenDrawer = "#96C11F";

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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (link) => {
    if (router.pathname === link) {
      router.reload();
    } else {
      setLoading(true);
      setTimeout(() => {
        router.push(link);
        setLoading(false);
      }, 300); // Asegurar tiempo suficiente para desmontar componentes
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setLoading(true);
    setIsLogoutModalOpen(false); // Cerrar el modal antes de redirigir
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const handleAlertClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar la solicitud del modal
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Listado de ítems con enlaces, nombres e íconos
  const menuItems = [
    {
      link: "/dashboardManager",
      name: "Dashboard",
      icon: <MdDashboard style={{ color: greenDrawer }} />,
    },
    {
      link: "/view-product",
      name: "View Product",
      icon: <MdVisibility style={{ color: greenDrawer }} />,
    },
    {
      link: "/profile",
      name: "Profile",
      icon: <MdPerson style={{ color: greenDrawer }} />,
    },
    {
      link: "/create-product",
      name: "Create Product",
      icon: <MdAddBox style={{ color: greenDrawer }} />,
    },
    {
      link: "/settings",
      name: "Settings",
      icon: <MdSettings style={{ color: greenDrawer }} />,
    }, // Nueva sección Settings
    {
      link: "#",
      name: "Logout",
      icon: <MdExitToApp style={{ color: greenDrawer }} />,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-[#004F9F] text-white z-50 shadow-lg ${
          isOpen ? "w-64" : "w-24"
        } transition-all duration-300 ease-in-out flex flex-col items-center`}
      >
        <button
          onClick={onToggle}
          className="mt-4 bg-transparent text-white px-2 py-1 rounded-md self-center"
        >
          <IoMenu
            className={`text-greenDrawer ${
              isOpen ? "text-2xl" : "text-4xl"
            } transition-all duration-300`}
          />
        </button>
        <div className="flex flex-col items-center w-full mt-4 flex-1">
          <div className="flex items-center w-full px-4">
            <img
              src={profile?.photo || ImagesPath.drawerPhoto}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-greenDrawer mb-2"
            />
            {isOpen && (
              <div className="text-left ml-4">
                <Text
                  texto={profile?.name || "Nombre Apellido1 Apellido2"}
                  color="white"
                  type="normal"
                  className="font-bold text-[15px] text-white"
                  style={{ fontFamily: "Patua One, sans-serif" }}
                />
                <div className="border-t border-green-500 w-full my-1"></div>
                <Text
                  texto={profile?.rol?.name || "Sin rol"}
                  color="white"
                  type="normal"
                  className="text-[10px] text-white mt-1"
                  style={{ fontFamily: "Patua One, sans-serif" }}
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
                } ${router.pathname === item.link ? "bg-blue-700" : ""}`}
                onClick={
                  item.onClick
                    ? item.onClick
                    : () => handleNavigation(item.link)
                }
              >
                <div
                  className={`flex items-center w-full ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <span
                    className={`text-green-500 ${
                      isOpen ? "text-2xl" : "text-4xl"
                    } flex items-center justify-center transition-all duration-300`}
                  >
                    {item.icon}
                  </span>
                  {isOpen && (
                    <span className="ml-3">
                      <Text
                        texto={item.name}
                        color="white"
                        type="normal"
                        className="ml-3"
                        style={{ fontFamily: "Patua One, sans-serif" }}
                      />
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <button
            onClick={handleAlertClick}
            className="bg-red-500 p-2 rounded-full mb-2"
          >
            <FiAlertTriangle className="text-white text-2xl" />
          </button>
          <Text
            texto="TNS V.1"
            color="white"
            type="normal"
            className="font-bold text-white"
            style={{ fontFamily: "Patua One, sans-serif" }}
          />
        </div>
      </div>
      {loading && <LoaderOverlay />}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Solicitud de Alerta"
        className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">
            Solicitud de Alertas
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-black text-4xl font-bold"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleModalSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-2">
              Input 1
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-2">
              Input 2
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-2">
              Input 3
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <RedButton text="Cancelar" onClick={closeModal} className="mr-2" />
            <BlueButton text="Enviar" onClick={handleModalSubmit} />
          </div>
        </form>
      </Modal>
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onRequestClose={closeLogoutModal}
        onConfirm={confirmLogout}
        title="Confirmar Cierre de Sesión"
        message="¿Estás seguro que deseas cerrar sesión?"
      />
    </>
  );
};

export default Drawer;

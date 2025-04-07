import "/app/globals.css";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import {
  MdDashboard,
  MdPerson,
  MdExitToApp,
  MdVisibility,
  MdAddBox,
  MdShoppingCart,
  MdAssignmentInd,
} from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import Text from "@/app/components/others/text/text";
import { ImagesPath } from "@/app/utils/assetsPath";
import LoaderOverlay from "@/app/utils/loaderOverlay";
import { useRouter } from "next/navigation";
import { RedButton, BlueButton } from "@/app/utils/Buttons";
import ConfirmationModal from "../../modals/modalConfirmation";
import { fetchWithAuth } from "@/app/utils/api";

const greenDrawer = "#96C11F";

const Drawer = ({ isOpen, onToggle, profile }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const router = useRouter();

  // Verificación inicial del token y manejo de inactividad
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login...");
      window.location.href = "https://thenewschool.edu.co/login";
      return;
    }
    setIsAuthenticated(true);

    // Temporizador de inactividad
    let inactivityTimeout;

    const resetTimer = () => {
      console.log("User activity detected, resetting inactivity timer...");
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        console.log("Inactivity timeout reached, logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("profileId");
        window.location.href = "https://thenewschool.edu.co/login";
      },60 * 1000); // 30 minutos en milisegundos
    };

    // Eventos que indican actividad del usuario
    const events = ["mousemove", "keydown", "click", "scroll", "input"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
      console.log(`Added ${event} event listener for inactivity timer`);
    });

    // Iniciar el temporizador al cargar
    resetTimer();

    // Limpiar eventos y temporizador al desmontar el componente
    return () => {
      console.log("Cleaning up inactivity timer and event listeners...");
      clearTimeout(inactivityTimeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  if (!isAuthenticated) {
    return null; // No renderiza nada si no hay token
  }

  const handleNavigation = (link) => {
    if (router.pathname === link) {
      router.reload();
    } else {
      setLoading(true);
      setTimeout(() => {
        router.push(link);
        setLoading(false);
      }, 300);
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setLoading(true);
    setIsLogoutModalOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileId");
    window.location.href = "https://thenewschool.edu.co/login";
  };

  const handleAlertClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("userId");
    if (!user_id) {
      window.location.href = "https://thenewschool.edu.co/login";
      return;
    }

    const bugData = {
      title,
      category_id: categoryId,
      description,
      user_id,
    };

    try {
      const response = await fetchWithAuth(
          "https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/bugs",
          {
            method: "POST",
            body: JSON.stringify(bugData),
          }
      );
      if (!response.ok) {
        throw new Error("Error al crear el bug");
      }
      const newBug = await response.json();
      console.log("Bug creado:", newBug);
      setIsModalOpen(false);
      setTitle("");
      setCategoryId("");
      setDescription("");
    } catch (error) {
      console.error("Error al crear el bug:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const allMenuItems = [
    {
      link: "/dashboardManager",
      name: "Dashboard",
      icon: <MdDashboard style={{ color: greenDrawer }} />,
    },
    {
      link: "/view-product",
      name: "View Shoppings",
      icon: <MdVisibility style={{ color: greenDrawer }} />,
    },
    {
      link: "/profile",
      name: "Profile",
      icon: <MdPerson style={{ color: greenDrawer }} />,
    },
    {
      link: "/shoppings",
      name: "Shoppings",
      icon: <MdShoppingCart style={{ color: greenDrawer }} />,
    },
    {
      link: "/create-product",
      name: "Create Product",
      icon: <MdAddBox style={{ color: greenDrawer }} />,
    },
    {
      link: "/admissions-view",
      name: "Admisiones",
      icon: <MdAssignmentInd style={{ color: greenDrawer }} />,
    },
  ];

  let accessibleMenuItems = [];
  switch (profile?.rol?.name) {
    case "admin":
      accessibleMenuItems = allMenuItems;
      break;
    case "Lider de presupuesto":
      accessibleMenuItems = allMenuItems.filter((item) =>
          ["/dashboardManager", "/profile", "/shoppings"].includes(item.link)
      );
      break;
    case "Secretariado":
      accessibleMenuItems = allMenuItems.filter((item) =>
          ["/admissions-view", "/profile"].includes(item.link)
      );
      break;
    case "Compras":
      accessibleMenuItems = allMenuItems.filter((item) =>
          ["/create-product", "/view-product", "/dashboardManager", "/profile"].includes(item.link)
      );
      break;
    case "Developer":
      accessibleMenuItems = allMenuItems;
      break;
    case "Sin rol":
      accessibleMenuItems = allMenuItems.filter((item) =>
          ["/dashboardManager", "/profile"].includes(item.link)
      );
      break;
    default:
      accessibleMenuItems = allMenuItems.filter((item) => item.link === "/profile");
      break;
  }

  accessibleMenuItems.push({
    link: "#",
    name: "Logout",
    icon: <MdExitToApp style={{ color: greenDrawer }} />,
    onClick: handleLogout,
  });

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
                className={`text-greenDrawer ${isOpen ? "text-2xl" : "text-4xl"} transition-all duration-300`}
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
                        texto={profile?.rol?.name}
                        color="white"
                        type="normal"
                        className="text-[10px] text-white mt-1"
                        style={{ fontFamily: "Patua One, sans-serif" }}
                    />
                  </div>
              )}
            </div>
            <ul className="mt-6 space-y-4 w-full flex-1">
              {accessibleMenuItems.map((item, index) => (
                  <li
                      key={index}
                      className={`px-4 py-2 hover:bg-blueHard cursor-pointer flex ${
                          isOpen ? "items-center" : "justify-center"
                      } ${router.pathname === item.link ? "bg-blue-700" : ""}`}
                      onClick={item.onClick ? item.onClick : () => handleNavigation(item.link)}
                  >
                    <div className={`flex items-center w-full ${isOpen ? "" : "justify-center"}`}>
                  <span
                      className={`text-green-500 ${isOpen ? "text-2xl" : "text-4xl"} flex items-center justify-center transition-all duration-300`}
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
            {profile?.rol?.name !== "Sin rol" && (
                <button onClick={handleAlertClick} className="bg-red-500 p-2 rounded-full mb-2">
                  <FiAlertTriangle className="text-white text-2xl" />
                </button>
            )}
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
            <h2 className="text-2xl font-bold text-black">Solicitud de Alertas</h2>
            <button onClick={closeModal} className="text-black text-4xl font-bold">
              ×
            </button>
          </div>
          <form onSubmit={handleModalSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">Título</label>
              <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">Categoría ID</label>
              <select
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                <option value="1">Categoría 1</option>
                <option value="2">Categoría 2</option>
                <option value="3">Categoría 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">Descripción</label>
              <textarea
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
              />
            </div>
            <div className="flex justify-end">
              <RedButton text="Cancelar" onClick={closeModal} className="mr-2" />
              <BlueButton text="Enviar" type="submit" />
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
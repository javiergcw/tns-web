import React, { useEffect, useState } from "react";
import { getShoppingsByUserId } from "@/app/services/shoppingService";
import { getMessagesByShoppingId, createMessage, deleteMessage } from "@/app/services/messagesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faCommentDots, faEdit, faUpload } from "@fortawesome/free-solid-svg-icons";
import Table from "@/app/components/others/table/table";
import Text from "@/app/components/others/text/text";
import CustomComponent from "../product-detail/purchase_detail";
import MessageCard from "@/app/components/messages/messagesCard";
import { getProfileById } from "@/app/services/profileService";
import * as XLSX from 'xlsx';

const ShoppingTable = ({ userId }) => {
  const [shoppings, setShoppings] = useState([]);
  const [filteredShoppings, setFilteredShoppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemFilter, setItemFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [role, setRole] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShoppingId, setSelectedShoppingId] = useState(null);
  const [selectedBilling, setSelectedBilling] = useState(null); // Estado para la factura
  const [messages, setMessages] = useState([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [newMessageBody, setNewMessageBody] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    const fetchShoppings = async () => {
      try {
        const fetchedShoppings = await getShoppingsByUserId(
          localStorage.getItem("userId")
        );
        setShoppings(fetchedShoppings);
        setFilteredShoppings(fetchedShoppings);

        const statuses = [
          ...new Set(fetchedShoppings.map((shopping) => shopping.status.name)),
        ];
        setStatusOptions(statuses);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppings();
  }, [userId, refreshTable]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("profileId");

        if (storedUserId) {
          const profile = await getProfileById(storedUserId);
          const userRole = profile.rol.name ? profile.rol.name : "";
          setRole(userRole);

          console.log("El rol del usuario logueado es:", userRole);
        } else {
          throw new Error("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    filterShoppings();
  }, [itemFilter, statusFilter]);

  const filterShoppings = () => {
    let filtered = shoppings;

    if (itemFilter) {
      filtered = filtered.filter((shopping) =>
        shopping.products.some((product) =>
          product.name.toLowerCase().includes(itemFilter.toLowerCase())
        )
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (shopping) =>
          shopping.status.name.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredShoppings(filtered);
  };

  const clearFilters = () => {
    setItemFilter("");
    setStatusFilter("");
    setFilteredShoppings(shoppings);
  };

  const handleViewDetailsClick = async (shoppingId) => {
    setSelectedShoppingId(shoppingId);

    try {
      const messagesResponse = await getMessagesByShoppingId(shoppingId);
      setMessages(messagesResponse);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
      setMessages([]);
    }

    const billingData = localStorage.getItem(`billing_${shoppingId}`);
    setIsModalOpen(true);

    if (billingData) {
      setSelectedBilling(billingData); // Guardar la factura seleccionada en el estado si existe
    }
  };

  const handleOpenMessageModal = (shoppingId) => {
    setSelectedShoppingId(shoppingId);
    setIsMessageModalOpen(true);
  };

  const handleAddMessage = async () => {
    if (!newMessageBody.trim()) {
      alert("El cuerpo del mensaje no puede estar vacío.");
      return;
    }

    const messageData = {
      body: newMessageBody,
      shopping_id: selectedShoppingId, // Asegurarse de que selectedShoppingId está correctamente establecido
      user_id: localStorage.getItem("userId"), // Obtener el userId de localStorage
    };

    try {
      const newMessage = await createMessage(messageData);
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Actualizar la lista de mensajes
      alert("Mensaje añadido correctamente.");
      setIsMessageModalOpen(false); // Cerrar el modal de mensajes
      setNewMessageBody(""); // Limpiar el campo del mensaje
    } catch (error) {
      console.error("Error al añadir el mensaje:", error.response?.data || error.message);
      alert("Hubo un error al añadir el mensaje.");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
      alert("Mensaje eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
      alert("Hubo un error al eliminar el mensaje.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShoppingId(null);
    setMessages([]);
    setSelectedBilling(null); // Limpiar factura seleccionada al cerrar el modal
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedShoppingId(null);
    setNewMessageBody("");
  };

  // Funciones para manejar facturación desde el dispositivo
  const checkIfBillingExists = (shoppingId) => {
    return localStorage.getItem(`billing_${shoppingId}`);
  };

  const handleUploadBilling = (event, shoppingId) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 1024 * 1024; // 1 MB
      if (file.size > maxSize) {
        alert("El archivo es demasiado grande. El tamaño máximo permitido es 1 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          localStorage.setItem(`billing_${shoppingId}`, e.target.result); // Guardar archivo como base64
          alert("Factura subida correctamente.");
          setRefreshTable(!refreshTable); // Refrescar la tabla
        } catch (error) {
          console.error("Error al guardar en localStorage:", error);
          alert("Error: No se pudo guardar el archivo debido a limitaciones de almacenamiento.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para ver la factura
  const handleViewBilling = (shoppingId) => {
    const billingData = localStorage.getItem(`billing_${shoppingId}`);
    if (billingData) {
      const newWindow = window.open();
      newWindow.document.write(`<iframe src="${billingData}" width="100%" height="100%" />`);
    } else {
      alert("No hay factura disponible para visualizar.");
    }
  };

  const handleDeleteBilling = (shoppingId) => {
    if (checkIfBillingExists(shoppingId)) {
      localStorage.removeItem(`billing_${shoppingId}`);
      alert("Factura eliminada correctamente.");
      setRefreshTable(!refreshTable); // Refrescar la tabla
    } else {
      alert("No hay factura para eliminar.");
    }
  };
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredShoppings.map((shopping) => ({
        "ITEM": shopping.products.map((product) => product.name).join(", "),
        "DESCRIPCIÓN": shopping.description,
        "LÍDER DE ÁREA": shopping.user.profile.name,
        "ESTADO": shopping.status.name,
        "FECHA PETICIÓN": new Date(shopping.request_date).toLocaleDateString(),
        "FECHA APROBADO": new Date(shopping.date_approval).toLocaleDateString(),
        "FECHA FINALIZACIÓN": new Date(shopping.pending_date).toLocaleDateString(),
        "PRECIO": shopping.products.reduce((total, product) => total + product.price, 0).toLocaleString("es-CO", { style: "currency", currency: "COP" }),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");

    // Configurar anchos de columnas
    worksheet['!cols'] = [
      { wpx: 200 }, { wpx: 300 }, { wpx: 200 },
      { wpx: 150 }, { wpx: 150 }, { wpx: 150 },
      { wpx: 150 }, { wpx: 100 }
    ];

    XLSX.writeFile(workbook, 'compras_usuario.xlsx');
  };
  const columns = [
    "ITEM",
    "DESCRIPCIÓN",
    "LÍDER DE ÁREA",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA APROBADO",
    "FECHA FINALIZACIÓN",
    "PRECIO",
    "FACTURACIÓN",
    "Acciones",
  ];

  const rows = filteredShoppings.map((shopping) => {
    const totalPrice = shopping.products.reduce((total, product) => total + product.price, 0);
    const billingExists = checkIfBillingExists(shopping.id);

    return [
      shopping.products.map((product) => product.name).join(", "),
      shopping.description,
      shopping.user.profile.name,
      shopping.status.name,
      new Date(shopping.request_date).toLocaleDateString(),
      new Date(shopping.date_approval).toLocaleDateString(),
      new Date(shopping.pending_date).toLocaleDateString(),
      totalPrice.toLocaleString("es-CO", { style: "currency", currency: "COP" }),

      // Lógica de visualización y edición de la factura basada en el rol
      billingExists ? (
        <>
          {role !== "Lider de area" && ( // Solo roles que no sean "Líder de área" pueden editar y subir
            <>
              <FontAwesomeIcon
                icon={faEdit}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={() => document.getElementById(`fileInput_${shopping.id}`).click()}
              />
              <input
                type="file"
                id={`fileInput_${shopping.id}`}
                style={{ display: "none" }}
                onChange={(event) => handleUploadBilling(event, shopping.id)}
              />
            </>
          )}
          <button
            className="text-blue-500 hover:text-blue-700 ml-2"
            onClick={() => handleViewBilling(shopping.id)}
          >
            Ver factura
          </button>
        </>
      ) : (
        <>
          {role !== "Lider de area" && ( // Solo roles que no sean "Líder de área" pueden subir facturas
            <>
              <FontAwesomeIcon
                icon={faUpload}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={() => document.getElementById(`fileInput_${shopping.id}`).click()}
              />
              <input
                type="file"
                id={`fileInput_${shopping.id}`}
                style={{ display: "none" }}
                onChange={(event) => handleUploadBilling(event, shopping.id)}
              />
            </>
          )}
          {role === "Lider de area" && ( // Mostrar mensaje si no hay factura y es "Líder de área"
            <p className="text-red-500">
              No hay factura disponible.
            </p>
          )}
        </>
      ),

      <div key={shopping.id} className="flex space-x-2">
        <FontAwesomeIcon
          icon={faEye}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => handleViewDetailsClick(shopping.id)}
        />
        <FontAwesomeIcon
          icon={faCommentDots}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => handleOpenMessageModal(shopping.id)}
        />
        {role === "admin" && ( // Solo "admin" puede eliminar facturas
          <>
            {billingExists && (
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => handleDeleteBilling(shopping.id)}
              />
            )}
          </>
        )}
      </div>,
    ];

  });


  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Text texto="Compras" color="blue-secondary" type="header" />
      <div className="mb-4">
        <h2 className="text-lg text-black font-semibold mb-4">Nombre del item</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Item"
            value={itemFilter}
            onChange={(e) => setItemFilter(e.target.value)}
            className="p-2 border text-black border-gray-300 rounded"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border text-black border-gray-300 rounded"
          >
            <option value="">Todos los Estados</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={clearFilters}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {/* Botón para descargar CSV */}
          <button
            onClick={handleDownloadExcel}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Exportar Tabla
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg mt-4 overflow-x-auto">
        <Table
          columns={columns}
          data={rows}
          className="table-auto min-w-full border-collapse"
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-3/4 max-w-5xl h-auto max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Detalle de la compra</h2>
            <CustomComponent shoppingId={selectedShoppingId} />
            <h3 className="text-lg text-black mt-6 lg:text-xl font-semibold mb-4">Mensajes</h3>
            <button
              className="bg-blue-500 text-white p-2 rounded mb-4"
              onClick={() => handleOpenMessageModal(selectedShoppingId)}
            >
              Añadir Mensaje
            </button>
            <div className="mt-6 text-black flex space-x-4 overflow-x-auto py-2 px-2">
              {messages.slice().reverse().map((message) => (
                <div key={message.id} className="relative flex-shrink-0 w-auto">
                  <MessageCard message={message} />
                  {(role === "admin") && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500 hover:text-red-700 cursor-pointer absolute top-2 right-2"
                      onClick={() => handleDeleteMessage(message.id)}
                    />
                  )}
                </div>
              ))}
            </div>
            <h3 className="text-lg text-black mt-6 lg:text-xl font-semibold mb-4">Factura</h3>
            {selectedBilling && (

              <button
                className="bg-blue-500 text-white p-2 rounded mt-4"
                onClick={() => handleViewBilling(selectedShoppingId)}
              >
                Ver factura
              </button>
            )}
          </div>
        </div>
      )}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={handleCloseMessageModal}
            >
              X
            </button>
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Añadir Mensaje</h2>
            <input
              type="text"
              placeholder="Escribe tu mensaje aquí"
              value={newMessageBody}
              onChange={(e) => setNewMessageBody(e.target.value)}
              className="w-full p-2 border text-black border-gray-300 rounded mb-4"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded w-full"
              onClick={handleAddMessage}
            >
              Guardar Mensaje
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingTable;

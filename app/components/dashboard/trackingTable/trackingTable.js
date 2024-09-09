import React, { useState, useEffect } from "react";
import Table from "@/app/components/others/table/table";
import Text from "@/app/components/others/text/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faUpload, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import CustomComponent from "../../product-detail/purchase_detail";
import MessageCard from "@/app/components/messages/messagesCard"; // Ajusta la ruta según tu proyecto
import { getMessagesByShoppingId, createMessage, deleteMessage } from "@/app/services/messagesService"; // Asegúrate de importar correctamente estos servicios

/**
 * TrackingTable Component
 * Este componente muestra una tabla de seguimiento de peticiones.
 * @param {Array} data - Una lista de objetos que contiene los detalles de las peticiones.
 * @param {string} role - El rol del usuario que define los permisos (admin, jefe de área, etc.)
 * @component
 */
const TrackingTable = ({ data, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // Estado para el modal de mensajes
  const [selectedShoppingId, setSelectedShoppingId] = useState(null);
  const [selectedShopping, setSelectedShopping] = useState(null); // Almacena el shopping seleccionado
  const [messages, setMessages] = useState([]); // Estado para mensajes
  const [newMessageBody, setNewMessageBody] = useState(""); // Estado para el nuevo mensaje
  const [refreshTable, setRefreshTable] = useState(false); // Estado para refrescar la tabla

  const columns = [
    "ID COMPRA",
    "JEFE DE ÁREA",
    "ITEMS",
    "CATEGORÍA",
    "PRECIO",
    "FACTURACIÓN", // Añadimos la columna de Facturación
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA PENDIENTE",
    "FECHA APROBADO",
    "ACCIONES",
  ];

  // Función para manejar el evento de ver detalles
  const handleViewDetailsClick = async (shopping) => {
    setSelectedShopping(shopping);
    setSelectedShoppingId(shopping.id);

    try {
      const messagesResponse = await getMessagesByShoppingId(shopping.id);
      setMessages(messagesResponse);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
      setMessages([]);
    }

    setIsModalOpen(true);
  };

  // Función para subir factura
  const handleUploadInvoice = (shoppingId, file) => {
    console.log("Factura subida para el ID de compra:", shoppingId, file);
    setRefreshTable(!refreshTable); // Refrescar la tabla
  };

  // Función para añadir un mensaje
  const handleAddMessage = async () => {
    const messageData = {
      body: newMessageBody,
      shopping_id: selectedShoppingId,
      user_id: localStorage.getItem("userId"),
    };

    try {
      const newMessage = await createMessage(messageData); // Añadir mensaje a la API
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Añadir mensaje al estado
      alert("Mensaje añadido correctamente.");
      setIsMessageModalOpen(false); // Cerrar modal
      setNewMessageBody(""); // Limpiar campo de mensaje
    } catch (error) {
      console.error("Error al añadir el mensaje:", error);
      alert("Hubo un error al añadir el mensaje.");
    }
  };

  // Función para eliminar un mensaje
  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId); // Eliminar mensaje de la API
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId)); // Eliminar del estado
      alert("Mensaje eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
      alert("Hubo un error al eliminar el mensaje.");
    }
  };

  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true); // Abrir modal para añadir mensaje
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShopping(null);
    setMessages([]); // Limpiar los mensajes al cerrar el modal
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false); // Cerrar modal de añadir mensaje
    setNewMessageBody(""); // Limpiar campo de mensaje
  };

  // Verifica que data es un arreglo antes de mapear
  const rows = Array.isArray(data)
    ? data.map((item) => {
      const totalPrice = item.products.reduce((total, product) => total + product.price, 0); // Calcular el precio total
      const billingExists = localStorage.getItem(`billing_${item.id}`);

      return [
        item.id,
        item.user && item.user.profile ? item.user.profile.name : "N/A", // Jefe de área
        item.products.map((product) => product.name).join(", "), // Lista de productos separados por coma
        item.category ? item.category.name : "N/A",
        totalPrice.toLocaleString("es-CO", { style: "currency", currency: "COP" }), // Precio total en formato COP

        // Facturación
        billingExists ? (
          <>
            {role === "admin" || role === "Compras" && (
              <>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => document.getElementById(`fileInput_${item.id}`).click()}
                />
                <input
                  type="file"
                  id={`fileInput_${item.id}`}
                  style={{ display: "none" }}
                  onChange={(event) => handleUploadInvoice(item.id, event.target.files[0])}
                />
              </>
            )}
            <button
              className="text-blue-500 hover:text-blue-700 ml-2"
              onClick={() => handleViewDetailsClick(item)}
            >
              Ver factura
            </button>
          </>
        ) : (
          role === "admin" || role === "Compras" && (
            <>
              <FontAwesomeIcon
                icon={faUpload}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={() => document.getElementById(`fileInput_${item.id}`).click()}
              />
              <input
                type="file"
                id={`fileInput_${item.id}`}
                style={{ display: "none" }}
                onChange={(event) => handleUploadInvoice(item.id, event.target.files[0])}
              />
            </>
          )
        ),

        item.status ? item.status.name : "N/A",
        item.created_at ? new Date(item.created_at).toLocaleDateString() : "N/A",
        item.pending_date ? new Date(item.pending_date).toLocaleDateString() : "N/A",
        item.date_approval ? new Date(item.date_approval).toLocaleDateString() : "N/A",

        // Acciones
        <div key={item.id} className="flex space-x-2">
          <FontAwesomeIcon
            icon={faEye}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => handleViewDetailsClick(item)}
          />
          {role === "admin" && billingExists && (
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => handleDeleteBilling(item.id)}
            />
          )}
        </div>,
      ];
    })
    : [];

  return (
    <>
      <Text texto="TRACKING PETICIONES" color="blue-secondary" type="header" />
      <div className="bg-white p-4 rounded-lg mt-4 overflow-x-auto">
        <Table
          columns={columns}
          data={rows}
          className="table-auto min-w-full border-collapse"
        />
      </div>

      {/* Modal para ver detalles */}
      {isModalOpen && selectedShopping && (
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
            {(role === "admin") && (
              <button
                className="bg-blue-500 text-white p-2 rounded mb-4"
                onClick={handleOpenMessageModal}
              >
                Añadir Mensaje
              </button>
            )}
            <div className="mt-6 flex text-black space-x-4 overflow-x-auto py-2 px-2">
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
            <div className="flex items-center space-x-2">
              {selectedShopping.facturacion ? (
                <a
                  href={selectedShopping.facturacion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faFilePdf} />
                </a>
              ) : (
                <p className="text-gray-500">No hay factura</p>
              )}
              {(role === "admin" || role === "Compras") && selectedShopping.facturacion && (
                <label className="cursor-pointer">
                  <FontAwesomeIcon icon={faEdit} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                  <input
                    type="file"
                    onChange={(e) => handleUploadInvoice(selectedShopping.id, e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir mensaje */}
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
            <textarea
              value={newMessageBody}
              onChange={(e) => setNewMessageBody(e.target.value)}
              className="w-full p-2 border text-black border-gray-300 rounded mb-4"
              placeholder="Escribe tu mensaje aquí"
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
    </>
  );
};

export default TrackingTable;

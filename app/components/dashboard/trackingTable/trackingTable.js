import React, { useState, useEffect } from "react";
import Table from "@/app/components/others/table/table";
import Text from "@/app/components/others/text/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faUpload, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import CustomComponent from "../../product-detail/purchase_detail";
import MessageCard from "@/app/components/messages/messagesCard";
import { getMessagesByShoppingId, createMessage, deleteMessage } from "@/app/services/messagesService";
import { getAllShoppings, getShoppingsWithInvoice } from "@/app/services/shoppingService";

const TrackingTable = ({ data, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedShoppingId, setSelectedShoppingId] = useState(null);
  const [selectedShopping, setSelectedShopping] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessageBody, setNewMessageBody] = useState("");

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedShoppingForInvoice, setSelectedShoppingForInvoice] = useState(null);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const fetchShoppings = async () => {
    try {
      const response = await getAllShoppings();
      return response;
    } catch (error) {
      console.error("Error al obtener las compras:", error);
      return [];
    }
  };

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

  const handleOpenInvoiceModal = (shoppingId) => {
    setSelectedShoppingForInvoice(shoppingId);
    setInvoiceUrl("");
    setIsInvoiceModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setNewMessageBody("");
  };

  const handleAddMessage = async () => {
    const messageData = {
      body: newMessageBody,
      shopping_id: selectedShoppingId,
      user_id: localStorage.getItem("userId"),
    };

    try {
      const newMessage = await createMessage(messageData);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      alert("Mensaje añadido correctamente.");
      setIsMessageModalOpen(false);
      setNewMessageBody("");
    } catch (error) {
      console.error("Error al añadir el mensaje:", error);
      alert("Hubo un error al añadir el mensaje.");
    }
  };

  const handleSaveInvoiceUrl = async () => {
    if (!invoiceUrl) {
      alert("Por favor, ingresa una URL de factura válida.");
      return;
    }

    try {
      const response = await fetch(
        `https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1/shoppings/${selectedShoppingForInvoice}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        alert("Error al obtener los datos de la compra.");
        return;
      }

      const shopping = await response.json();

      const updatedShopping = {
        shopping: {
          ...shopping,
          facturacion: invoiceUrl,
        },
        products: shopping.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        })),
        replace_products: "false",
      };

      const updateResponse = await fetch(
        `https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1/shoppings/${selectedShoppingForInvoice}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedShopping),
        }
      );

      if (updateResponse.ok) {
        alert("Factura actualizada correctamente.");
        setIsInvoiceModalOpen(false);
        setSelectedShoppingForInvoice(null);
        const updatedShoppings = await fetchShoppings();
      } else {
        alert("Hubo un error al actualizar la factura.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Hubo un error al actualizar la factura.");
    }
  };

  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShopping(null);
    setMessages([]);
  };

  const columns = [
    "ID COMPRA",
    "LIDER DE PRESUPUESTO",
    "TIPO DE CUENTA",
    "ITEMS",
    // "CATEGORÍA",
    // "PRECIO",
    "SUBTOTAL",
    "TOTAL",
    "FACTURACIÓN",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA PENDIENTE",
    "FECHA APROBADO",
    "ACCIONES",
  ];

  function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  }

  const rows = Array.isArray(data)
    ? data
      .slice() // Crear una copia del array original
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Ordenar por fecha más reciente
      .map((item) => {
        const subtotal = item.subtotal;
        const total = item.total;
        const billingExists = item.facturacion;

        return [
          item.id,
          item.user && item.user.profile ? item.user.profile.name : "N/A",
          item.account_type.name,
          item.products.map((product) => product.name).join(", "),
          subtotal != null ? formatCurrency(subtotal) : "N/A",
          total != null ? formatCurrency(total) : "N/A",
          <div className="flex items-center space-x-2">
            {billingExists ? (
              <>
                <a
                  href={billingExists}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
                </a>
                {(role === "admin" || role === "Compras" || role === "Developer") && (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleOpenInvoiceModal(item.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
              </>
            ) : (
              (role === "admin" || role === "Compras" || role === "Developer") && (
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleOpenInvoiceModal(item.id)}
                >
                  <FontAwesomeIcon icon={faUpload} />
                </button>
              )
            )}
          </div>,
          item.status ? item.status.name : "N/A",
          item.created_at ? new Date(item.created_at).toLocaleDateString() : "N/A",
          item.pending_date ? new Date(item.pending_date).toLocaleDateString() : "N/A",
          item.date_approval ? new Date(item.date_approval).toLocaleDateString() : "N/A",
          <div key={item.id} className="flex space-x-2">
            <FontAwesomeIcon
              icon={faEye}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => handleViewDetailsClick(item)}
            />
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
            {(role === "admin" || "Lider de presupuesto" || role === "Developer") && (
              <button
                className="bg-blue-500 text-white p-2 rounded mb-4"
                onClick={() => handleOpenMessageModal(selectedShoppingId)}
              >
                Añadir Mensaje
              </button>
            )}
            <div className="mt-6 flex text-black space-x-4 overflow-x-auto py-2 px-2">
              {messages.slice().reverse().map((message) => (
                <div key={message.id} className="relative flex-shrink-0 w-auto">
                  <MessageCard message={message} />
                  {(role === "admin" || role === "Developer") && (
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
              {(role === "admin" || role === "Compras" || role === "Developer") && selectedShopping.facturacion && (
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleOpenInvoiceModal(selectedShopping.id)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir mensaje */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
            <button className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl" onClick={handleCloseMessageModal}>
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
            <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleAddMessage}>
              Guardar Mensaje
            </button>
          </div>
        </div>
      )}

      {/* Modal para subir/editar factura */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={() => setIsInvoiceModalOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Añadir/Editar Factura</h2>
            <input
              type="text"
              placeholder="URL de la factura"
              value={invoiceUrl}
              onChange={(e) => setInvoiceUrl(e.target.value)}
              className="w-full p-2 border text-black border-gray-300 rounded mb-4"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded w-full"
              onClick={handleSaveInvoiceUrl}
            >
              Guardar Factura
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TrackingTable;

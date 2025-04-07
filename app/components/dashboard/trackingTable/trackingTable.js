import React, { useState, useEffect } from "react";
import Table from "@/app/components/others/table/table";
import Text from "@/app/components/others/text/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faUpload, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import CustomComponent from "../../product-detail/purchase_detail";
import MessageCard from "@/app/components/messages/messagesCard";
import { getMessagesByShoppingId, createMessage, deleteMessage } from "@/app/services/messagesService";
import { getAllShoppings } from "@/app/services/shoppingService";

const TrackingTable = ({ data: initialData, role }) => {
  const [shoppings, setShoppings] = useState(initialData || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedShoppingId, setSelectedShoppingId] = useState(null);
  const [selectedShopping, setSelectedShopping] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessageBody, setNewMessageBody] = useState("");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchShoppings = async () => {
      try {
        const response = await getAllShoppings();
        setShoppings(response);
      } catch (error) {
        console.error("Error al obtener las compras:", error);
      }
    };
    fetchShoppings();
  }, []);

  const handleViewPdf = (url) => {
    setPdfUrl(url);
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
    setPdfUrl("");
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
    "SUBTOTAL",
    "TOTAL",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA PENDIENTE",
    "FECHA APROBADO",
    "ACCIONES",
  ];

  function formatCurrency(value) {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value);
  }

  const rows = Array.isArray(shoppings)
      ? shoppings
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((item) => {
            const subtotal = item.subtotal;
            const total = item.total;

            return [
              item.id,
              item.user && item.user.profile ? item.user.profile.name : "N/A",
              item.account_type.name,
              item.title,
              subtotal != null ? formatCurrency(subtotal) : "N/A",
              total != null ? formatCurrency(total) : "N/A",
              item.status ? item.status.name : "N/A",
              item.created_at
                  ? new Date(item.created_at).toLocaleString("es-CO", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                  : "N/A",
              item.pending_date
                  ? new Date(item.pending_date).toLocaleString("es-CO", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                  : "N/A",
              item.date_approval
                  ? new Date(item.date_approval).toLocaleString("es-CO", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                  : "N/A",
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
                {(role === "admin" || role === "Lider de presupuesto" || role === "Developer") && (
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
                </div>
              </div>
            </div>
        )}

        {isPdfModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-lg font-bold"
                    onClick={closePdfModal}
                >
                  X
                </button>
                <iframe
                    src={pdfUrl}
                    className="w-full h-[600px] border-0"
                    title="Factura PDF"
                ></iframe>
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
                <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleAddMessage}>
                  Guardar Mensaje
                </button>
              </div>
            </div>
        )}
      </>
  );
};

export default TrackingTable;
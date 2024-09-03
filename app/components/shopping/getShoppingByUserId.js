import React, { useEffect, useState } from "react";
import { getShoppingsByUserId } from "@/app/services/shoppingService";
import {
  getMessagesByShoppingId,
  createMessage,
  deleteMessage,
} from "@/app/services/messagesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import Table from "@/app/components/others/table/table";
import Text from "@/app/components/others/text/text";
import CustomComponent from "../product-detail/purchase_detail";
import MessageCard from "@/app/components/messages/messagesCard";

const ShoppingTable = ({ userId }) => {
  const [shoppings, setShoppings] = useState([]);
  const [filteredShoppings, setFilteredShoppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemFilter, setItemFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShoppingId, setSelectedShoppingId] = useState(null);
  const [newStatusId, setNewStatusId] = useState("");

  const [messages, setMessages] = useState([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [newMessageBody, setNewMessageBody] = useState("");

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
  }, [userId]);

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

  const handleEditClick = (shoppingId) => {
    setEditingId(shoppingId);
    setIsEditing(true);
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

    setIsModalOpen(true);
  };

  const handleDeleteClick = async (shoppingId) => {
    // Lógica para eliminar el shopping
    // Ejemplo: await deleteShopping(shoppingId);
    setFilteredShoppings((prev) =>
      prev.filter((shopping) => shopping.id !== shoppingId)
    );
  };

  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true);
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

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
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
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setNewMessageBody("");
  };

  const columns = [
    "ITEM",
    "DESCRIPCIÓN",
    "LÍDER DE ÁREA",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA APROBADO",
    "FECHA FINALIZACIÓN",
    "Acciones",
  ];

  const rows = filteredShoppings.map((shopping) => [
    shopping.products.map((product) => product.name).join(", "),
    shopping.description,
    shopping.user.profile.name,
    shopping.status.name,
    new Date(shopping.request_date).toLocaleDateString(),
    new Date(shopping.date_approval).toLocaleDateString(),
    new Date(shopping.pending_date).toLocaleDateString(),
    <div key={shopping.id} className="flex space-x-2">
      <FontAwesomeIcon
        icon={faEye}
        className="text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => handleViewDetailsClick(shopping.id)}
      />
    </div>,
  ]);

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
        <h2 className="text-lg text-black font-semibold mb-2">
          Nombre del item
        </h2>
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
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">
              Detalle de la compra
            </h2>
            <CustomComponent shoppingId={selectedShoppingId} />
            <h3 className="text-lg text-black mt-6 lg:text-xl font-semibold mb-4">
              Mensajes
            </h3>
            <button
              className="bg-blue-500 text-white p-2 rounded mb-4"
              onClick={handleOpenMessageModal}
            >
              Añadir Mensaje
            </button>
            <div className="mt-6 text-black flex space-x-4 overflow-x-auto py-2 px-2">
              {messages.map((message) => (
                <div key={message.id} className="relative flex-shrink-0 w-auto">
                  <MessageCard message={message} />
                  {/* <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-700 cursor-pointer absolute top-2 right-2"
                    onClick={() => handleDeleteMessage(message.id)}
                  /> */}
                </div>
              ))}
            </div>
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
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">
              Añadir Mensaje
            </h2>
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

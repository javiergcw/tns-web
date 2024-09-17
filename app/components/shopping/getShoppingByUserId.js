import React, { useEffect, useState } from "react";
import { getShoppingsByUserId } from "@/app/services/shoppingService";
import { getMessagesByShoppingId, createMessage, deleteMessage } from "@/app/services/messagesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faCommentDots, faFileUpload, faFilePdf, faEdit } from "@fortawesome/free-solid-svg-icons";
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
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [newMessageBody, setNewMessageBody] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedShoppingForInvoice, setSelectedShoppingForInvoice] = useState(null);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const fetchShoppings = async () => {
    try {
      const fetchedShoppings = await getShoppingsByUserId(localStorage.getItem("userId"));
      setShoppings(fetchedShoppings);
      setFilteredShoppings(fetchedShoppings);

      const statuses = [...new Set(fetchedShoppings.map((shopping) => shopping.status.name))];
      setStatusOptions(statuses);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShoppings();
  }, [userId, refreshTable]);

  useEffect(() => {
    setFilteredShoppings(shoppings);
  }, [shoppings]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("profileId");

        if (storedUserId) {
          const profile = await getProfileById(storedUserId);
          const userRole = profile.rol.name ? profile.rol.name : "";
          setRole(userRole);
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
        (shopping) => shopping.status.name.toLowerCase() === statusFilter.toLowerCase()
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
      setSelectedBilling(billingData);
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
    setSelectedBilling(null);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedShoppingId(null);
    setNewMessageBody("");
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
        "SUBTOTAL": shopping.subtotal ? shopping.subtotal.toLocaleString("es-CO", { style: "currency", currency: "COP" }) : "N/A",
        "TOTAL": shopping.total ? shopping.total.toLocaleString("es-CO", { style: "currency", currency: "COP" }) : "N/A",
        "PRECIO": shopping.products.reduce((total, product) => total + product.price, 0).toLocaleString("es-CO", { style: "currency", currency: "COP" }),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");

    worksheet['!cols'] = [
      { wpx: 200 }, { wpx: 300 }, { wpx: 200 },
      { wpx: 150 }, { wpx: 150 }, { wpx: 150 },
      { wpx: 150 }, { wpx: 100 }
    ];

    XLSX.writeFile(workbook, 'compras_usuario.xlsx');
  };

  const handleOpenInvoiceModal = (shoppingId) => {
    setSelectedShoppingForInvoice(shoppingId);
    setInvoiceUrl("");
    setIsInvoiceModalOpen(true);
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
        await fetchShoppings();
      } else {
        alert("Hubo un error al actualizar la factura.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Hubo un error al actualizar la factura.");
    }
  };

  const columns = [
    "ITEM",
    "DESCRIPCIÓN",
    "LÍDER DE ÁREA",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA APROBADO",
    "FECHA FINALIZACIÓN",
    "SUBTOTAL",
    "TOTAL",
    "PRECIO",
    "FACTURACIÓN",
    "Acciones",
  ];

  const rows = (filteredShoppings && Array.isArray(filteredShoppings) && filteredShoppings.length > 0)
  ? filteredShoppings.map((shopping) => {
      const totalPrice = shopping.products.reduce((total, product) => total + product.price, 0);
      return [
        shopping.products.map((product) => product.name).join(", "),
        shopping.description,
        shopping.user.profile.name,
        shopping.status.name,
        new Date(shopping.request_date).toLocaleDateString(),
        new Date(shopping.date_approval).toLocaleDateString(),
        new Date(shopping.pending_date).toLocaleDateString(),
        shopping.subtotal ? shopping.subtotal.toLocaleString("es-CO", { style: "currency", currency: "COP" }) : "N/A",
        shopping.total ? shopping.total.toLocaleString("es-CO", { style: "currency", currency: "COP" }) : "N/A",
        totalPrice.toLocaleString("es-CO", { style: "currency", currency: "COP" }),

        // Verificación para mostrar "No hay factura" si el rol es "Líder de presupuesto" y no hay facturas
        (role === 'Líder de presupuesto' && !shopping.facturacion) ? (
          <span className="text-red-500">No hay factura</span>
        ) : (role === 'admin' || role === 'Compras' || role === "Developer") ? (
          <div className="flex items-center space-x-2">
            {shopping.facturacion && (
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => window.open(shopping.facturacion, '_blank')}
              >
                <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
              </button>
            )}
            {shopping.facturacion && (
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleOpenInvoiceModal(shopping.id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}
            {!shopping.facturacion && (
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleOpenInvoiceModal(shopping.id)}
              >
                <FontAwesomeIcon icon={faFileUpload} className="text-blue-500" />
              </button>
            )}
          </div>
        ) : shopping.facturacion ? (
          <button
            className="text-blue-500 hover:text-blue-700 ml-2"
            onClick={() => window.open(shopping.facturacion, '_blank')}
          >
            <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
          </button>
        ) : (
          <span className="text-red-500">No hay factura</span>
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
        </div>,
      ];
    })
    : [];


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
          <div className="flex gap-2">
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white p-2 rounded"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              onClick={handleDownloadExcel}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Exportar Tabla
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg mt-4 overflow-x-auto">
        <Table
          columns={columns}
          data={rows}
          className="table-auto min-w-full border-collapse whitespace-nowrap"
          columnClassNames={{
            "ITEM": "w-32 md:w-40 lg:w-48",
            "DESCRIPCIÓN": "w-40 md:w-56 lg:w-64",
            "LÍDER DE ÁREA": "w-32 md:w-40",
            "ESTADO": "w-24 md:w-32",
            "FECHA PETICIÓN": "w-24 md:w-32",
            "FECHA APROBADO": "w-24 md:w-32",
            "FECHA FINALIZACIÓN": "w-24 md:w-32",
            "SUBTOTAL": "w-28 md:w-32",
            "TOTAL": "w-28 md:w-32",
            "PRECIO": "w-28 md:w-32",
            "FACTURACIÓN": "w-24 md:w-32",
            "Acciones": "w-28",
          }}
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
          </div>
        </div>
      )}
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
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={() => setIsInvoiceModalOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Añadir URL de Factura</h2>
            <input
              type="text"
              placeholder="URL de factura"
              value={invoiceUrl}
              onChange={(e) => setInvoiceUrl(e.target.value)}
              className="w-full p-2 border text-black border-gray-300 rounded mb-4"
            />
            <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleSaveInvoiceUrl}>
              Guardar URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingTable;

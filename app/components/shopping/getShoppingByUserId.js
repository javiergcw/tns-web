import React, { useEffect, useState, useRef } from "react";
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
import { IoClose } from "react-icons/io5";

const ShoppingTable = ({ userId }) => {
  const [shoppings, setShoppings] = useState([]);
  const [filteredShoppings, setFilteredShoppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemFilter, setItemFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [role, setRole] = useState("");
  const statusFilterRef = useRef(null);

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

  // Nuevos estados para el manejo de archivos
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileToView, setSelectedFileToView] = useState(null);
  const [isFileViewModalOpen, setIsFileViewModalOpen] = useState(false);
  const [selectedShoppingIdForFiles, setSelectedShoppingIdForFiles] = useState(null);

  const fetchShoppings = async () => {
    try {
      const fetchedShoppings = await getShoppingsByUserId(localStorage.getItem("userId"));
      const sortedShoppings = fetchedShoppings.sort(
          (a, b) => new Date(b.request_date) - new Date(a.request_date)
      );
      setShoppings(sortedShoppings);
      setFilteredShoppings(sortedShoppings);

      const uniqueStatuses = [
        ...new Map(
            sortedShoppings.map((shopping) => [
              shopping.status.id,
              { id: shopping.status.id, name: shopping.status.name },
            ])
        ).values(),
      ];

      const requiredStatuses = [
        { id: 1, name: "En proceso" },
        { id: 3, name: "Rechazadas" },
        { id: 35, name: "Aprobadas" },
      ];

      const combinedStatuses = [
        ...new Map(
            [...uniqueStatuses, ...requiredStatuses].map((status) => [status.id, status])
        ).values(),
      ];

      setStatusOptions(combinedStatuses);
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
    const fetchProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("profileId");
        if (storedUserId) {
          const profile = await getProfileById(storedUserId);
          const userRole = profile.rol.name ? profile.rol.name : "";
          setRole(userRole);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    filterShoppings();
  }, [itemFilter, statusFilter, shoppings]);

  const filterShoppings = () => {
    let filtered = shoppings;
    if (itemFilter) {
      filtered = filtered.filter((shopping) =>
          shopping.title.toLowerCase().includes(itemFilter.toLowerCase())
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
      console.error("Error al añadir el mensaje:", error);
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
    setNewMessageBody("");
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
        filteredShoppings.map((shopping) => ({
          "ID": shopping.id,
          "TITULO": shopping.title,
          "DESCRIPCIÓN": shopping.description,
          "LÍDER DE ÁREA": shopping.user.profile.name,
          "TIPO DE CUENTA": shopping.account_type.name,
          "ESTADO": shopping.status.name,
          "FECHA PETICIÓN": new Date(shopping.request_date).toLocaleString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }),
          "FECHA APROBADO": shopping.date_approval
              ? new Date(shopping.date_approval).toLocaleString("es-CO", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
              : "N/A",
          "SUBTOTAL": shopping.subtotal != null ? formatCurrency(shopping.subtotal) : "N/A",
          "TOTAL": shopping.total != null ? formatCurrency(shopping.total) : "N/A",
          "FACTURA": shopping.facturacion ? shopping.facturacion : "No disponible",
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");
    worksheet['!cols'] = [
      { wpx: 50 }, { wpx: 200 }, { wpx: 300 }, { wpx: 200 }, { wpx: 150 },
      { wpx: 150 }, { wpx: 150 }, { wpx: 150 }, { wpx: 100 }, { wpx: 100 }, { wpx: 200 }
    ];
    XLSX.writeFile(workbook, "compras_usuario.xlsx");
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
          `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${selectedShoppingForInvoice}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
      );
      if (!response.ok) {
        alert("Error al obtener los datos de la compra.");
        return;
      }
      const shopping = await response.json();
      const updatedShopping = {
        shopping: { ...shopping, facturacion: invoiceUrl },
        products: shopping.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        })),
        replace_products: "false",
      };
      const updateResponse = await fetch(
          `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${selectedShoppingForInvoice}`,
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

  // Nuevas funciones para manejo de archivos
  const handleOpenFilesModal = (files, shoppingId) => {
    setSelectedFiles(files || []);
    setSelectedShoppingIdForFiles(shoppingId);
    setIsFilesModalOpen(true);
  };

  const closeFilesModal = () => {
    setIsFilesModalOpen(false);
    setSelectedFiles([]);
  };

  const handleViewFile = (file) => {
    setSelectedFileToView(file);
    setIsFileViewModalOpen(true);
  };

  const closeFileViewModal = () => {
    setIsFileViewModalOpen(false);
    setSelectedFileToView(null);
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) {
      return (
          <svg className="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z"/>
          </svg>
      );
    } else if (fileType.includes("image")) {
      return (
          <svg className="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 10l-4-4-4 4h8z"/>
          </svg>
      );
    } else if (fileType.includes("spreadsheetml") || fileType.includes("excel")) {
      return (
          <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM9 12l2 2-2 2h3v2H7v-2l2-2-2-2v-2h5v2H9z"/>
          </svg>
      );
    } else if (fileType.includes("wordprocessingml") || fileType.includes("msword")) {
      return (
          <svg className="w-6 h-6 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM7 12h2l2 3 2-6h2v10h-2v-6l-2 3-2-3v6H7v-10z"/>
          </svg>
      );
    } else {
      return (
          <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z"/>
          </svg>
      );
    }
  };

  const handleUploadInvoice = async (event, shoppingId) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file[]", file);
      });

      const response = await fetch(
          `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}/upload_archives`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al subir los archivos: ${errorData.error || response.statusText}`);
      }

      const updatedShopping = await response.json();
      alert("Archivos subidos exitosamente");

      const updatedShoppings = shoppings.map((item) =>
          item.id === shoppingId ? { ...item, shopping_files: updatedShopping.files } : item
      );
      setShoppings(updatedShoppings);
      setFilteredShoppings(updatedShoppings);

      if (isFilesModalOpen && selectedShoppingIdForFiles === shoppingId) {
        setSelectedFiles(updatedShopping.files);
      }
    } catch (error) {
      console.error("Error al subir los archivos:", error);
      alert(`Error al subir los archivos: ${error.message}`);
    }
  };

  const handleDeleteFile = async (shoppingId, fileId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este archivo?")) return;

    try {
      const response = await fetch(
          `https://flow-api-9a1502cb3d68.herokuapp.com/api/v1/shoppings/${shoppingId}/files/${fileId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al eliminar archivo: ${errorData.error || response.statusText}`);
      }

      alert("Archivo eliminado con éxito");

      const updatedShoppings = shoppings.map((item) =>
          item.id === shoppingId
              ? { ...item, shopping_files: item.shopping_files.filter((file) => file.id !== fileId) }
              : item
      );
      setShoppings(updatedShoppings);
      setFilteredShoppings(updatedShoppings);

      setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const columns = [
    "ID",
    "TITULO",
    "DESCRIPCIÓN",
    "LÍDER DE ÁREA",
    "TIPO DE CUENTA",
    "ESTADO",
    "FECHA PETICIÓN",
    "FECHA APROBADO",
    "SUBTOTAL",
    "TOTAL",
    "FACTURA",
    "Acciones",
  ];

  function formatCurrency(value) {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value);
  }

  const rows =
      filteredShoppings && Array.isArray(filteredShoppings) && filteredShoppings.length > 0
          ? filteredShoppings.map((shopping) => {
            const subtotal = shopping.subtotal != null ? shopping.subtotal : "N/A";
            const total = shopping.total != null ? shopping.total : "N/A";
            return [
              shopping.id,
              shopping.title,
              shopping.description,
              shopping.user.profile.name,
              shopping.account_type.name,
              shopping.status.name,
              new Date(shopping.request_date).toLocaleString("es-CO", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              }),
              shopping.date_approval
                  ? new Date(shopping.date_approval).toLocaleString("es-CO", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                  : "N/A",
              subtotal !== "N/A" ? formatCurrency(subtotal) : "N/A",
              total !== "N/A" ? formatCurrency(total) : "N/A",
              <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleOpenFilesModal(shopping.shopping_files, shopping.id)}
                    className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                      className="w-6 h-6 text-gray-500 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 3v4a1 1 0 0 1-1 1H5m8-2h3m-3 3h3m-4 3v6m4-3H8M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 12v6h8v-6H8Z"
                    />
                  </svg>
                </button>
                {(role === "admin" || role === "Compras" || role === "Developer") && (
                    (!shopping.shopping_files || shopping.shopping_files.length === 0) && (
                        <label className="cursor-pointer">
                          <FontAwesomeIcon
                              icon={faFileUpload}
                              className="text-green-500 hover:text-green-700"
                          />
                          <input
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) => handleUploadInvoice(e, shopping.id)}
                          />
                        </label>
                    )
                )}
              </div>,
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div className="container mx-auto p-4">
        <Text texto="Compras" color="blue-secondary" type="header" />
        <div className="mb-4">
          <h2 className="text-lg text-black font-semibold mb-4">Nombre del título</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                placeholder="Título"
                value={itemFilter}
                onChange={(e) => setItemFilter(e.target.value)}
                className="p-2 border text-black border-gray-300 rounded"
            />
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                ref={statusFilterRef}
                className="p-2 border text-black border-gray-300 rounded"
            >
              <option value="">Todos los Estados</option>
              {statusOptions
                  .filter((status) => [1, 3, 35].includes(status.id))
                  .sort((a, b) => {
                    const order = { "en proceso": 0, "aprobadas": 1, "rechazadas": 2 };
                    return order[a.name.toLowerCase()] - order[b.name.toLowerCase()];
                  })
                  .map((status) => (
                      <option key={status.id} value={status.name}>
                        {status.name}
                      </option>
                  ))}
            </select>
            <div className="flex gap-2">
              <button onClick={clearFilters} className="bg-red-500 text-white p-2 rounded">
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={handleDownloadExcel} className="bg-blue-500 text-white p-2 rounded">
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
                "ID": "w-20",
                "TITULO": "w-32 md:w-40 lg:w-48",
                "DESCRIPCIÓN": "w-40 md:w-56 lg:w-64",
                "LÍDER DE ÁREA": "w-32 md:w-40",
                "TIPO DE CUENTA": "w-32 md:w-40",
                "ESTADO": "w-24 md:w-32",
                "FECHA PETICIÓN": "w-32 md:w-40",
                "FECHA APROBADO": "w-32 md:w-40",
                "SUBTOTAL": "w-28 md:w-32",
                "TOTAL": "w-28 md:w-32",
                "FACTURA": "w-24 md:w-32",
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
                <button
                    className="bg-blue-500 text-white p-2 rounded w-full"
                    onClick={handleSaveInvoiceUrl}
                >
                  Guardar URL
                </button>
              </div>
            </div>
        )}

        {/* Modal para mostrar todos los archivos */}
        {isFilesModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
              <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/2 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
                    onClick={closeFilesModal}
                >
                  X
                </button>
                <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Archivos Subidos</h2>
                {selectedFiles.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedFiles.map((file, index) => (
                          <li
                              key={file.id}
                              className="flex items-center justify-between p-2 border border-gray-300 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              {getFileIcon(file.file_type)}
                              <span
                                  className="text-blue-500 hover:underline cursor-pointer"
                                  onClick={() => handleViewFile(file)}
                              >
                        {`Archivo ${index + 1}`}
                      </span>
                            </div>
                            {(role === "admin" || role === "Compras" || role === "Developer") && (
                                <button
                                    onClick={() => handleDeleteFile(selectedShoppingIdForFiles, file.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                  <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                  >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                            )}
                          </li>
                      ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No hay archivos subidos.</p>
                )}
                {(role === "admin" || role === "Compras" || role === "Developer") && (
                    <div className="mt-4 flex justify-center">
                      <label className="cursor-pointer bg-blue-500 text-white p-2 rounded">
                        Agregar otro archivo
                        <input
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => handleUploadInvoice(e, selectedShoppingIdForFiles)}
                        />
                      </label>
                    </div>
                )}
              </div>
            </div>
        )}

        {/* Modal para visualizar un archivo */}
        {isFileViewModalOpen && selectedFileToView && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl relative">
                <button
                    className="absolute top-1 right-1 text-black hover:text-gray-900 text-xl font-bold"
                    onClick={closeFileViewModal}
                >
                  <IoClose />
                </button>
                {selectedFileToView.file_type.includes("pdf") || selectedFileToView.file_url.toLowerCase().endsWith(".pdf") ? (
                    <iframe
                        src={selectedFileToView.file_url}
                        className="w-full h-[600px] border-0"
                        title="Archivo PDF"
                    ></iframe>
                ) : (
                    selectedFileToView.file_type.includes("image") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".jpg") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".jpeg") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".png")
                ) ? (
                    <img
                        src={selectedFileToView.file_url}
                        alt="Archivo de imagen"
                        className="w-full h-auto max-h-[600px] object-contain"
                    />
                ) : (
                    selectedFileToView.file_type.includes("wordprocessingml") ||
                    selectedFileToView.file_type.includes("msword") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".docx") ||
                    selectedFileToView.file_type.includes("spreadsheetml") ||
                    selectedFileToView.file_type.includes("excel") ||
                    selectedFileToView.file_url.toLowerCase().endsWith(".xlsx")
                ) ? (
                    <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedFileToView.file_url)}&embedded=true`}
                        className="w-full h-[600px] border-0"
                        title="Archivo Office"
                    ></iframe>
                ) : (
                    <div className="text-center">
                      <p className="mb-4">Este tipo de archivo no se puede visualizar directamente.</p>
                      <a
                          href={selectedFileToView.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 text-white p-2 rounded"
                      >
                        Descargar o Abrir Archivo
                      </a>
                    </div>
                )}
              </div>
            </div>
        )}
      </div>
  );
};

export default ShoppingTable;
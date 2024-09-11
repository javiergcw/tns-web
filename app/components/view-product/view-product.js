"use client";
import React, { useState, useEffect, useRef } from "react";
import { getAllShoppings } from "@/app/services/shoppingService";
import { getStatuses } from "@/app/services/statusService";
import { getProfileById } from "@/app/services/profileService";
import { getMessagesByShoppingId, createMessage, deleteMessage } from "@/app/services/messagesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye, faFilePdf, faCommentDots, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import CustomComponent from "../product-detail/purchase_detail";
import MessageCard from "@/app/components/messages/messagesCard";
import * as XLSX from 'xlsx';

const fetchData = async () => {
  try {
    const res = await getAllShoppings();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const FiltersComponent = () => {
  const [itemName, setItemName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [areaManager, setAreaManager] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [leaderOptions, setLeaderOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [role, setRole] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newStatusId, setNewStatusId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShoppingId, setSelectedShoppingId] = useState(null);

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedShoppingForInvoice, setSelectedShoppingForInvoice] = useState(null);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const [messages, setMessages] = useState([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [newMessageBody, setNewMessageBody] = useState("");

  const itemNameRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const areaManagerRef = useRef(null);
  const statusFilterRef = useRef(null);

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
    const fetchAndProcessData = async () => {
      try {
        const fetchedData = await fetchData();
        const statuses = await getStatuses();
        setStatusOptions(statuses);

        const updatedData = fetchedData.map((shopping) => {
          const invoice = localStorage.getItem(`invoice_${shopping.id}`);
          return { ...shopping, invoice_url: invoice || shopping.facturacion };
        });

        setData(updatedData);
        setFilteredData(updatedData);
        setIsLoading(false);

        const leaders = [
          ...new Set(fetchedData.map((shopping) => shopping.user.profile.name)),
        ];
        setLeaderOptions(leaders);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = data;

      if (itemName) {
        filtered = filtered.filter((shopping) =>
          shopping.products.some((product) =>
            product.name.toLowerCase().includes(itemName.toLowerCase())
          )
        );
      }

      if (startDate) {
        filtered = filtered.filter(
          (shopping) => new Date(shopping.created_at) >= new Date(startDate)
        );
      }

      if (endDate) {
        filtered = filtered.filter(
          (shopping) => new Date(shopping.created_at) <= new Date(endDate)
        );
      }

      if (areaManager) {
        filtered = filtered.filter(
          (shopping) =>
            shopping.user &&
            shopping.user.profile &&
            shopping.user.profile.name.toLowerCase() ===
            areaManager.toLowerCase()
        );
      }

      if (statusFilter) {
        filtered = filtered.filter(
          (shopping) =>
            shopping.status.name &&
            shopping.status.name.toLowerCase() === statusFilter.toLowerCase()
        );
      }

      setFilteredData(filtered);
    };

    filterData();
  }, [itemName, startDate, endDate, areaManager, statusFilter, data]);

  const handleFilterReset = () => {
    setItemName("");
    setStartDate("");
    setEndDate("");
    setAreaManager("");
    setStatusFilter("");
    setFilteredData(data);
    if (itemNameRef.current) itemNameRef.current.blur();
    if (startDateRef.current) startDateRef.current.blur();
    if (endDateRef.current) itemNameRef.current.blur();
    if (areaManagerRef.current) itemNameRef.current.blur();
    if (statusFilterRef.current) itemNameRef.current.blur();
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
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((shopping) => ({
        "ITEM": shopping.products.map((product) => product.name).join(", "),
        "LÍDER DE ÁREA": shopping.user.profile.name,
        "ESTADO": shopping.status.name,
        "FECHA PETICIÓN": new Date(shopping.request_date).toLocaleDateString(),
        "FECHA APROBADO": new Date(shopping.date_approval).toLocaleDateString(),
        "FECHA FINALIZACIÓN": new Date(shopping.pending_date).toLocaleDateString(),
        "PRECIO": shopping.products.reduce((total, product) => total + product.price, 0).toLocaleString("es-CO", { style: "currency", currency: "COP" }),
        "FACTURA": shopping.facturacion ? shopping.facturacion : "No disponible"
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");

    // Configurar anchos de columnas
    worksheet['!cols'] = [{ wpx: 200 }, { wpx: 200 }, { wpx: 100 }, { wpx: 150 }, { wpx: 150 }, { wpx: 150 }, { wpx: 100 }, { wpx: 200 }];
    XLSX.writeFile(workbook, 'tabla_compras.xlsx');
  };

  const handleEditClick = (shoppingId) => {
    setEditingId(shoppingId);
    setIsEditing(true);
  };

  const handleStatusChange = (e) => {
    setNewStatusId(e.target.value);
  };

  const handleSaveClick = async () => {
    if (!newStatusId) {
      alert("Por favor, selecciona un nuevo estado.");
      return;
    }

    try {
      const response = await fetch(
        `https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1/shoppings/${editingId}`,
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
          title: shopping.title,
          description: shopping.description,
          category_id: shopping.category_id,
          status_id: parseInt(newStatusId, 10), // Cambiamos solo el estado
          area_id: shopping.area_id,
          account_type_id: shopping.account_type_id,
          user_id: shopping.user_id,
          request_date: shopping.request_date,
          pending_date: shopping.pending_date,
          date_approval: shopping.date_approval,
          innovated: shopping.innovated,
          unidad: shopping.unidad, // Mantener los valores originales
          iva: shopping.iva,
          retefuente: shopping.retefuente,
          facturacion: shopping.facturacion,
          total: shopping.total,
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
        `https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1/shoppings/${editingId}`,
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
        alert("Estado actualizado correctamente.");
        setIsEditing(false);
        setEditingId(null);
        setNewStatusId("");
        const updatedData = await fetchData();
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        alert("Hubo un error al actualizar el estado.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Hubo un error al actualizar el estado.");
    }
  };

  const handleOpenInvoiceModal = (shoppingId) => {
    setSelectedShoppingForInvoice(shoppingId);
    setInvoiceUrl(""); // Limpiar el valor anterior
    setIsInvoiceModalOpen(true); // Abrir el modal
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
          title: shopping.title,
          description: shopping.description,
          category_id: shopping.category_id,
          status_id: shopping.status_id,
          area_id: shopping.area_id,
          account_type_id: shopping.account_type_id,
          user_id: shopping.user_id,
          request_date: shopping.request_date,
          pending_date: shopping.pending_date,
          date_approval: shopping.date_approval,
          innovated: shopping.innovated,
          unidad: shopping.unidad,
          iva: shopping.iva,
          retefuente: shopping.retefuente,
          facturacion: invoiceUrl, // Aquí actualizamos la URL de la factura
          total: shopping.total,
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
        setIsInvoiceModalOpen(false); // Cerrar el modal
        setSelectedShoppingForInvoice(null); // Limpiar la selección
        const updatedData = await fetchData();
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        alert("Hubo un error al actualizar la factura.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Hubo un error al actualizar la factura.");
    }
  };

  const handleOpenMessageModal = (shoppingId) => {
    if (role === "admin") {
      setSelectedShoppingId(shoppingId);
      setIsMessageModalOpen(true);
    }
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
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setNewMessageBody("");
  };

  const handleViewInvoice = (invoiceUrl) => {
    window.open(invoiceUrl, "_blank");
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const selectedShopping = filteredData.find(shopping => shopping.id === selectedShoppingId);

  return (
    <div className="app-container">
      <h1>{role === "admin" ? "Compras ADMIN" : "Compras"}</h1>
      <div className="filters-container">
        <h2>Nombre de item</h2>
        <div className="filter-inputs">
          <input
            type="text"
            placeholder="Item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <select
            value={areaManager}
            onChange={(e) => setAreaManager(e.target.value)}
            ref={areaManagerRef}
          >
            <option value="">Todos los Líderes</option>
            {leaderOptions.map((leader) => (
              <option key={leader} value={leader}>
                {leader}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            ref={statusFilterRef}
          >
            <option value="">Todos los Estados</option>
            {statusOptions.map((status) => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleFilterReset}
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
      <div className="table-container">
        <div className="table-wrapper">
          <table className="shopping-table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>LÍDER DE ÁREA</th>
                <th>ESTADO</th>
                <th>FECHA PETICIÓN</th>
                <th>FECHA APROBADO</th>
                <th>FECHA FINALIZACIÓN</th>
                <th>PRECIO</th>
                <th>Factura</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="9">No hay compras</td>
                </tr>
              ) : (
                filteredData.map((shopping) => (
                  <tr key={shopping.id}>
                    <td>
                      <ul>
                        {shopping.products.map((product) => (
                          <li key={product.id}>{product.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{shopping.user.profile.name}</td>
                    <td>
                      {role === "admin" ? (
                        isEditing && editingId === shopping.id ? (
                          <div className="flex items-center space-x-2">
                            <select
                              value={newStatusId}
                              onChange={handleStatusChange}
                            >
                              <option value="">Selecciona un estado</option>
                              {statusOptions.map((status) => (
                                <option key={status.id} value={status.id}>
                                  {status.name}
                                </option>
                              ))}
                            </select>
                            <button
                              className="bg-blue-500 text-white p-2 rounded"
                              onClick={handleSaveClick}
                            >
                              Confirmar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>{shopping.status.name}</span>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                              onClick={() => handleEditClick(shopping.id)}
                            />
                          </div>
                        )
                      ) : (
                        <span>{shopping.status.name}</span>
                      )}
                    </td>

                    <td>{new Date(shopping.request_date).toLocaleDateString()}</td>
                    <td>{new Date(shopping.date_approval).toLocaleDateString()}</td>
                    <td>{new Date(shopping.pending_date).toLocaleDateString()}</td>
                    <td>
                      {shopping.products.reduce((total, product) => total + product.price, 0).toLocaleString("es-CO", { style: "currency", currency: "COP" })}
                    </td>

                    <td>
                      {shopping.facturacion ? (
                        <div className="flex items-center space-x-2">
                          <a
                            href={shopping.facturacion}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <FontAwesomeIcon icon={faFilePdf} />
                          </a>
                          {(role === "admin" || role === "Compras") && (
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                              onClick={() => handleOpenInvoiceModal(shopping.id)}
                            />
                          )}
                        </div>
                      ) : (
                        (role === "admin" || role === "Compras") && (
                          <FontAwesomeIcon
                            icon={faFileUpload}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            onClick={() => handleOpenInvoiceModal(shopping.id)}
                          />
                        )
                      )}
                    </td>

                    <td>
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                          onClick={() => handleViewDetailsClick(shopping.id)}
                        />
                        {(role === "admin") && (
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            onClick={() => handleOpenMessageModal(shopping.id)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
            {(role === "admin") && (
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
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => handleOpenInvoiceModal(selectedShopping.id)}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal para ingresar la URL de la factura */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-1/3 max-w-lg h-auto max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={() => setIsInvoiceModalOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl text-black lg:text-2xl font-bold mb-4 text-center">Subir URL de Factura</h2>
            <input
              type="text"
              placeholder="Ingresa la URL de la factura"
              value={invoiceUrl}
              onChange={(e) => setInvoiceUrl(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded mb-4"
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
              className="w-full text-black p-2 border border-gray-300 rounded mb-4"
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

export default FiltersComponent;

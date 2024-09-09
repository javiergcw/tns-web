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

    const shopping = filteredData.find((s) => s.id === editingId);
    const updatedShopping = {
      shopping: {
        category_id: shopping.category.id,
        status_id: parseInt(newStatusId, 10),
        title: shopping.title,
        description: shopping.description,
        request_date: shopping.request_date,
        pending_date: shopping.pending_date,
        date_approval: shopping.date_approval,
      },
      products: shopping.products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
      })),
      replace_products: "false",
    };

    try {
      const response = await fetch(
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

      if (response.ok) {
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

  // Función para manejar la subida de la factura (PDF)
  const handleUploadInvoice = async (shoppingId, file) => {
    if (!file) return;

    // Crear el formulario de datos
    const formData = new FormData();
    formData.append("invoice", file);

    try {
      // Enviar el archivo al backend
      const response = await fetch(
        `https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1/shoppings/${shoppingId}/upload-invoice`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const updatedShopping = await response.json();
        // Actualizar el estado con la nueva URL de la factura
        const updatedData = data.map((shopping) =>
          shopping.id === shoppingId
            ? { ...shopping, facturacion: updatedShopping.facturacion }
            : shopping
        );
        setData(updatedData);
        setFilteredData(updatedData);
        alert("Factura subida correctamente.");
      } else {
        alert("Hubo un error al subir la factura.");
      }
    } catch (error) {
      console.error("Error al subir la factura:", error);
      alert("Hubo un error al subir la factura.");
    }
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
                            <label className="cursor-pointer">
                              <FontAwesomeIcon icon={faEdit} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                              <input
                                type="file"
                                onChange={(e) => handleUploadInvoice(shopping.id, e.target.files[0])}
                                style={{ display: 'none' }}
                              />
                            </label>
                          )}
                        </div>
                      ) : (
                        (role === "admin" || role === "Compras") && (
                          <label className="cursor-pointer">
                            <FontAwesomeIcon icon={faFileUpload} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                            <input
                              type="file"
                              onChange={(e) => handleUploadInvoice(shopping.id, e.target.files[0])}
                              style={{ display: 'none' }}
                            />
                          </label>
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
